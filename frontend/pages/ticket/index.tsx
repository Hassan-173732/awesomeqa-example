import { useState } from "react";
import { NextPage } from "next";
import { useTicketList } from "../../services/hooks";
import TicketCard from "../../components/ticketCard";
import SearchBar from "../../components/searchBar";
import FilterSwitch from "../../components/filterSwitch";
import SortButton from "../../components/sortButton";
import { Button, Snackbar, SnackbarContent, makeStyles } from "@mui/material";
import LoadButton from "../../components/loadButton";

const Ticket: NextPage = () => {
  const [isOpenChecked, setIsOpenChecked] = useState(false);
  const [isClosedChecked, setIsClosedChecked] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [sortMethod, setSortMethod] = useState("");
  const [limit, setLimit] = useState({
    start: 0,
    end: 5,
  });

  const {
    data,
    loading,
    deleteTicket,
    deletedMessage,
    openDeleteToast,
    openUpdateToast,
    updateTicket,
    updatedMessage,
    setOpenDeleteToast,
    setOpenUpdateToast,
  } = useTicketList(
    isOpenChecked,
    isClosedChecked,
    searchFilter,
    sortMethod,
    limit
  );

  const handleSort = (sortMethod: string) => {
    console.log("sortMethod", sortMethod);
    setSortMethod(sortMethod);
  };

  const handleSearch = (query: string) => {
    console.log("query", query);
    setSearchFilter(query);
    setLimit({
      start: 0,
      end: limit.end,
    });
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

  const handleLoad = () => {
    setLimit({
      start: 0,
      end: limit.end + 5,
    });
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
          isLoading={loading}
          key={ticket.ticket_id}
          ticketData={ticket}
          deleteTicket={deleteTicket}
          updateTicket={updateTicket}
        />
      ))}

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openDeleteToast}
        autoHideDuration={6000}
        onClose={() => setOpenDeleteToast(false)}
      >
        <SnackbarContent
          style={{ backgroundColor: "#f44336", color: "#fff" }}
          message={deletedMessage}
        />
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openUpdateToast}
        autoHideDuration={6000}
        onClose={() => setOpenUpdateToast(false)}
      >
        <SnackbarContent
          style={{ backgroundColor: "#4caf50", color: "#fff" }}
          message={updatedMessage}
        />
      </Snackbar>
      <LoadButton onClick={handleLoad} />
    </>
  );
};

export default Ticket;
