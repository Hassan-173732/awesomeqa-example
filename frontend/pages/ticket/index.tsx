import { useState } from "react";
import { NextPage } from "next";
import { useTicketList } from "../../services/hooks";
import TicketCard from "../../components/ticketCard";
import SearchBar from "../../components/searchBar";
import FilterSwitch from "../../components/filterSwitch";
import SortButton from "../../components/sortButton";

const Ticket: NextPage = () => {
  const [isOpenChecked, setIsOpenChecked] = useState(false);
  const [isClosedChecked, setIsClosedChecked] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [sortMethod, setSortMethod] = useState("");

  const {
    data,
    loading,
    deleteTicket,
    deletedMessage,
    updateTicket,
    updatedMessage,
  } = useTicketList(isOpenChecked, isClosedChecked, searchFilter, sortMethod);

  const handleSort = (sortMethod: string) => {
    console.log("sortMethod", sortMethod);
    setSortMethod(sortMethod);
  };

  const handleSearch = (query: string) => {
    console.log("query", query);
    setSearchFilter(query);
  };

  const handleIsOpen = (checked: boolean) => {
    setIsOpenChecked(checked);
    if (checked) {
      // If "Open" is checked, uncheck "Closed"
      setIsClosedChecked(false);
    }
  };

  const handleIsClosed = (checked: boolean) => {
    setIsClosedChecked(checked);
    if (checked) {
      // If "Closed" is checked, uncheck "Open"
      setIsOpenChecked(false);
    }
  };

  

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <FilterSwitch
        checked={isOpenChecked}
        onChange={handleIsOpen}
        label="Open"
      />
      <FilterSwitch
        checked={isClosedChecked}
        onChange={handleIsClosed}
        label="Closed"
      />
      <SortButton onSort={handleSort} />
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
