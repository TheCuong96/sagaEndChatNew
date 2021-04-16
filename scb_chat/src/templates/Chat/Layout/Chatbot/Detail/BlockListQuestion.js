import {Input} from 'antd';
import Pagination from 'components/common/Pagination';
import {LoadDataPaging} from 'functions/Utils';
import React, {useEffect} from 'react';
import TableQuestion from './TableQuestion';
import {useDispatch, useSelector} from "react-redux";
import {chatbotAction} from "store/action";
import {listQuestionMapping} from "templates/Chat/Layout/Chatbot/Mapping/listQuestionMapping";
import {useParams} from "react-router-dom";

const BlockListQuestion = () => {
    const dispatch = useDispatch();
    const listChatbotReducer = useSelector((state) => state.chatbotReducer.list);
    const dataPagination = useSelector((state) => state.chatbotReducer.meta);
    const dataQuestion = listChatbotReducer.length > 0 ? listQuestionMapping(listChatbotReducer) : null;
    const { id: pollId } = useParams();

    useEffect(() => {
        dispatch(chatbotAction.getListQuestion({
            poll_id: pollId,
            limit: 10,
        }));
    }, []);

    const handleChangePage = (page) => {
        console.log({page});
        dispatch(chatbotAction.getListQuestion({
            poll_id: pollId,
            page: page,
            limit: 10,
        }));
    }
    return (
        <div className="card">
            <div className="title__card">
                <label>Danh sách câu hỏi: Chuyển tiền</label>
                <div className='group_search'>
                    <Input placeholder="Tìm kiếm câu hỏi"/>
                </div>
            </div>
            <TableQuestion dataSource={dataQuestion}/>
            {
                dataPagination &&
                <div className="footer-table">
                    <div className="footer-table__total">
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
export default BlockListQuestion;