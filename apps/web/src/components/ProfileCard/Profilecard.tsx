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

const Profilecard: FC<ProfilecardProps> = ({ profilePicture, username, bio, owner, memberSince, onClick }) => {
	const router = useRouter();
	return (
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
				<h2 id="profile-name">{username}</h2>
				<p role="contentinfo" aria-label="Biography">{bio}</p>
			</div>
			<div className="profileCard__extra">
				<p aria-label="Membership duration">Member since: {memberSince}</p>
			</div>
			<div className="profileCard__actions">
				{owner && (
					<button 
						onClick={() => router.push('/profile')}
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
	);
}

export default Profilecard;