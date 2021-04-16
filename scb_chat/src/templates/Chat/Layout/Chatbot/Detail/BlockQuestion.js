import React, {useEffect} from 'react';
import { Form } from 'antd';
import Input from 'components/base/Input/Input';
import {useDispatch, useSelector} from "react-redux";
import chatbotAction from "store/action/chatbotAction";
import {formatAddQuestionData} from "templates/Chat/Layout/Chatbot/Mapping/addQuestionMapping";
import {useParams} from "react-router-dom";

const BlockQuestion = () => {
    const [formCreate] = Form.useForm();
    const dispatch = useDispatch();
    const chatbotReducer = useSelector(state => state.chatbotReducer)
    const {success} = chatbotReducer
    const { id: pollId } = useParams();

    const onSubmit = () => {
        formCreate.submit();
    }

    const onFinish = (values) => {
        console.log(values)
        const createData = formatAddQuestionData(values);
        dispatch(chatbotAction.addQuestion(createData, createData.poll_id = pollId));
    }

    useEffect(() => {
        if (success) {
            formCreate.resetFields();
        }

    }, [success])

    return (
        <div className="card">
            <Form
                form={formCreate}
                onFinish={onFinish}
            >
                <div className="group">
                    <span>Câu hỏi</span>
                    <Form.Item name="question">
                        <Input placeholder="Nhập câu hỏi" />
                    </Form.Item>
                </div>
                <div className="group mt-2">
                    <span>Câu trả lời</span>
                    <Form.Item name="answer">
                        <Input placeholder="Nhập câu trả lời" />
                    </Form.Item>
                </div>
            </Form>
            <div className="footer-action-btn mt-2">
                <button onClick={onSubmit} className="btn btn-blue">Tạo câu hỏi</button>
            </div>
        </div>
    )
}
export default BlockQuestion;