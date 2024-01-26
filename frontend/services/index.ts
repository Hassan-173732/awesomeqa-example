import axios, { AxiosResponse } from "axios";
import {  TicketData } from "./types";

export const getTicketList = async (): Promise<AxiosResponse<TicketData[]>> => {
    const data = await axios.get(`http://localhost:5001/tickets`);
    return data;
}