import { useEffect, useState } from "react";
import { getTicketList, deleteTicket as deleteTicketApi, updateTicket as updateTicketApi } from "..";
import { TicketData } from "../types";

const useTicketList = (isOpenChecked: boolean, isClosedChecked: boolean, searchFilter: string, sortMethod: string) => {
  const [ticketList, setTicketList] = useState<TicketData[]>([]);
  const [deletedMessage, setDeletedMessage] = useState<string>();
  const [updatedMessage, setUpdatedMessage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchTicketList = async () => {
    try {
      const { data: ticketData } = await getTicketList({
        isOpenChecked,
        isClosedChecked,
        searchFilter,
        sortMethod,
      });
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
      setDeletedMessage(response.data.message);
      // Update the ticket list locally by removing the deleted ticket
      setTicketList((prevList) =>
        prevList.filter((ticket) => ticket.ticket_id !== ticketId)
      );
      return response;
    } catch (error) {
      console.error("Error deleting ticket:", error);
      setDeletedMessage("Error deleting ticket");
      return error;
    }
  };

  const updateTicket = async (ticketId: string, status: string) => {
    try {
      // Call the updateStatus API function with the ticketId and status to update the ticket
      const response = await updateTicketApi(ticketId, status);
      setUpdatedMessage(response.data.message);

      // Update the ticket list locally by updating the ticket status
      setTicketList((prevList) =>
        prevList.map((ticket) => {
          if (ticket.ticket_id === ticketId) {
            return { ...ticket, status: "closed" };
          }
          return ticket;
        })
      );

      return response;
    } catch (error) {
      console.error("Error updating ticket status:", error);
      setUpdatedMessage("Error updating ticket status");
      return error;
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTicketList();
  }, [isOpenChecked, isClosedChecked,searchFilter,sortMethod]);

  return {
    data: ticketList,
    error,
    loading,
    deleteTicket,
    deletedMessage,
    updateTicket,
    updatedMessage,
  };
};

export default useTicketList;
