import React, { MouseEvent, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Button,
  Chip,
  Link,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { TicketData } from "../../services/types";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import CheckIcon from "@mui/icons-material/Check"; // Add this line to import the CheckIcon component
import ticketCardStyles from "./ticketCard.module.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RelatedMessageCard from "./relatedMessageCard";
import { formatTimeFrame } from "./utils";
import { IconButton } from "@mui/material";

interface TicketCardProps {
  ticketData: TicketData;
  deleteTicket: (ticketId: string) => Promise<void>;
  isLoading: boolean;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticketData,
  deleteTicket,
}) => {
  const handleDelete = async (ticketId: string) => {
    try {
      const response = await deleteTicket(ticketId);
    } catch (error) {
      console.log(error);
    }
  };

  function handleMarkDone(event: MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Card className={ticketCardStyles.card}>
        <div className={ticketCardStyles.ticketHeading}>
          <Typography
            className={ticketCardStyles.headingText}
            variant="h5"
            component="h2"
          >
            {`Ticket #${ticketData.generate_ticket_id}`}
          </Typography>
          <Chip
            label={ticketData.status}
            size="small"
            variant="outlined"
            className={ticketCardStyles.chip}
          />
        </div>

        <div className={ticketCardStyles.buttonContainer}>
          <IconButton className={ticketCardStyles.doneButton}>
            <CheckIcon />
          </IconButton>
          <IconButton
            className={ticketCardStyles.deleteButton}
            onClick={() => handleDelete(ticketData.ticket_id)}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
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
              {!ticketData.is_bot ? (
                <Chip
                  label="Bot"
                  size="small"
                  variant="outlined"
                  className={ticketCardStyles.botChip}
                />
              ) : null}
              <Typography className={ticketCardStyles.timestamp}>
                {`Created at: ${formatTimeFrame(ticketData.timestamp)}`}
              </Typography>
            </div>
          </div>

          <div className={ticketCardStyles.messageContainer}>
            <Typography className={ticketCardStyles.secondaryText}>
              {ticketData.message_content}
            </Typography>
            <div className={ticketCardStyles.messageLink}>
              <Tooltip title="Go to message">
                <Link
                  href={ticketData.msg_url}
                  color="inherit"
                  underline="none"
                >
                  <OpenInNewOutlinedIcon />
                </Link>
              </Tooltip>
            </div>
          </div>

          <RelatedMessageCard messages={ticketData.context_messages} />
        </CardContent>
      </Card>
    </>
  );
};

export default TicketCard;
