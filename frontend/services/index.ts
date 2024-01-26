import axios, { AxiosResponse } from "axios";
import { TicketData } from "./types";

export const getTicketList = async (): Promise<AxiosResponse<TicketData[]>> => {
  const data = await axios.get(`http://localhost:5001/tickets`);
  return data;
};

export const deleteTicket = async (
  ticketId: string
): Promise<AxiosResponse> => {
  const data = await axios.delete(`http://localhost:5001/tickets/${ticketId}`);
  return data;
};
