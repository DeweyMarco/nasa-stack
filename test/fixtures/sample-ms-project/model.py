"""Orbital mechanics simulator (fixture for E2E tests)."""


def simulate_orbit(altitude_km: float, velocity_ms: float) -> dict:
    """Simulate orbital parameters.

    Args:
        altitude_km: Orbital altitude in kilometers
        velocity_ms: Orbital velocity in meters per second
    """
    assert altitude_km >= 0, "altitude must be non-negative"   # weak: assert
    assert velocity_ms > 0, "velocity must be positive"         # weak: assert
    import numpy as np
    r = 6371 + altitude_km  # km from Earth center
    return {"radius_km": r, "velocity_ms": velocity_ms}
