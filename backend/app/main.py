from app.repositories.ticket_repository import TicketRepository
import uvicorn
from fastapi import Depends, FastAPI
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
async def get_tickets(
    limit: int = 20,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    tickets = ticket_repository.get_tickets(limit)
    return JSONResponse(tickets, status_code=200)


@app.delete("/tickets/{ticket_id}")
async def delete_ticket(
    ticket_id: str,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    deleted_ticket = ticket_repository.delete_ticket(ticket_id)
    if deleted_ticket["status"] == "success":
        return JSONResponse({"message": "Ticket deleted successfully", "status" : deleted_ticket["status"], "ticketNo" : deleted_ticket["ticket_no"]}, status_code=200)
    else:
        return JSONResponse({"message": "Ticket not found", "status" : deleted_ticket["status"], "ticketNo" : deleted_ticket["ticket_no"]}, status_code=404)




if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)
