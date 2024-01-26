import * as React from "react";
import { NextPage } from "next";
import { useTicketList } from "../../services/hooks";
import TicketCard from "../../components/ticketCard";

const Ticket: NextPage = () => {
  const { data, loading, deleteTicket } = useTicketList();

  return (
    <>
      {data.map((ticket) => (
        <TicketCard
          key={ticket.ticket_id}
          ticketData={ticket}
          isLoading={loading}
          deleteTicket={deleteTicket}
        />
      ))}
    </>
  );
};

export default Ticket;
