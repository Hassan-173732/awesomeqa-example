import React from "react";
import cardStyles from "./homePageButton.module.css";

interface HomePageButtonProps {
    title: string;
    src: string;
    to: string; 
  }

export const HomePageButton: React.FC<HomePageButtonProps> = ({
    title,
    src,
    to,
}: HomePageButtonProps): JSX.Element => {
  return (
    <a href={to} className={cardStyles.link}>
    <div className={cardStyles.card}>
      <div className={cardStyles.frame}>
        <img className={cardStyles.libraryBooks} alt="Library books" src={src} />
      </div>
      <div className={cardStyles.text}>
        <div className={cardStyles.text}>{title}</div>
      </div>
    </div>
  </a>
  );
};

export default HomePageButton;