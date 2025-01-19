import React from "react";
import Image from "next/image";
import { FC } from "react";
import { Pencil, X, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import "./Profilecard.scss";

interface ProfilecardProps {
  username: string;
  bio: string;
  owner: boolean;
  profilePicture: string;
  stats?: {
    memberSince?: string;
    totalMessagesSent?: number;
  };
  onClick: () => void;
}

const Profilecard: FC<ProfilecardProps> = ({
  profilePicture,
  username,
  bio,
  owner,
  stats: { memberSince, totalMessagesSent = 100 } = {},
  onClick,
}) => {
  const router = useRouter();
  const copyUsername: () => void = () => {
    navigator.clipboard.writeText(username);
    // currently no indentation if username is successfully copied
  };
  return (
    <>
      <article
        className="profileCard"
        role="article"
        aria-labelledby="profile-name"
      >
        <div className="profileCard__image">
          <Image
            src={profilePicture}
            alt={`Profile picture of ${username}`}
            width={100}
            height={100}
          />
        </div>
        <div className="profileCard__details">
          <div className="profileCard__username">
            <h2 id="profile-name">{username}</h2>
            <Copy aria-hidden="true" className="copy" onClick={copyUsername} />
          </div>

          {bio ? (
            <p role="contentinfo" aria-label="Biography">
              {bio}
            </p>
          ) : (
            <p className="alternativeBio">No description provided</p>
          )}
        </div>

        <div className="profileCard__extra">
          {memberSince && (
            <>
              <div className="memberSince">
                <label htmlFor="memberSince">Member since:</label>
                <p aria-label="Membership duration" id="memberSince">
                  {memberSince.toLocaleString()}
                </p>
              </div>
            </>
          )}
          {totalMessagesSent && (
            <>
              <div className="totalMessagesSent">
                <label htmlFor="totalMessagesSent">Total messages sent:</label>
                <p aria-label="total messages sent" id="totalMessagesSent">
                  {totalMessagesSent.toLocaleString()}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="profileCard__actions">
          {owner && (
            <button
              onClick={() => router.push("/profile")}
              aria-label="Edit profile"
              className="edit-button"
            >
              <Pencil aria-hidden="true" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
        <button
          className="profileCard__close"
          onClick={onClick}
          aria-label="Close profile card"
        >
          <X aria-hidden="true" />
        </button>
      </article>
    </>
  );
};

export default Profilecard;
