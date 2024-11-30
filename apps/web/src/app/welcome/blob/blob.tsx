import React from "react";
import "./blob.scss";

interface BlobBorderProps {
  children: React.ReactNode;
}

const BlobBorder: React.FC<BlobBorderProps> = ({ children }) => {
  return (
    <div className="blob-container">
      <div className="blob-outline"></div>
      <div className="blob-outline second"></div>
      <div className="content">{children}</div>
    </div>
  );
};

export default BlobBorder;
