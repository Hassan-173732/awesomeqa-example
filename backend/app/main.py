from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from app.repositories.ticket_repository import TicketRepository
import uvicorn
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
  CORSMiddleware,
    allow_origins="http://localhost:3000",
    
    allow_methods=["*"],
    allow_headers=["*"],
)

TICKET_FILEPATH = "C://Projects//AwesomeChallenge//awesomeqa-example//backend//app//data//awesome_tickets.json"
ticket_repository = TicketRepository(filepath=TICKET_FILEPATH)






@app.get("/healthz")
async def root():
    return "OK"


@app.get("/tickets")
def get_tickets(
    limit: int = None,
    onlyOpen: bool = Query(False, description="Filter by only open tickets"),
    onlyClosed: bool = Query(False, description="Filter by only closed tickets"),
    searchFilter: str = Query(None, description="Search for a ticket"),
    sort: str = Query(None, description="Sort by timestamp"),
    startIndex: int = Query(0, description="current ticket number"),
    endIndex: int = Query(5, description="ticket count"),
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    tickets = ticket_repository.get_tickets(limit, onlyOpen, onlyClosed, searchFilter, sort, startIndex, endIndex)
    return JSONResponse(tickets, status_code=200)


@app.delete("/tickets/{ticket_id}")
def delete_ticket(
    ticket_id: str,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    deleted_ticket = ticket_repository.delete_ticket(ticket_id)
    if deleted_ticket["status"] == "success":
        return JSONResponse({"message": "Ticket deleted successfully", "status" : deleted_ticket["status"], "ticketNo" : deleted_ticket["ticket_no"]}, status_code=200)
    else:
        return JSONResponse({"message": "Ticket not found", "status" : deleted_ticket["status"], "ticketNo" : deleted_ticket["ticket_no"]}, status_code=404)



class TicketUpdatePayload(BaseModel):
    ticket_id: str
    status: str 

@app.patch("/tickets")
def update_ticket(
    ticket_update_payload: TicketUpdatePayload,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    try:
        # Assuming update_ticket now takes the payload as a parameter
        
        updated_ticket = ticket_repository.update_ticket(ticket_update_payload.ticket_id, ticket_update_payload.status)
        
        if updated_ticket["status"] == "success":
            response_data = {
                "message": "Ticket updated successfully",
                "status": updated_ticket["status"],
                "ticketNo": updated_ticket["ticket_no"]
            }
            return JSONResponse(response_data, status_code=200)
        else:
            response_data = {
                "message": "Ticket not found",
                "status": updated_ticket["status"],
                "ticketNo": updated_ticket["ticket_no"]
            }
            return JSONResponse(response_data, status_code=404)
    
    except Exception as e:
        # Handle exceptions if needed
        return HTTPException(status_code=500, detail=str(e))



if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)
