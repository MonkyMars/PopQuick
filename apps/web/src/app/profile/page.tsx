"use client"
import React from "react";
import "@/app/profile/profile.scss";
import NavDesktop from "@/components/Navigation/NavDesktop";
import NavMobile from "@/components/Navigation/NavMobile";
import { useIsMobile } from "@/utils/hooks/isMobile";
import Image from "next/image";
const Profile = () => {
	return(
  <>
    {useIsMobile() ? <NavMobile /> : <NavDesktop />}
		<div className="profileContainer">
			<div className="profile">
				<div className="userInformation">
					<div className="icon">
						<Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg" alt="avatar" width={100} height={100} draggable={false}/>
					</div>
					<label>Username</label>
					<input type="text" placeholder="Username"/>
					<label htmlFor="bio">Bio</label>
					<textarea placeholder="Enter something about your self" id="bio"/>
				</div>
			</div>
		</div>
  </>);
};

export default Profile;
