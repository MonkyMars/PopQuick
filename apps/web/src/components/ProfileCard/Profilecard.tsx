import React from "react";
import Image from "next/image";
import { FC } from "react";
import { Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import './Profilecard.scss';

interface ProfilecardProps {
    username: string;
    bio: string;
    owner: boolean;
    profilePicture: string;
    memberSince?: string;
    onClick: () => void;
}

const Profilecard: FC<ProfilecardProps> = ({profilePicture, username, bio, owner, memberSince, onClick}) => {
    const router = useRouter();
    return (
        <>
        <div className="profileCard">
            <div className="profileCard__image">
                <Image src={profilePicture} alt="profile image" width={100} height={100} />
            </div>
            <div className="profileCard__details">
                <h2>{username}</h2>
                <p>{bio}</p>
            </div>
            <div className="profileCard__extra">
                <p>Member since: {memberSince}</p>
            </div>
            <div className="profileCard__actions">
                {owner && (
                    <button onClick={() => router.push('/profile')}>
                        <Pencil/>
                        Edit Profile</button>
                )}
            </div>
            <div className="profileCard__close">
                <X onClick={() => onClick()}/>
            </div>
        </div>
        </>
    );
}

export default Profilecard;