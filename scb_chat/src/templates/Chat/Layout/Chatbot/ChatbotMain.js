import React, {useEffect} from 'react';
import TableChatbot from './TableChatbot';
import Pagination from 'components/common/Pagination';
import {LoadDataPaging} from 'functions/Utils';
import {chatbotAction} from "store/action";
import {useDispatch, useSelector} from "react-redux";
import {listPollMapping} from "templates/Chat/Layout/Chatbot/Mapping/listPollMapping";
import {useTranslation} from "react-i18next";

const ChatbotMain = () => {
    const {t:translate} = useTranslation()
    const dispatch = useDispatch();
    const listChatbotReducer = useSelector((state) => state.chatbotReducer.list);
    const dataPagination = useSelector((state) => state.chatbotReducer.meta);
    const dataPoll = listChatbotReducer.length > 0 ? listPollMapping(listChatbotReducer) : null;

    useEffect(() => {
        dispatch(chatbotAction.getListPoll({
            limit: 10,
        }));
    }, []);

    const handleChangePage = (page) => {
        console.log({page});
        dispatch(chatbotAction.getListPoll({
            page: page,
            limit: 10,
        }));
    }
    return (
        <div className="card">
            <div className="title__card">{`${translate('chatbot_list_topic')}`}</div>
            <TableChatbot dataSource={dataPoll} translate={translate}/>
            {
                dataPagination &&
                <div className="footer-table">
                    <div className="footer-table__total">
                    {`${translate('chatbot_total')}`}: <span className="text-primary">{dataPagination.total_record}</span>
                    </div>

                    <Pagination
                        data={LoadDataPaging(dataPagination.total_record, dataPagination.page, dataPagination.total_page, 9)}
                        limit={9}
                        onChange={handleChangePage}
                    />

                </div>
            }
        </div>
    )
}
export default ChatbotMain;