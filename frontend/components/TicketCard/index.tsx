import React, { useState, MouseEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Link,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { TicketData } from "../../services/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import CheckIcon from "@mui/icons-material/Check"; // Add this line to import the CheckIcon component
import ticketCardStyles from "./ticketCard.module.css";

interface TicketCardProps {
  ticketData: TicketData;
  isLoading: boolean;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticketData }) => {
  function handleDelete(event: MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  function handleMarkDone(event: MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Card className={ticketCardStyles.card}>
      <Typography
        className={ticketCardStyles.headingText}
        variant="h5"
        component="h2"
      >
        {`Ticket #${ticketData.generate_ticket_id}`}
      </Typography>
      {ticketData.is_bot ? (
        <Chip
          label="Bot"
          size="small"
          variant="outlined"
          className={ticketCardStyles.chip}
        />
      ) : null}
      <div className={ticketCardStyles.buttonContainer}>
        <button className={ticketCardStyles.button} onClick={handleDelete}>
          <CheckIcon />
        </button>
        <button className={ticketCardStyles.button} onClick={handleMarkDone}>
          <DeleteIcon />
        </button>
      </div>
      <CardContent className={ticketCardStyles.cardContent}>
        <div className={ticketCardStyles.avatarContainer}>
          <Avatar
            className={ticketCardStyles.avatar}
            alt="Remy Sharp"
            src={ticketData.avatar_url}
          />
          <div className={ticketCardStyles.textContainer}>
            <Typography variant="h6" component="h2">
              {ticketData.nickname}
            </Typography>
            <Chip
              label={ticketData.status}
              size="small"
              variant="outlined"
              className={ticketCardStyles.chip}
            />
          </div>
        </div>

        <div className={ticketCardStyles.messageContainer}>
          <Typography className={ticketCardStyles.secondaryText}>
            {ticketData.message_content}
          </Typography>
          <div className={ticketCardStyles.messageLink}>
            <Tooltip title="Go to message">
              <Link href={ticketData.msg_url} color="inherit" underline="none">
                <OpenInNewOutlinedIcon />
              </Link>
            </Tooltip>
          </div>
        </div>
      </CardContent>
      <Accordion className={ticketCardStyles.accordionContainer}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Related Messages</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default TicketCard;
