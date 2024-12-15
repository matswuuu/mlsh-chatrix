import React from "react";

const UserProfileItem = ({title, subtitle, icon}) => {
    return (
        <div className="ListItem">
            <div className="ListItem-button" role="button" tabIndex="0">
                <div className="ripple-container"/>
                <i className={`icon ${icon} ListItem-main-icon`} aria-hidden="true"/>
                <div className="multiline-item">
                    <span className="title">{title}</span>
                    <span className="subtitle">{subtitle}</span>
                </div>
            </div>
        </div>
    );
}

export default UserProfileItem;