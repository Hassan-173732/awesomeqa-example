import axios, { AxiosResponse } from "axios";
import { TicketData } from "./types";

export const getTicketList = async (): Promise<AxiosResponse<TicketData[]>> => {
  const data = await axios.get(`http://localhost:5001/tickets/`);
  return data;
};

export const deleteTicket = async (
  ticketId: string
): Promise<AxiosResponse> => {
  const data = await axios.delete(`http://localhost:5001/tickets/${ticketId}`);
  return data;
};

export const updateTicket = async (
  ticketId: string,
  status: string
): Promise<AxiosResponse> => {
  const data = await axios.patch(`http://localhost:5001/tickets/`, {
    ticket_id: ticketId,
    status,
  });
  return data;
};
