import React from "react";

const BackButton = () => {
    return (
        <div className="back-button">
            <button type="button"
                    className="Button smaller translucent round"
                    aria-label="Back"
                    title="Back">
                <div className="animated-close-icon state-back"/>
            </button>
        </div>
    );
}

export default BackButton;