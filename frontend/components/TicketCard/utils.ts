export const formatTimeFrame = (timestamp: string): string => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const date = new Date(timestamp);
  const monthAbbreviation = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const formattedTime = `${monthAbbreviation} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
  return formattedTime;
};


