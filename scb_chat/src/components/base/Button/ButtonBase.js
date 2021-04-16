import { mapModifiers } from 'functions/Utils';
import React from 'react';

const ButtonBase = (props) => {
    const { onClick, className, block, type = 'button', size, color, modifiers, ...remaningProps } = props;
    const classNameModifiers = mapModifiers('rc_button', color, size, modifiers, block ? 'block' : undefined);
    return (
        <button
            className={`${classNameModifiers} ${className}`}
            onClick={onClick}
            type={type}
            {...remaningProps}
        >
            {props.children}
        </button>
    )
}

export default ButtonBase;