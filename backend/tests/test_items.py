from fastapi.testclient import TestClient

import main

client = TestClient(main.app)


def test_get_items_returns_dummy_items(monkeypatch):
    monkeypatch.setattr(main, "APP_ENV", "test")
    monkeypatch.setenv("APP_MESSAGE", "Hello from tests")

    response = client.get("/api/items")

    assert response.status_code == 200
    data = response.json()
    assert data["env"] == "test"
    assert data["message"] == "Hello from tests"
    assert len(data["items"]) == 3
    assert data["items"][0] == {"id": 1, "name": "Apple", "price": 1.2}
