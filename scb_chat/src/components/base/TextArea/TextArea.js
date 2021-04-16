import React, { useState } from 'react';

const TextArea = (props) =>{
    const{value, handleChange, errors, name, className, placeholder, background, width} = props
    return(
        <div className="form-group">
            <textarea 
                placeholder={placeholder} 
                name= {name} 
                className={className} 
                style={{ height: 130,width: width, backgroundColor: background}} 
                value= {value} 
                onChange={handleChange}
            />
            <span style={{color: 'red', fontSize: 12}}>{errors}</span>
        </div>
    )
}

export default TextArea