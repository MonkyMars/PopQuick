import { FC } from "react";

interface BannerProps {
  type: "info" | "error";
  message: string;
}

const Banner: FC<BannerProps> = ({ type, message }) => (
  <div
    className={`Banner ${type.toLowerCase() === "error" ? "error" : "info"}`}
  >
    <i className="material-icons">
      {type.toLowerCase() === "error" ? "warning" : "info"}
    </i>
    <span>{message}</span>
  </div>
);

export default Banner;
