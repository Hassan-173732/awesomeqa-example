from pydantic import BaseModel
import pytest
from fastapi.testclient import TestClient
import conftest
from main import app


client = TestClient(app)


class TicketUpdatePayload(BaseModel):
    ticket_id: str
    status: str


def test_get_tickets():
    response = client.get("/tickets?onlyOpen=false&onlyClosed=false&searchFilter=&sort=desc&startIndex=0&endIndex=5")
    assert isinstance(response.json(), list)
    assert response.status_code == 200
    assert len(response.json()) == 5
    for ticket in response.json():
        assert ticket.get("status") == "closed" or ticket.get("status") == "open"

def test_get_opentickets():
    response = client.get("/tickets?onlyOpen=true&onlyClosed=false&searchFilter=&sort=desc&startIndex=0&endIndex=5")
    assert isinstance(response.json(), list)
    assert response.status_code == 200
    for ticket in response.json():
        assert ticket.get("status") == "open"

def test_get_closetickets():
    response = client.get("/tickets?onlyOpen=false&onlyClosed=true&searchFilter=&sort=desc&startIndex=0&endIndex=5")
    assert isinstance(response.json(), list)
    assert response.status_code == 200
    for ticket in response.json():
        assert ticket.get("status") == "closed"


def test_get_tickets_sort_asc():
    response = client.get("/tickets?onlyOpen=false&onlyClosed=false&searchFilter=&sort=asc&startIndex=0&endIndex=5")
    assert isinstance(response.json(), list)
    assert response.status_code == 200
    timestamps_asc = [ticket.get("timestamp") for ticket in response.json()]
    assert timestamps_asc == sorted(timestamps_asc)

def test_get_tickets_sort_desc():
    response = client.get("/tickets?onlyOpen=false&onlyClosed=false&searchFilter=&sort=desc&startIndex=0&endIndex=5")
    assert isinstance(response.json(), list)
    assert response.status_code == 200
    timestamps_desc = [ticket.get("timestamp") for ticket in response.json()]
    assert timestamps_desc == sorted(timestamps_desc, reverse=True)


def test_search_filter_by_nickname():
    search_filter_string = "sp0k0yniy"
    response = client.get(f"/tickets?onlyOpen=false&onlyClosed=false&searchFilter={search_filter_string}&sort=desc&startIndex=0&endIndex=5")

    assert isinstance(response.json(), list)   
    assert response.status_code == 200
    assert len(response.json()) > 0

   
    for ticket in response.json():
        assert search_filter_string.lower() in ticket.get("nickname", "").lower()


def test_search_filter_not_found():
    search_filter_string = "stringthatdoesnotexist"
    response = client.get(f"/tickets?onlyOpen=false&onlyClosed=false&searchFilter={search_filter_string}&sort=desc&startIndex=0&endIndex=5")

    assert isinstance(response.json(), list)   
    assert response.status_code == 200
    assert len(response.json()) == 0


def test_delete_ticket_success():
    response = client.delete("/tickets/83a1af5b-5817-44f9-acbf-d0bef22b3759")
    assert response.status_code == 200
    assert response.json() == {"message": "Ticket deleted successfully", "status" : "success", "ticketNo" : "XT-07f5e"}
    
def test_delete_ticket_not_found():
    response = client.delete("/tickets/1")
    assert response.status_code == 404
    assert response.json() == {"message": "Ticket not found", "status" : "failed", "ticketNo" : ""}


def test_update_ticket_success():
    payload = TicketUpdatePayload(ticket_id="83a1af5b-5817-44f9-acbf-d0bef22b3759", status="closed")
    response = client.patch("/tickets", json=payload.model_dump())
    assert response.status_code == 200
    assert response.json() == {"message": "Ticket updated successfully", "status" : "success", "ticketNo" : "XT-07f5e"}
    
def test_update_ticket_not_found():
    payload = TicketUpdatePayload(ticket_id="83a1af5b", status="closed")
    response = client.patch("/tickets", json=payload.model_dump())
    assert response.status_code == 404
    assert response.json() == {"message": "Ticket not found", "status" : "failed", "ticketNo" : ""}




