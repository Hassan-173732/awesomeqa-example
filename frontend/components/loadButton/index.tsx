import React from "react";
import Button from "@material-ui/core/Button";
import loadButtonStyles from "./loadButton.module.css";

interface LoadButtonProps {
  onClick: () => void;
}

const LoadButton: React.FC<LoadButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={onClick}
      className={loadButtonStyles.button}
    >
      Load More
    </Button>
  );
};

export default LoadButton;
