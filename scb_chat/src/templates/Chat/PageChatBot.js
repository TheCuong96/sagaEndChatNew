import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChatbotMain from './Layout/Chatbot/ChatbotMain';
import DialogCreateChatbot from './Layout/Chatbot/DialogCreateChatbot';

const PageChatBot = () => {
    const { t : translate } = useTranslation();

    const [isShowModal, setShowModal] = useState(false);
    const onShowModal = () => {
        setShowModal(!isShowModal);
    }
    return (
        <>
            <div className="header-page">
                <div className="header-page__title">{`${translate('chatbot')}`}</div>
                <div className="header-page__action">
                    <button className="btn btn-blue" onClick={onShowModal}>
                        <i className="fas fa-folder-open  btn-icon"></i>
                        <span>{`${translate('chatbot_new')}`}</span>
                    </button>
                </div>
            </div>
            <ChatbotMain translate={translate}/>
            <DialogCreateChatbot
                
                visible={isShowModal}
                setShowModal={setShowModal}
                title="Tạo chủ đề"
                translate={translate}
            />
        </>
    )
}
export default PageChatBot;