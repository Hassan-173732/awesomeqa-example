import { useEffect, useState } from 'react';
import { getTicketList } from '..';
import { TicketData } from '../types';


const useTicketList = () => {
    const [ticketList, setTicketList] = useState<TicketData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        setLoading(true);
        const fetchTicketList = async () => {
            try {
                const { data: ticketData} = await getTicketList();
                setTicketList(ticketData);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching ticket list:', error);
                setError(true);
                setLoading(false);
            }
        };

        fetchTicketList();
    }, []);

    return {data: ticketList, error, loading};
};

export default useTicketList;
