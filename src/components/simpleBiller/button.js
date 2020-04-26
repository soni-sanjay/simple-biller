import React from 'react';

const Button = (props) => {
    return (
        <div className="text-center">
            <button className={props.className} onClick={props.actionListner}>
                <span className={props.iconClass}></span>
                <span className="h5">{props.children}</span>
            </button>
        </div>
    )
}
export default Button