import React, { useState, useEffect, useRef } from 'react';
import { getLocalStorage } from 'functions/Utils';
import { Menu, Dropdown, Button } from 'antd';
import { useTranslation, Trans } from 'react-i18next';

const lang_en = "../../images/lang_en.png"
const lang_vi = "../../images/lang_vi.jpg"
const menu = () => {
   
    const onChangeLang = (value) => {
        localStorage.setItem('language', JSON.stringify(value));
        window.location.reload()
    }

    return (<Menu className="user__langs--list dropdown-menu show">
        <Menu.Item key="1" onClick={() => onChangeLang('vi')}>
            <figure className="icon">
                <img src={lang_vi} alt="lang" />
            </figure>
            <span><Trans>langague_vi</Trans></span>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => onChangeLang('en')}>
            <figure className="icon">
                <img src={lang_en} alt="lang" />
            </figure>
            <span><Trans>langague_en</Trans></span>
        </Menu.Item>
    </Menu >)
};

const UserLangMenu = (props) => {
    const [language, setLang] = useState()
    const { t } = useTranslation()
    useEffect(() => {
        let lang = getLocalStorage('language')
        if (lang) {
            setLang(lang)
        } else {
            setLang('en')
        }
    }, [])
    return (
        <div className="user__langs">
            <figure className="user__langs--img">
                <img src={language === 'en' ? lang_en : lang_vi} alt="lang" />
            </figure>

            <Dropdown overlay={menu} openClassName="show" trigger={['click']}  >
                <div className="user__langs--select">
                    <span className="user__langs--selected dropdown-toggle" >{language === 'en' ? t('langague_en') : t('langague_vi')}</span>
                </div>
            </Dropdown>
        </div>
    )
}
export default UserLangMenu