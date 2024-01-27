import * as React from "react";
import { NextPage } from "next";
import { useTicketList } from "../../services/hooks";
import TicketCard from "../../components/ticketCard";
import SearchBar from "../../components/searchBar";

const Ticket: NextPage = () => {
  const { data, loading, deleteTicket } = useTicketList();

  const handleSearch = (query: string) => {
    console.log(query);
  };
  return (
    <>
      <SearchBar onSearch={handleSearch} />
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
