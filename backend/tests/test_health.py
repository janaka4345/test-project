from fastapi.testclient import TestClient

from main import app


def test_healthz_returns_200():
    client = TestClient(app)

    response = client.get("/healthz")

    assert response.status_code == 200


def test_readyz_returns_503_before_startup():
    client = TestClient(app)

    response = client.get("/readyz")

    assert response.status_code == 503


def test_readyz_returns_200_after_startup():
    with TestClient(app) as client:
        response = client.get("/readyz")

    assert response.status_code == 200
