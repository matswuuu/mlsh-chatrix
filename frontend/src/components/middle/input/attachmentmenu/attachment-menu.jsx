import React from "react";
import {useTranslation} from "react-i18next";

const AttachmentMenu = () => {
    const {t} = useTranslation();

    return (
        <div className="AttachMenu">
            <button id="attach-menu-button"
                    type="button"
                    className="Button AttachMenu--button default translucent round"
                    aria-label={t("chat.attachment.add")}
                    aria-controls="attach-menu-controls"
                    aria-haspopup="true"
                    title={t("chat.attachment.add")}>
                <i className="icon icon-attach" aria-hidden="true"/>
            </button>
            <div id="attach-menu-controls"
                 className="Menu compact AttachMenu--menu fluid"
                 aria-labelledby="attach-menu-button"
                 role="menu">
                <div role="presentation" className="bubble menu-container custom-scroll opacity-transition fast not-shown not-open">
                    <div role="menuitem" tabIndex="0" className="MenuItem compact">
                        <i className="icon icon-photo"/>{t("chat.attachment.photo-or-video")}
                    </div>
                    <div role="menuitem" tabIndex="0" className="MenuItem compact">
                        <i className="icon icon-document"/>{t("chat.attachment.file")}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttachmentMenu;