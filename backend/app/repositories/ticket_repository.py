import json
from typing import Optional

from app.helper.helper import Helper


class TicketRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)
            

    def get_tickets(self, limit: Optional[int] = None, onlyOpen: bool = False, onlyClosed: bool = False, searchFilter: str = '', sort: str = '') -> list[dict]:
        open_tickets = [ticket for ticket in self.data["tickets"][:limit]] if limit is not None else self.data["tickets"]
        tickets_with_messages = []
        helper_instance = Helper()

        for ticket in open_tickets:
            message_id = ticket["msg_id"]
            related_message = next((msg for msg in self.data["messages"] if msg["id"] == message_id), None)

            # Filtering condition
            include_ticket = (
                (onlyOpen and ticket["status"] == "open") or
                (onlyClosed and ticket["status"] == "closed") or
                (not onlyOpen and not onlyClosed)
            )

            if searchFilter and include_ticket:
                # Check if the searchFilter exists in message_content, nickname, or generate_ticket_id
                search_param_exists = (
                    searchFilter.lower() == related_message["content"].lower() or
                    searchFilter.lower() == related_message["author"]["nickname"].lower() or
                    searchFilter.lower() == helper_instance.generate_unique_id(ticket["id"]).lower()
                )

                if not search_param_exists:
                    # If the search parameter is not found in the specified fields, skip this ticket
                    continue

            if include_ticket:
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
                    "context_messages": [
                        {
                            "id": context_message["id"],
                            "content": context_message["content"],
                            "timestamp": context_message["timestamp"],
                            "avatar_url": context_message["author"]["avatar_url"],
                            "nickname": context_message["author"]["nickname"],
                            "msg_url": context_message["msg_url"],
                        }
                        for context_msg_id in ticket["context_messages"]
                        if (context_message := next((msg for msg in self.data["messages"] if msg["id"] == context_msg_id), None))
                    ],
                }
                tickets_with_messages.append(ticket_with_message)

        if sort == 'asc':
            tickets_with_messages = sorted(tickets_with_messages, key=lambda x: x["timestamp"])
        else:
            tickets_with_messages = sorted(tickets_with_messages, key=lambda x: x["timestamp"], reverse=True)

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
        
    def update_ticket(self, ticket_id: str,status: str) -> dict:
        helper_instance = Helper()
        try:
            ticket = next((ticket for ticket in self.data["tickets"] if ticket["id"] == ticket_id), None)
            if ticket:
                ticket["status"] = status
        
            return {"status": "success", "ticket_no": helper_instance.generate_unique_id(ticket["id"]), "message": "Ticket updated successfully"}
        except Exception as e:
            return {"status": "error", "message": str(e)}    
