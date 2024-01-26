import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { TicketData } from '../../services/types';

interface TicketCardProps {
    ticketData: TicketData,
    isLoading: boolean

}

const TicketCard: React.FC<TicketCardProps> = ({ticketData}) => {
    console.log(ticketData);
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Ticket Title
                </Typography>
                <Typography color="textSecondary">
                    Ticket Description
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TicketCard;
