import React from 'react';
import Modal from 'components/base/Modal/ModalCustom'
import { Form } from 'antd';
import Input from 'components/base/Input/Input';
import {useDispatch} from "react-redux";
import chatbotAction from "store/action/chatbotAction";
import {formatPollCreateParams} from "templates/Chat/Layout/Chatbot/Mapping/createPollMapping";

const DialogCreateChatbot = ({ visible, setShowModal, title }) => {
    const [formCreate] = Form.useForm();
    const dispatch = useDispatch();

    const onSubmit = () => {
        formCreate.submit();
    }

    const onFinish = (values) => {
        const createData = formatPollCreateParams(values);
        dispatch(chatbotAction.createPoll(createData));
    }

    const onCancel = () => {
        setShowModal(false);
    }
    return (
        <Modal
            visible={visible}
            title={title}
            setVisible={setShowModal}
            widthModal={485}
        >
            <Form
                form={formCreate}
                onFinish={onFinish}
            >
                <div className="group mb-2">
                    <label className="label" style={{ marginBottom: 0, color: "#666b77" }}>Tên chủ đề</label>
                    <Form.Item name="name">
                        <Input placeholder="Tên chủ đề" />
                    </Form.Item>
                </div>
                <div className="group mb-2">
                    <label className="label" style={{ marginBottom: 0, color: "#666b77" }}>Ảnh chủ đề</label>
                    <Form.Item name="image">
                        <Input type="file" />
                    </Form.Item>
                </div>
            </Form>
            <div className="modal-footer" style={{justifyContent: 'center', borderTop: 'none'}}>
                <button onClick={onSubmit} className="btn btn-blue">Lưu</button>
                <button onClick={onCancel} className="btn btn-red-outline">Hủy bỏ</button>
            </div>
        </Modal>
    )
}
export default DialogCreateChatbot;