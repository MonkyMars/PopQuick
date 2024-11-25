import { FC } from "react";
import './/Banner.scss';
import { TriangleAlert } from "lucide-react";
interface BannerProps {
  type: "info" | "error";
  message: string;
}

const Banner: FC<BannerProps> = ({ type, message }) => (
  <div
    className={`Banner ${type.toLowerCase() === "error" ? "error" : "info"}`}
  >
  <TriangleAlert/>
    <span>{message}</span>
  </div>
);

export default Banner;
