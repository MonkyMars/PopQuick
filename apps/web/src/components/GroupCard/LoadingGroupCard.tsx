import React from "react";
import Image from "next/image";
import "./GroupCard.scss";

const LoadingGroupCard: React.FC = () => {
  return (
    <div className="loadingGroupCard groupCard">
      <div className="image"></div>
      <div className="groupContent">
        <h2>
        </h2>
      </div>
    </div>
  );
};

export default LoadingGroupCard;
