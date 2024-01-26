import { useEffect, useState } from "react";
import { getTicketList, deleteTicket as deleteTicketApi } from "..";
import { TicketData } from "../types";

const useTicketList = () => {
  const [ticketList, setTicketList] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchTicketList = async () => {
    try {
      const { data: ticketData } = await getTicketList();
      setTicketList(ticketData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ticket list:", error);
      setError(error);
      setLoading(false);
    }
  };

  const deleteTicket = async (ticketId: string) => {
    try {
      // Call the deleteTicket API function with the ticketId to delete the ticket
      const response = await deleteTicketApi(ticketId);
      // Update the ticket list locally by removing the deleted ticket
      setTicketList((prevList) =>
        prevList.filter((ticket) => ticket.ticket_id !== ticketId)
      );
      return response;
    } catch (error) {
      console.error("Error deleting ticket:", error);
      return error;
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTicketList();
  }, []);

  return { data: ticketList, error, loading, deleteTicket };
};

export default useTicketList;
