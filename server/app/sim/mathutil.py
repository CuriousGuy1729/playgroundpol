from __future__ import annotations

import math
from typing import Iterable, Sequence


Vec3 = tuple[float, float, float]
Quat = tuple[float, float, float, float]


def as3(v: Sequence[float] | Iterable[float]) -> Vec3:
    x, y, z = list(v)[:3]
    return (float(x), float(y), float(z))


def as4(v: Sequence[float] | Iterable[float]) -> Quat:
    x, y, z, w = list(v)[:4]
    return (float(x), float(y), float(z), float(w))


def add(a: Sequence[float], b: Sequence[float]) -> Vec3:
    return (a[0] + b[0], a[1] + b[1], a[2] + b[2])


def sub(a: Sequence[float], b: Sequence[float]) -> Vec3:
    return (a[0] - b[0], a[1] - b[1], a[2] - b[2])


def scale(a: Sequence[float], s: float) -> Vec3:
    return (a[0] * s, a[1] * s, a[2] * s)


def dot(a: Sequence[float], b: Sequence[float]) -> float:
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]


def length(a: Sequence[float]) -> float:
    return math.sqrt(dot(a, a))


def length2(a: Sequence[float]) -> float:
    return a[0] * a[0] + a[1] * a[1]


def normalize(a: Sequence[float]) -> Vec3:
    n = length(a)
    if n < 1e-9:
        return (0.0, 0.0, 0.0)
    return scale(a, 1.0 / n)


def xy_distance(a: Sequence[float], b: Sequence[float]) -> float:
    dx = a[0] - b[0]
    dy = a[1] - b[1]
    return math.sqrt(dx * dx + dy * dy)


def clamp(x: float, lo: float, hi: float) -> float:
    return lo if x < lo else hi if x > hi else x


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def yaw_from_quat(q: Sequence[float]) -> float:
    """Yaw around +Z for a PyBullet quaternion (x, y, z, w)."""
    x, y, z, w = q
    # Rotation matrix first column is local +X in world.
    xx = 1 - 2 * (y * y + z * z)
    xy = 2 * (x * y + z * w)
    # Using full matrix is more stable:
    m00 = 1 - 2 * (y * y + z * z)
    m10 = 2 * (x * y + z * w)
    # row-major getMatrixFromQuaternion: m[0]=xx, m[3]=yx
    # atan2 of local-X's Y vs X.
    _ = (xx, xy, m00, m10)
    m00 = 1 - 2 * (y * y + z * z)
    m10 = 2 * (x * y + w * z)
    return math.atan2(m10, m00)


def quat_to_matrix(q: Sequence[float]) -> tuple[float, ...]:
    x, y, z, w = q
    xx, yy, zz = x * x, y * y, z * z
    xy, xz, yz = x * y, x * z, y * z
    wx, wy, wz = w * x, w * y, w * z
    return (
        1 - 2 * (yy + zz),
        2 * (xy - wz),
        2 * (xz + wy),
        2 * (xy + wz),
        1 - 2 * (xx + zz),
        2 * (yz - wx),
        2 * (xz - wy),
        2 * (yz + wx),
        1 - 2 * (xx + yy),
    )


def yaw_of(q: Sequence[float]) -> float:
    m = quat_to_matrix(q)
    return math.atan2(m[3], m[0])


def forward_xy(q: Sequence[float]) -> tuple[float, float]:
    m = quat_to_matrix(q)
    return (m[0], m[3])


def up_z(q: Sequence[float]) -> float:
    m = quat_to_matrix(q)
    return m[8]


def wrap_pi(a: float) -> float:
    while a > math.pi:
        a -= 2 * math.pi
    while a < -math.pi:
        a += 2 * math.pi
    return a


def angle_diff(a: float, b: float) -> float:
    return wrap_pi(a - b)
