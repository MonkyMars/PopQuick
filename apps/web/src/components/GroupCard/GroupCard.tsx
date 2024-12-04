import React from "react";
import Image from "next/image";
import "./GroupCard.scss";
interface PopQuickGroupCardProps {
  name: string;
  imageUrl: string;
  description: string;
  category: string;
  memberCount?: number;
  maxMemberSize?: number;
}
const PopQuickGroupCard: React.FC<PopQuickGroupCardProps> = ({
  name,
  imageUrl,
  description,
  category,
  memberCount,
  maxMemberSize = 4,
}) => {
  const memberCountText = memberCount
    ? `${memberCount}/${maxMemberSize} members`
    : "";
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);
  const categoryText = category ? `#${formattedCategory}` : "";
  return (
    <div className="groupCard">
      {memberCount && <span className="memberCount">{memberCountText}</span>}
      <Image
        src={imageUrl}
        alt={`${name} group banner`}
        className="groupImage"
        width={500}
        height={500}
      />
      <div className="groupContent">
        <h3>{name}</h3>
        <label>{categoryText}</label>
        <p>{description}</p>
        <button className="joinButton">Join</button>
      </div>
    </div>
  );
};

export default PopQuickGroupCard;
