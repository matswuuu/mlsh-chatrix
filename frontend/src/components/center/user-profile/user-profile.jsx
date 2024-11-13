import React from "react";
import "./user-profile.css"
import {useTranslation} from "react-i18next";
import UserProfileItem from "./user-profile-item.jsx";

const UserProfile = () => {
    const [t] = useTranslation();

    return (
        <div className="profile-info new-chat">
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
                        <h3 dir="auto" role="button" className="fullName AS54Cntu SgogACy_ vr53L_9p">
                            test test test
                        </h3>
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
                <UserProfileItem title={"@matswuuuu"} subtitle={"Имя пользователя"} icon="icon-phone"/>
                <UserProfileItem title={"9М2"} subtitle={"Класс"} icon="icon-phone"/>
            </div>
        </div>
);
}

export default UserProfile;