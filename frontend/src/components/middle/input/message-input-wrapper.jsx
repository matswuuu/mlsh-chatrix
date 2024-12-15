import MessageInput from "./message-input.jsx";
import AttachmentMenu from "./attachmentmenu/attachment-menu.jsx";
import "./input.css"
import React, {useState} from 'react';

import Select from 'react-select';

const MessageInputWrapper = ({options}) => {
    const [selectedOptions, setSelectedOptions] = useState({})

    const getSelectedOptions = () => {
        return selectedOptions.map((option) => option.value)
    }

    return (
        <div className="composer-wrapper">
            {options ?
                <Select
                    placeholder={"Выберите фильтры"}
                    className="option-selection"
                    classNamePrefix="option-selection"
                    menuPlacement="top"
                    isMulti
                    onChange={setSelectedOptions}
                    options={options.map((option) =>
                        ({value: option.value, label: option.name})
                    )}
                /> : null
            }
            <div className="message-input-wrapper peer-color-2">
                <MessageInput getOptions={getSelectedOptions}/>
                <AttachmentMenu/>
            </div>
        </div>
    );
}

export default MessageInputWrapper;