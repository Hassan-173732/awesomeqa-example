import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Stack,
  Tooltip,
  Link,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import React from "react";
import relatedMessageCardStyles from "./relatedMessageCard.module.css";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { ContextMessage } from "../../../services/types";
import { formatTimeFrame } from "../utils";

interface RelatedMessageCardProps {
  messages: ContextMessage[];
}

const RelatedMessageCard: React.FC<RelatedMessageCardProps> = ({
  messages,
}) => {
  return (
    <Accordion className={relatedMessageCardStyles.accordionContainer}>
      <AccordionSummary
        expandIcon={
          <ArrowDownwardIcon
            className={relatedMessageCardStyles.accordionIcon}
          />
        }
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>{` See related messages (${messages.length})`}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          {messages.map((message) => (
            <div
              key={message.timestamp}
              className={relatedMessageCardStyles.relatedmessageContainer}
            >
              <div className={relatedMessageCardStyles.avatarContainer}>
                <Avatar
                  className={relatedMessageCardStyles.avatar}
                  alt="Remy Sharp"
                  src={message.avatar_url}
                  sizes="small"
                />
                <div className={relatedMessageCardStyles.textContainer}>
                  <Typography>{message.nickname}</Typography>
                  <Typography
                    className={relatedMessageCardStyles.messageContent}
                  >
                    {`"${message.content.slice(0, 50)}..."`}
                  </Typography>
                  <Typography className={relatedMessageCardStyles.timestamp}>
                    {`Created at: ${formatTimeFrame(message.timestamp)}`}
                  </Typography>
                </div>
              </div>
              <div className={relatedMessageCardStyles.messageLink}>
                <Tooltip title="Go to message">
                  <Link href={message.msg_url} color="inherit" underline="none">
                    <OpenInNewOutlinedIcon />
                  </Link>
                </Tooltip>
              </div>
            </div>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default RelatedMessageCard;
