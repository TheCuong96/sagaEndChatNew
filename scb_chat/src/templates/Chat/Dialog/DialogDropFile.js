import React, { useState, useRef, useEffect } from 'react';
import { Modal } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { formatBytes } from 'functions/Utils';
import { Form, Input } from 'antd'
import IconTypeMedia from 'components/common/Chat/MediaIcon/IconTypeMedia';

const File = (props) => {
    const { data, editFile, deleteFile } = props
    return (
        <div class="conversation__files--item file">
            <IconTypeMedia type={data.type} style={{ width: "20px" }} />
            <div class="name">
                <a class="link">{data.name}</a>
                <span class="size">{formatBytes(data.size)}</span>
            </div>
            <span class="actions">
                <i class="actions--icon actions--edit las la-edit" onClick={editFile}></i>
                <i class="actions--icon actions--del las la-times" onClick={deleteFile}></i>
            </span>
        </div>
    )
}
const ImageFile = (props) => {
    const { data, editFile, deleteFile } = props
    return (
        <div class="conversation__files--item image">
            <img src={URL.createObjectURL(data)} />
            <span class="actions">
                <i class="actions--icon actions--edit las la-edit" onClick={editFile}></i>
                <i class="actions--icon actions--del las la-times" onClick={deleteFile}></i>
            </span>
        </div>
    )
}
const VideoFile = (props) => {
    const { data, editFile, deleteFile } = props
    return (
        <div class="conversation__files--item video">
            <video src={URL.createObjectURL(data)} style={{ width: '100%' }} />
            <i class="actions--play fas fa-play"></i>
            <span class="actions">
                <i class="actions--icon actions--edit las la-edit" onClick={editFile}></i>
                <i class="actions--icon actions--del las la-times" onClick={deleteFile}></i>
            </span>
        </div>
    )
}

const DialogDropFile = props => {
    const { visible, close, onSave, STATE, openFile } = props;
    const { t } = useTranslation()
    const [formDrop] = Form.useForm()
    const editFile = (file) => {
        STATE.setState({ ...STATE.state, fileEdit: file })
        openFile()
    }
    useEffect(() => {
        if (STATE.state.message) {
            formDrop.setFieldsValue({ 'input_message_dialog': STATE.state.message })
        }
    }, [STATE.state.message])
    const deleteFile = (file) => {
        var list = STATE.state.listFiles
        list = list.filter((item) => item !== file)
        STATE.setState({ ...STATE.state, listFiles: list })
    }
    const onFinish = (values) => {
        let message = null
        if (values.input_message_dialog && values.input_message_dialog.trim().length > 0) {
            message = values.input_message_dialog.trim()
        }
        onSave({ message: message, files: STATE.state.listFiles })
    }

    return (
        <Modal
            visible={visible}
            mask={true} width={420}
            footer={null}
            // onCancel={close}
            maskClosable={false}
            className="modal-dialog"
            header={null} >
            <div class="modal-content" name-c="DialogDropFile">
                <div class="modal-header">
                    <span class="modal-title" id="addGroupModalLabel"><Trans>chat_files</Trans></span>
                    <button type="button" class="close" onClick={close}>
                        <span aria-hidden="true">
                            <i class="las la-times"></i>
                        </span>
                    </button>
                </div>
                <div class="modal-body conversation__files">
                    <div class="conversation__files--wrap">
                        <div class="conversation__files--list">
                            <div class="conversation__files--item--many">{STATE.state.listFiles.length} {t('chat_file_selected')}</div>
                            {STATE.state.listFiles && STATE.state.listFiles.map((item, index) =>
                                item.type.includes('image')
                                    ? <ImageFile data={item} key={index} deleteFile={() => deleteFile(item)} editFile={() => editFile(item)} />
                                    : item.type.includes('video')
                                        ? <VideoFile data={item} key={index} deleteFile={() => deleteFile(item)} editFile={() => editFile(item)} />
                                        : <File data={item} key={index} deleteFile={() => deleteFile(item)} editFile={() => editFile(item)} />
                            )
                            }
                        </div>
                        <Form
                            form={formDrop}
                            className="conversation__files--input"
                            onFinish={onFinish} >
                            <div class="form-group">
                                <label class="d-flex">
                                    <span class="label"><Trans>chat_note</Trans></span>
                                    <span class="add-new" onClick={openFile}>
                                        + <Trans>menu_add</Trans>
                                    </span>
                                </label>
                                <Form.Item
                                    name="input_message_dialog"
                                    className="conversation__files--emoji-wrap">
                                    <Input.TextArea className="form-control" autosize={{ maxRows: 3 }} rows={1} />
                                </Form.Item>
                            </div>
                        </Form>
                        <div class="heading__button mt-4 text-center">
                            <button class="btn btn_none_bg green_outline" onClick={() => formDrop.submit()}><Trans>chat_send</Trans></button>
                            <button class="btn btn_none_bg red_outline" onClick={close}><Trans>chat_cancel</Trans></button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>)
}
export default DialogDropFile