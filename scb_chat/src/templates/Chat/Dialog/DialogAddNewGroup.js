import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { useDispatch } from 'react-redux';
import { chatProfileAction } from '../../../store/action'
import { Trans, useTranslation } from 'react-i18next';
import { showNotification } from 'functions/Utils';
import { RULES } from 'contant';

const DialogAddNewGroup = props => {
    const { visible, onClose, listUser } = props;
    const [formAddGroup] = Form.useForm();
    const { Option } = Select
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const onSave = () => {
        formAddGroup.submit();
    }

    const onFinish = (values) => {
        if (values.group_name && values.group_name.trim().length > 0) {
            dispatch(chatProfileAction.createRoomGroupRequest({ system_user_id_list: values.member, room_name: values.group_name.trim() }))
            onClose()
        } else {
            showNotification({
                type: NOTIFICATION_TYPE.error,
                message: t('text_name_group_error')
            })
        }
    }

    return (
        <Modal
            visible={visible}
            mask={true} width={420}
            footer={null} className="modal-dialog dialog_addgroup"
            onCancel={onClose}>
            <div className="modal-content" name-c="DialogAddNewGroup">
                <div className="modal-header pl-0">
                    <div className="modal-header w-100">
                        <span className="modal-title" id="addGroupModalLabel"><Trans>chat_add_new_groups</Trans></span>
                        <button type="button" className="close" onClick={onClose}>
                            <span><i className="las la-times"></i></span>
                        </button>
                    </div>
                </div>
                <Form
                    className="modal-body"
                    form={formAddGroup}
                    onFinish={onFinish}
                >
                    <div className="form-group">
                        <label><Trans>chat_group_name</Trans></label>
                        <Form.Item
                            name="group_name"
                            rules={[{ required: true, message: t('chat_warning_input_group_name') }]}>
                            <Input className="form-control" autoComplete="off" />
                        </Form.Item>
                    </div>
                    <div className="form-group">
                        <label><Trans>chat_member</Trans></label>
                        <Form.Item
                            name="member"
                            className="chat-mutile-select"
                            rules={RULES.require.form}
                        >
                            <Select mode="multiple"
                                allowClear
                                showArrow
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                className="form-control">
                                {
                                    listUser ? listUser.map((item, index) =>
                                        <Option value={item.userId} key={index}>{item.roomName}</Option>
                                    ) : ""
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="heading__button mt-4 text-center">
                        <button className="btn btn_none_bg green_outline" onClick={onSave}><Trans>chat_save</Trans></button>
                        <button className="btn btn_none_bg red_outline" onClick={onClose}><Trans>chat_cancel</Trans></button>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}
export default DialogAddNewGroup;