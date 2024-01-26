import json
from typing import Optional


class TicketRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)

    def get_tickets(self, limit: Optional[int] = None) -> list[dict]:
        open_tickets = [ticket for ticket in self.data["tickets"] if ticket["status"] == "open"]
        
        # If limit is specified, return only the specified number of tickets
        open_tickets = open_tickets[:limit] if limit is not None else open_tickets

        # Fetch related messages for each open ticket along with context messages
        tickets_with_messages = []
        for ticket in open_tickets:
            message_id = ticket["msg_id"]
            related_message = next((msg for msg in self.data["messages"] if msg["id"] == message_id), None)

            if related_message:
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
