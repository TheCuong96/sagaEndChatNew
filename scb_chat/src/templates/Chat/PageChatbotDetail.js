import { PAGES_URL } from 'contant';
import React from 'react';
import { Link } from 'react-router-dom';
import BlockListQuestion from './Layout/Chatbot/Detail/BlockListQuestion';
import BlockQuestion from './Layout/Chatbot/Detail/BlockQuestion';

const PageChatbotDetail = () => {
    return (
        <>
            <div className="header-page">
                <div className="header-page__title">Chatbot</div>
                <div className="header-page__action">
                    <Link to={PAGES_URL.chatbot}>
                        <button className="btn btn-blue" >
                            <i className="fas fa-angle-left"></i>
                            <span> Trở lại</span>
                        </button>
                    </Link>
                </div>
            </div>
            <BlockQuestion />
            <BlockListQuestion />
        </>
    )
}
export default PageChatbotDetail;