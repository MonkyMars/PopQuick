import { FC } from "react";
import React from 'react';

interface ConfirmationProps {
  type: "warning" | "info";
  message: string;
}

const Confirmation: FC<ConfirmationProps> = ({ type, message }) => (
  <div className="Confirmation">
    <div className="message">
      <i className="material-icons">
        {type.toLowerCase() === "warning" ? "warning" : "info"}
      </i>
      <span>{message}</span>
    </div>
    <div className="buttons">
      <button className="button">
        <i className="material-icons">check</i>
        <span>Confirm</span>
      </button>
      <button className="button">
        <i className="material-icons">cancel</i>
        <span>Cancel</span>
      </button>
    </div>
  </div>
);

export default Confirmation;