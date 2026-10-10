from main import get_items


def test_get_items_returns_three_items():
    data = get_items()

    assert len(data["items"]) == 3
    assert data["items"][0]["name"] == "Apple"
