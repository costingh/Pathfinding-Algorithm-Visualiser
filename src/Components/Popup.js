import React from 'react';
import '../styles/Popup.css';

export default function Popup(props) {
    return (
        <div className='popup'>
            <div className='popup-inner'>
                <div className="popup-close-button" onClick={props.closePopup}>
                    X
                </div>
                <div className="popup-icon"></div>
                <h1 className="popup-header">{props.header}</h1>
                <p className="popup-description">{props.description}</p>
                <div className="popup-button" onClick={props.handleButtonClick}>{props.buttonText}</div>
            </div>
        </div>
    );
}
