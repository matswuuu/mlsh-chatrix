import React from "react";

const BackButton = ({onClick}) => {
    return (
        <div className="back-button">
            <button type="button"
                    className="Button smaller translucent round"
                    onClick={onClick}>
                <div className="animated-close-icon state-back"/>
            </button>
        </div>
    );
}

export default BackButton;