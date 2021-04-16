import React from 'react'
import { useTranslation } from 'react-i18next';

const InputSearch = (props) => {

    const { t } = useTranslation();
    const { placeholder, classPlus, onSearchChange, headingBorder } = props

    return (
        <div className={`search_field ${classPlus ? classPlus : ""}`}>
            <div className={`heading__border ${headingBorder ? headingBorder : ""} `}>
                <div className="form-group">
                    <i className="icon las la-search" />
                    <input type="text"
                        onKeyPress={(e) => { if (e.charCode === 13) onSearchChange(e) }}
                        placeholder={t(placeholder)}
                        className="pl-0 input_search"
                    />
                </div>
            </div>
        </div>
    )
}

export default InputSearch;