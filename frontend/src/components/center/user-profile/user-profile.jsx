import React, {useState} from "react";
import "./user-profile.css"
import {useTranslation} from "react-i18next";
import UserProfileItem from "./user-profile-item.jsx";
import BackButton from "../../middle/header/back-button.jsx";
import {gql, useQuery} from "@apollo/client";
import ChatItem from "../../left/chat-item.jsx";

const GET_USER_BY_ID = gql`
    query GetUserById($id: ID!) {
        userById(id: $id) {
            id
            username
            firstName
            middleName
            lastName
            options
        }
    }
`;

const UserProfile = ({userId, onBack}) => {
    const [t] = useTranslation();
    const [avatar, setAvatar] = useState("");
    const [fullName, setFullName] = useState("...");
    const [username, setUsername] = useState("...");

    useQuery(GET_USER_BY_ID, {
        variables: {
            id: userId
        },
        onCompleted: (data) => {
            const user = data["userById"];
            setUsername("@" + user.username)
            setFullName(user.lastName + " " + user.firstName + " " + user.middleName);
        },
        onError: (error) => {
            console.debug(error);
        }
    });


    return (
        <div className="profile-info">
            <div className="MiddleHeader" style={{borderRadius: "0.263rem"}}>
                <div className="Transition">
                    <div className="Transition_slide Transition_slide-active">
                        <BackButton onClick={onBack}/>
                    </div>
                </div>
            </div>
            <div className="ProfileInfo">
                <div className="GBGLnrA7">
                    <div className="Transition">
                        <div className="Transition_slide Transition_slide-active">
                            <div className="ProfilePhoto peer-color-3">
                                {/*<img*/}
                                {/*    // src="blob:https://web.telegram.org/3754113e-bb4e-40ee-831c-cf9bc0ec07cf"*/}
                                {/*    draggable="false"*/}
                                {/*    className="thumb"*/}
                                {/*    alt="">*/}
                                {/*    <img className="avatar-media opacity-transition slow open shown" alt=""*/}
                                {/*         // src="blob:https://web.telegram.org/fee808a1-40c6-4f45-b8c0-5cfce00f1b7d"*/}
                                {/*    />*/}
                                {/*</img>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="UcyW7tVh" dir="auto">
                    <div className="title QljEeKI5">
                        <div className="CEFe1FhH custom-emoji emoji"
                             data-entity-type="MessageEntityCustomEmoji"
                             data-document-id="5267183875603322563"
                             data-alt="🌟">
                            {/*<img*/}
                            {/*    // src="blob:https://web.telegram.org/f1bc3508-3a31-417f-baa3-3d2f32586532"*/}
                            {/*    className="gYSfUe37 O_TaDxWg sticker-media opacity-transition slow shown open"*/}
                            {/*    alt=""*/}
                            {/*    draggable="false"/>*/}
                        </div>
                    </div>
                </div>
            </div>
            <div className="ChatExtra">
                <UserProfileItem
                    title={fullName}
                    subtitle={t("chat.user-profile.full-name")}
                    icon="icon-phone"/>
                <UserProfileItem
                    title={username}
                    subtitle={t("chat.user-profile.username")}
                    icon="icon-phone"/>
                <UserProfileItem
                    title={"9М2"}
                    subtitle={"Класс"}
                    icon="icon-phone"/>
            </div>
        </div>
);
}

export default UserProfile;