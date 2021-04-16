import React from 'react';
import Modal from 'components/base/Modal/ModalCustom'
import { Form } from 'antd';
import InputPassword from 'components/common/Input/InputPassword';

const DialogChangePassword = ({ visible, setShowModal, title }) => {
    const [formPassword] = Form.useForm();
    const onFinish = (values) => {
        console.log({ values });
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
                form={formPassword}
                onFinish={onFinish}
            >
                <div className="group mb-2">
                    <label className="label" style={{ marginBottom: 0, color: "#666b77" }}>old password</label>
                    <Form.Item name="current-password">
                        <InputPassword />
                    </Form.Item>
                </div>
                <div className="group mb-2">
                    <label className="label" style={{ marginBottom: 0, color: "#666b77" }}>New Password</label>
                    <Form.Item name="new-password">
                        <InputPassword />
                    </Form.Item>
                </div>
                <div className="group mb-2">
                    <label className="label" style={{ marginBottom: 0, color: "#666b77" }}>Confirm password</label>
                    <Form.Item name="confirm-password">
                        <InputPassword />
                    </Form.Item>
                </div>
                <div className="modal-footer" style={{ justifyContent: 'center', borderTop: 'none' }}>
                    <button type="submit" className="btn btn-blue" >Lưu</button>
                    <button onClick={onCancel} className="btn btn-red-outline" >Hủy bỏ</button>
                </div>
            </Form>

        </Modal>
    )
}
export default DialogChangePassword;