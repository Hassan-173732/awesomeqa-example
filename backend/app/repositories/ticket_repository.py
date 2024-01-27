import json
from typing import Optional

from app.helper.helper import Helper


class TicketRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)
            
    def get_tickets(self, limit: Optional[int] = None, onlyOpen: bool = False, onlyClosed: bool = False) -> list[dict]:
        open_tickets = [ticket for ticket in self.data["tickets"]]

    # If limit is specified, return only the specified number of tickets
        open_tickets = open_tickets[:limit] if limit is not None else open_tickets

    # Fetch related messages for each open ticket along with context messages
        tickets_with_messages = []
        helper_instance = Helper()
        for ticket in open_tickets:
            message_id = ticket["msg_id"]
            related_message = next((msg for msg in self.data["messages"] if msg["id"] == message_id), None)

        # Check conditions based on onlyBot, onlyOpen, and onlyClosed
            if (
                (onlyOpen and ticket["status"] == "open") or
                (onlyClosed and ticket["status"] == "closed") or
                (not onlyOpen and not onlyClosed and (ticket["status"] == "open" or ticket["status"] == "closed"))
            ):
                ticket_with_message = {
                    "ticket_id": ticket["id"],
                    "message_content": related_message["content"],
                    "timestamp": ticket["timestamp"],
                    "status": ticket["status"],
                    "channel_id": related_message["channel_id"],
                    "community_server_id": related_message["community_server_id"],
                    "msg_url": related_message["msg_url"],
                    "nickname": related_message["author"]["nickname"],
                    "avatar_url": related_message["author"]["avatar_url"],
                    "is_bot": related_message["author"]["is_bot"],
                    "generate_ticket_id": helper_instance.generate_unique_id(ticket["id"]),
                }

            # Include information about context messages
                context_messages_info = []
                for context_msg_id in ticket["context_messages"]:
                    context_message = next((msg for msg in self.data["messages"] if msg["id"] == context_msg_id), None)
                    if context_message:
                        context_messages_info.append({
                            "content": context_message["content"],
                            "timestamp": context_message["timestamp"],
                            "avatar_url": context_message["author"]["avatar_url"],
                            "nickname": context_message["author"]["nickname"],
                            "msg_url": context_message["msg_url"],
                        })

                ticket_with_message["context_messages"] = context_messages_info
                tickets_with_messages.append(ticket_with_message)

        return tickets_with_messages


    def delete_ticket(self, ticket_id: str) -> dict:
        helper_instance = Helper()
        try:
            ticket = next((ticket for ticket in self.data["tickets"] if ticket["id"] == ticket_id), None)
            if ticket:
                ticket["status"] = "deleted"
        
            return {"status": "success", "ticket_no": helper_instance.generate_unique_id(ticket["id"]), "message": "Ticket deleted successfully"}
        except Exception as e:
            return {"status": "error", "message": str(e)}
