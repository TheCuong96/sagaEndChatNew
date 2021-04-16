import React from 'react';
import { LANGUAGE_OPTIONS } from 'contant';
import { useTranslation } from 'react-i18next';
import useClickOutside from 'hooks/useClickOutside';
import { mapModifiers } from 'functions/Utils';


const getDefaultLangObj = () => {
    const langCode = JSON.parse(localStorage.getItem('language'));
    const res = LANGUAGE_OPTIONS.filter(element => {
        return element.value == langCode
    });
    return res[0];
}

const ChangeLanguage = (props) => {
    const { minimize } = props;
    const className = mapModifiers('rc_language', minimize ? 'minimize' : undefined);
    const { t: translate, i18n } = useTranslation();
    const { ref, isVisible, setIsVisible } = useClickOutside(false);
    const languageCurrent = getDefaultLangObj();

    const onChangeLanguage = (lang) => {
        i18n.changeLanguage(lang.value);
        setIsVisible(false);
        localStorage.setItem('language', JSON.stringify(lang.value));
        // window.location.reload();
    }
    return (
        <div className={className}>
            <div
                className="rc_language_selected"
                onClick={() => setIsVisible(!isVisible)}
            >
                <span className="arrow ">
                    <svg xmlns="http://www.w3.org/2000/svg " width={24} height={24} viewBox="0 0 24 24 " fill="none " stroke="currentColor " strokeWidth={2} strokeLinecap="round " strokeLinejoin="round " className="feather feather-chevron-down svg-icon ">
                        <polyline points="6 9 12 15 18 9 " />
                    </svg>
                    <figure style={{ maxWidth: 25, marginRight: 5, margin: 0 }} class="d-inline-block">
                        <img class="w-100" src={languageCurrent.image} alt="homepage" />
                    </figure>
                    <span style={{ color: "#000000" }}>{translate(languageCurrent.label)}</span>
                </span>
            </div>
            <div
                ref={ref}
                className={`rc_language_dropdown dropdown-menu ${isVisible ? 'show' : ''}`}
            >
                {LANGUAGE_OPTIONS.map((lan) => {
                    if (lan.value !== languageCurrent.value) {
                        return (
                            <div
                                className="dropdown-item"
                                onClick={() => onChangeLanguage(lan)}
                                key={lan.id}
                            >
                                <figure style={{ maxWidth: 25, marginRight: 5, maxHeight: 12.5, }} class="d-inline-block">
                                    <img
                                        class="w-100" src={lan.image} alt="homepage"
                                        onClick={onChangeLanguage} data-value={JSON.stringify(lan)}
                                    />
                                </figure>
                                <span onClick={onChangeLanguage} data-value={JSON.stringify(lan)}>
                                    {translate(lan.label)}
                                </span>
                            </div>
                        )
                    }
                    return null;
                }
                )}
            </div>
        </div>
    );
}

export {
    getDefaultLangObj
}

export default ChangeLanguage;