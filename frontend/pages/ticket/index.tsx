import * as React from "react";
import { NextPage } from "next";
import { useTicketList } from "../../services/hooks";
import TicketCard from "../../components/ticketCard";
import SearchBar from "../../components/searchBar";
import FilterSwitch from "../../components/filterSwitch";
import SortButton from "../../components/sortButton";

const Ticket: NextPage = () => {
  const { data, loading, deleteTicket, deletedMessage, updateTicket, updatedMessage } = useTicketList();

  const handleSearch = (query: string) => {
    console.log(query);
  };

  const handleIsOpen = (checked: boolean) => {};
  const handleIsClosed = (checked: boolean) => {};
  const handleSort = () => {};



  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <FilterSwitch checked={true} onChange={handleIsOpen} label="Open"/>
      <FilterSwitch checked={true} onChange={handleIsClosed} label="Closed"/>
      <SortButton onClick={handleSort}/>
      {data.map((ticket) => (
        <TicketCard
          key={ticket.ticket_id}
          ticketData={ticket}
          isLoading={loading}
          deleteTicket={deleteTicket}
          updateTicket={updateTicket}
        />
      ))}
    </>
  );
};

export default Ticket;
