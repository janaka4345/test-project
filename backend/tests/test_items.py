from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_get_items_returns_dummy_items():
    response = client.get("/api/items")

    assert response.status_code == 200
    data = response.json()
    assert data["env"] == "development"
    assert data["message"] == "Hello from the development backend"
    assert len(data["items"]) == 3
    assert data["items"][0] == {"id": 1, "name": "Apple", "price": 1.2}
