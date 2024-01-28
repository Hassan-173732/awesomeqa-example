import axios, { AxiosResponse } from "axios";
import { TicketData } from "./types";

interface GetTicketListParams {
  isOpenChecked?: boolean;
  isClosedChecked?: boolean;
  searchFilter?: string;
  sortMethod?: string;
  
}


export const getTicketList = async (params?: GetTicketListParams): Promise<AxiosResponse<TicketData[]>> => {
  const url = 'http://localhost:5001/tickets/';

  
  const queryParams: Record<string, any> = {};

  if (params?.isOpenChecked !== undefined) {
    queryParams.onlyOpen = params.isOpenChecked;
  }

  if (params?.isClosedChecked !== undefined) {
    queryParams.onlyClosed = params.isClosedChecked;
  }

  if (params?.searchFilter !== undefined) {
    queryParams.searchFilter = params.searchFilter;
  }

  if (params?.sortMethod !== undefined) {
    queryParams.sort = params.sortMethod;
  }

  const data = await axios.get(url, {
    params: queryParams,
  });

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
  console.log("updateTicket", ticketId, status);
  const data = await axios.patch(`http://localhost:5001/tickets/`, {
    ticket_id: ticketId,
    status,
  });
  return data;
};
