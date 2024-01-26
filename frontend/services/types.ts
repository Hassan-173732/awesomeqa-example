export interface TicketData {
    ticket_id: string;
    message_content: string;
    timestamp: string;
    status: "open" | "closed";
    channel_id: string;
    community_server_id: string;
    msg_url: string;
    nickname: string;
    avatar_url: string;
    is_bot: boolean;
    generate_ticket_id: string;
    context_messages?: ContextMessage[];
}

export interface ContextMessage {
    content: string;
    timestamp: string;
    avatar_url: string;
    nickname: string;
    msg_url: string;
}