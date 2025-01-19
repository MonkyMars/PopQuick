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
    <article
      className="groupCard"
      role="article"
      aria-labelledby={`group-name-${name.replace(/\s+/g, '-')}`}
    >
      {memberCount && (
        <span
          className="memberCount"
          aria-label={`Group has ${memberCount} out of ${maxMemberSize} members`}
        >
          {memberCountText}
        </span>
      )}
      <Image
        src={imageUrl}
        alt={`${name} group banner`}
        className="groupImage"
        width={500}
        height={500}
      />
      <div className="groupContent">
        <h3 id={`group-name-${name.replace(/\s+/g, '-')}`}>{name}</h3>
        <span
          className="category"
          aria-label={`Category: ${formattedCategory}`}
        >
          {categoryText}
        </span>
        <p>{description}</p>
        <button
          className="joinButton"
          aria-label={`Join ${name} group`}
          onClick={() => {}}
        >
          Join
        </button>
      </div>
    </article>
  );
};

export default PopQuickGroupCard;
