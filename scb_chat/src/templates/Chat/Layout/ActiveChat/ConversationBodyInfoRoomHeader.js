import React, { useState, useEffect, useRef } from 'react'
import { Input, Form } from 'antd'
import { RULES } from 'contant'
import { showNotification } from 'functions/Utils'
import { Trans } from 'react-i18next'
import DialogEditorAvatar from '../../Dialog/DialogEditorAvatar'
import AvatarRender from './ConversationMessage/AvatarRender'

const GroupInfoRender = (props) => {
    const { STATE } = props
    const { roomInfoData } = STATE.state;
    const data = roomInfoData
    const [formEdit] = Form.useForm()
    const refAvatar = useRef()
    const [state, setState] = useState({
        isEdit: false,
        avatar: null
    })
    useEffect(() => {
        if (data) {
            setState({ ...state, avatar: data.avatar })
        }
    }, [data])
    const [fileImageSelected, setFileImageSelected] = useState()
    const selectImageList = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileImageSelected(e.target.files[0])
            e.target.value = ""
        }
    }
    const onChangeAvatar = (data) => {
        setFileImageSelected()
        setState({ ...state, avatar: URL.createObjectURL(data) });
        STATE.setState({ newGroupsAvatarFile: data })
    }
    const onFinishEdit = () => {
        let newGroupsName = formEdit.getFieldValue('group_name');
        let arrSplit = newGroupsName.split(" ").filter(e => e != "").join(" ")
        if (data.roomName != arrSplit) {
            STATE.setState({ newGroupsName: arrSplit })
        }
        setState({ ...state, isEdit: !state.isEdit })
    }
    const onSubmit = () => {
        formEdit.submit()
    }
    const showInputAvatar = () => {
        refAvatar.current.click()
    }
    const onEditGroupName = () => {
        formEdit.setFieldsValue({ "group_name": data.roomName })
        setState({ ...state, isEdit: !state.isEdit })
    }
    return (
        <div className="partner__group">
            {fileImageSelected && <DialogEditorAvatar fileAvatar={fileImageSelected} onSave={onChangeAvatar} visible={fileImageSelected ? true : false} close={() => setFileImageSelected()} />}
            <figure class="partner__group--avatar">
                <AvatarRender url={data.avatar} fullName={data.roomName} />
                {data.isAdmin && <div class="partner__group--upload-avatar" onClick={showInputAvatar}>
                    <input ref={refAvatar} class="input d-none" type="file" accept=".jpg, .jpeg, .png" onChange={selectImageList} />
                    <i class="icon fas fa-camera" ></i>
                </div>}
            </figure>
            <div class="name w-100">
                {!state.isEdit && <div class="partner__group--name">
                    <span class="partner__group--name--text">{data.roomName} </span>
                    {data.isAdmin && <i class="partner__group--icon edit fas fa-edit" onClick={onEditGroupName}></i>}
                </div>}
                {state.isEdit && <div class="partner__group--edit">
                    <Form
                        form={formEdit}
                        onFinish={onFinishEdit}>
                        <Form.Item name="group_name" rules={RULES.text.form()}>
                            <Input className="partner__group--edit--input" type="text" />
                        </Form.Item>
                    </Form>
                    <div class="partner__group--edit--icon">
                        <i class="partner__group--icon checked fas fa-check" onClick={onSubmit}></i>
                        <i class="partner__group--icon off fas fa-times" onClick={() => setState({ ...state, isEdit: false })}></i>
                    </div>
                </div>}
            </div>
        </div>
    )
}

const MemberInfoRender = (props) => {
    const { data, isShowSendMessage, sendMessage } = props
    return (<div className="partner__user">
        <figure class="img">
            {data && <AvatarRender url={data.avatar} fullName={data.roomName} />}
        </figure>
        <div class="name user mr-0">
            {data && data.roomName}
            {isShowSendMessage && <div class="user-sendmessage__text" onClick={sendMessage}>
                <Trans>text_send_message</Trans>
            </div>}
        </div>
    </div>)
}
const ConversationBodyInfoRoomHeader = (props) => {
    const { STATE, roomInfoData } = props
    const sendMessage = (value) => {
        if (value) {
            STATE.setState({ createUserRoom: { userId: STATE.state.mentionData.userId } })
        }
    }
    return (
        <div className="partner__item partner__avatar">
            {roomInfoData && roomInfoData.isGroup ?
                <GroupInfoRender STATE={STATE} />
                : <MemberInfoRender data={roomInfoData} isShowSendMessage={STATE.state.mentionData} sendMessage={sendMessage} />}
        </div>
    )
}
export default ConversationBodyInfoRoomHeader
