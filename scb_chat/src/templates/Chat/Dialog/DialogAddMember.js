import React, { useEffect, useState } from 'react'
import { Modal, Form, Select } from 'antd'
import { Trans } from 'react-i18next'
import { RULES } from '../../../contant';
import { useDispatch } from 'react-redux';
import { chatProfileAction } from '../../../store/action'
const DialogAddMember = props => {
    const { close, visible, listMember, onSave } = props;
    const { Option } = Select;
    const [formAddMember] = Form.useForm();
    const dispatch = useDispatch()
    const onFinish = (values) => {
        let listMember = values.member
        onSave(listMember)
    }

    return (
        <Modal
            visible={visible}
            mask={true} width={420}
            footer={null} className="modal-dialog dialog_addgroup"
            onCancel={close}>
            <div className="modal-content">
                <div className="modal-header pl-0">
                    <div className="modal-header w-100">
                        <span className="modal-title" id="addGroupModalLabel"><Trans>add_members</Trans></span>
                        <button type="button" className="close" onClick={close}>
                            <span><i className="las la-times"></i></span>
                        </button>
                    </div>
                </div>
                <Form
                    className="modal-body"
                    form={formAddMember}
                    onFinish={onFinish}
                >
                    <div className="form-group">
                        <label><Trans>chat_member</Trans></label>
                        <Form.Item
                            name="member"
                            className="chat-mutile-select"
                            rules={RULES.require.form}
                        >
                            <Select mode="multiple"
                                allowClear={false}
                                maxLength={200}
                                dropdownClassName="select-chat"
                                filterOption={(input, option) => {
                                    if (option.props?.children) {
                                        return option.props.children.toLowerCase().indexOf(input.toLowerCase().trim()) >= 0
                                    }
                                    return ption.children.toLowerCase().indexOf(input.toLowerCase().trim()) >= 0

                                }}
                                className="form-control">
                                {
                                    listMember && listMember.map((item, index) =>
                                        <Option value={item.userId} key={index}>{item.roomName}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="heading__button mt-4 text-center">
                        <button className="btn btn_none_bg green_outline" onClick={() => formAddMember.submit()}><Trans>chat_save</Trans></button>
                        <button className="btn btn_none_bg red_outline" onClick={close}><Trans>chat_cancel</Trans></button>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}
export default DialogAddMember;