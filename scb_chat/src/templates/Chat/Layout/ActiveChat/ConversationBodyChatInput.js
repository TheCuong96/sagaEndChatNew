import React, { useState, useEffect, useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import DialogDropFile from '../../Dialog/DialogDropFile'
import { useDispatch, useSelector } from 'react-redux'
import { chatAction, chatProfileAction } from '../../../../store/action'
import * as hepler from '../../../../functions/ChatHelper'
import { chatContant, NOTIFICATION_TYPE } from 'contant';
import { convertToRaw } from "draft-js";
import TextInputMessage from 'components/common/Chat/TextInputMessage'
import EmojiInput from 'components/common/Chat/EmojiInput'
import { showNotification, translate } from 'functions/Utils'
const defaultValue = "defaultValue"
const ConversationBodyChatInput = props => {
    const { roomDataChange, roomData, userId, roomInfoData, onChangeData } = props
    const { t } = useTranslation()
    const refFiles = useRef()
    const chatProfileReducer = useSelector(state => state.chatProfileReducer)
    const { uploadFile, createUserChat, error } = chatProfileReducer
    const dispatch = useDispatch()
    const [state, setState] = useState({
        listFiles: [],
        fileEdit: null,
        message: null,
        listMember: null,
        isShowEmoji: false,
        editorStateRow: null,
        visible: false,
        chatData: {
            mentions: [],
            message: ""
        }
    })
    const [isResetView, setResetView] = useState(false)
    const [draftDataEditor, setDraftDataEditor] = useState()
    const [typing, setTyping] = useState(defaultValue)
    const [draft, setDraft] = useState()
    const [imojiIcon, setImojiIcon] = useState()
    const [keyIndex, setKeyIndex] = useState(0)
    const [isFocus, setFocus] = useState()
    const [saveFirstChatUser, setSaveFirstChatUser] = useState()

    const [isTimer, setTimer] = useState()

    useEffect(() => {
        if (roomData && error) {
            dispatch(chatAction.sendRabbitEvent({
                key_message: chatAction.SENDING_FILE_MESSAGE,
                data: {
                    sender_id: userId,
                    room_id: roomData.roomId,
                    state: 0
                }
            }))
        }
    }, [error])

    useEffect(() => {
        setResetView(true)
    }, [roomData])

    //xử lý khi room info được update
    useEffect(() => {
        if (roomInfoData) {
            hanlderRoomListMember(roomInfoData)
        }
    }, [roomInfoData])

    useEffect(() => {
        if (uploadFile && uploadFile.listFile.length > 0) {
            let files = uploadFile.listFile
            if (files) {
                const clientMessage = hepler.getClientMessageId()
                let attactments = []
                let fileAttachmens = []
                if (files && files.length > 0) {
                    for (var i = 0; i < files.length; i++) {
                        const { file_name: title, file_url, thumbnail_url, file_type: content_type, attachment_id } = files[i]
                        attactments.push(attachment_id)
                        fileAttachmens.push({ title, content_type, file_url, thumbnail_url, attachment_id })
                    }
                }
                let data = createModelMessageServer(chatContant.MESSAGE_TYPE_VIEW, uploadFile.room_id, clientMessage.client_mid,
                    clientMessage.timestamp, attactments, [], 0, "")
                dispatch(chatAction.sendRabbitEvent({
                    key_message: chatAction.SEND_MESSAGE,
                    data
                }))
                let tmpMessage = createModelMessageServer(chatContant.MESSAGE_TYPE_VIEW, uploadFile.room_id, clientMessage.client_mid,
                    clientMessage.timestamp, fileAttachmens, [], 0, "")
                onChangeData({ addNewMessage: tmpMessage })
            }
            dispatch(chatAction.sendRabbitEvent({
                key_message: chatAction.SENDING_FILE_MESSAGE,
                data: {
                    sender_id: userId,
                    room_id: uploadFile.room_id,
                    state: 0
                }
            }))
            setState(e => ({ ...e, visible: false, listFiles: [] }))
            dispatch(chatProfileAction.clear())
        }
    }, [uploadFile])

    useEffect(() => {
        if (imojiIcon) {
            setImojiIcon()
        }
    }, [imojiIcon])

    let timerTypingStop, timerTypingSending
    useEffect(() => {
        if (keyIndex) {
            if (timerTypingStop) {
                clearTimeout(timerTypingStop)
                if (!typing) {
                    setTimerTypingStop()
                }
            }
            if (typing) {
                timerTypingStop = setTimeout(() => {
                    if (typing) {
                        setTyping(false)
                        sendTyping(false)
                        setKeyIndex(0)
                    }
                }, 5000)
            }
        }
        return () => clearTimeout(timerTypingStop)
    }, [keyIndex])

    //gửi tin nhắn chưa append vào rabbit lên server
    useEffect(() => {
        if (roomDataChange && roomData) {
            //send draft message
            let chatData = state.chatData
            if (chatData.message.length > 0) {
                sendDraftDefault(chatData.mentions, chatData.message, 1)
                setState({ ...state, chatData: { message: "", mentions: [] } })
            } else if (roomData.draft && roomData.draft.body && chatData.message.length == 0) {
                sendDraftDefault([], null, 0)
            }
            clearTimeout(timerTypingStop)
            clearTimeout(timerTypingSending)
            setDraft(false)
            setTyping(false)
            sendTyping(false)
        }
    }, [roomDataChange])

    useEffect(() => {
        if (createUserChat && !roomData.roomId) {
            const roomId = createUserChat.detail.room_id
            let newRoomData = roomData
            if (!newRoomData.roomId) {
                newRoomData.roomId = roomId
                let newRoomInfoData = roomInfoData
                if (newRoomInfoData && !newRoomInfoData.roomId) {
                    newRoomInfoData.roomId = roomId
                }
                onChangeData({ roomData: newRoomData, roomInfoData: newRoomInfoData })
            }
            if (saveFirstChatUser) {
                if (saveFirstChatUser.fileAttachmens) {
                    sendFileAttachment(saveFirstChatUser)
                } else {
                    onSendMessage(saveFirstChatUser)
                }
            }
        }
    }, [createUserChat])
    //map data của roomInfoData
    const hanlderRoomListMember = (room) => {
        let listMember = null
        if (room && room.isGroup) {
            listMember = [].concat(room.listMember)
        }
        if (roomData && roomData.draft && roomData.draft.body && roomData.draft.body.length > 0) {
            const draftEditor = hepler.createMentionEntities(roomData.draft.body, roomData.draft.mentions)
            setDraftDataEditor(draftEditor)
            setState({ ...state, listMember, chatData: { message: roomData.draft.body, mentions: roomData.draft.mentions } })
            setDraft(true)
        } else {
            setState({ ...state, listMember })
        }
    }

    //gửi tin nhắn nháp lên server
    const sendDraftDefault = (mentions, body, state = 0) => {
        dispatch(chatAction.sendRabbitEvent({
            key_message: chatAction.DRAFT_MESSAGE,
            data: {
                room_id: roomData.roomId,
                state: state, mentions, body
            },
        }))
    }
    // const [timerTypingStop, setTimerTypingStop] = useState()
    // const [timerDraft, setTimerDraft] = useState()



    const onChangeKey = () => {
        if (isFocus) {
            if (!isTimer) {
                setTimer(true)
                setTyping(true)
                sendTyping(true)
                timerTypingSending = setTimeout(() => {
                    setTimer(false)
                }, 3000)
            }
            setKeyIndex(keyIndex + 1)
        }
        return () => clearTimeout(timerTypingSending)
    }

    //gửi trạng thái đang nhập lên rabbit
    const sendTyping = (typing) => {
        if (roomData.roomId) {
            let id = userId
            let state = typing ? 1 : 0;// 1 là đang nhập, 0 là không còn nhập
            dispatch(chatAction.sendRabbitEvent({
                key_message: chatAction.TYPING_MESSAGE,
                data: {
                    sender_id: id,
                    room_id: roomData.roomId,
                    state
                }
            }))
        }
    }
    // lưu data của khung input thay đổi, kể cả emoji
    const onChangeMessage = (editor) => {
        const raw = convertToRaw(editor.getCurrentContent());
        const chatData = hepler.mapperDataSendMessageTextAndMentions(raw)
        // console.log({ chatData })
        setState({ ...state, chatData })
    }

    // action khi không còn nhấn vào ô input
    const onFocusMessage = () => {
        setFocus(true)
        sendTyping(true)
    }
    //ngừng chat
    const onBlurMessage = () => {
        const chatData = state.chatData
        if (chatData.message && chatData.message.trim().length > 0) {
            // setTimerDraft(setTimeout(() => {
            const chatDataNew = state.chatData
            if (chatDataNew.message && chatDataNew.message.trim().length > 0) {
                sendDraftDefault(chatDataNew.mentions, chatDataNew.message, 1)
                setDraft(true)
            }
            // }, 100))
        } else if (draft) {
            //message đã xoá, -> ko còn draft
            sendDraftDefault([], null, 0)
            setDraft(false)
        }
        setTyping(false)
        sendTyping(false)
        setFocus(false)
    }

    const openFile = () => {
        refFiles.current.click()
    }
    const sendMessageFile = ({ message, files }) => {
        if (files && files.length > 0) {
            let newRoomData = roomData
            if (!newRoomData.roomId) {
                setSaveFirstChatUser({ fileAttachmens: files })
                dispatch(chatProfileAction.createRoomUserRequest({ system_user_id: newRoomData.singleChatId }))
            } else {
                if (message && message.trim().length > 0) {
                    message = message.trim()
                    onSendMessage({ message })
                } else {

                    setState(e => ({ ...e, listFiles: [], fileEdit: null, message: null, visible: false }))
                }
                sendFileAttachment({ fileAttachmens: files })
            }
        }
    }

    const sendFileAttachment = ({ fileAttachmens }) => {
        let newRoomData = roomData
        dispatch(chatProfileAction.uploadFile({ fileLists: fileAttachmens, room_id: newRoomData.roomId }))
        //SENDING_FILE_MESSAGE
        dispatch(chatAction.sendRabbitEvent({
            key_message: chatAction.SENDING_FILE_MESSAGE,
            data: {
                sender_id: userId,
                room_id: newRoomData.roomId,
                state: 1
            }
        }))
    }

    const createModelMessageServer = (message_type, room_id, client_mid, timestamp, attachments, mentions, review_url, body) => {
        return { message_type, room_id, client_mid, timestamp, attachments, mentions, review_url, body }
    }

    //send message với files
    const onSendMessage = ({ message, mentions }) => {
        let newRoomData = roomData
        if (!newRoomData.roomId) {
            setSaveFirstChatUser({ message, mentions })
            dispatch(chatProfileAction.createRoomUserRequest({ system_user_id: roomData.singleChatId }))
        } else if (message && message.trim().length > 0) {
            // if (timerDraft) {
            //     clearTimeout(timerDraft)
            // }
            let review_url = hepler.checkHaveLinkMessage(message) ? 1 : 0
            const clientMessage = hepler.getClientMessageId()
            let data = createModelMessageServer(chatContant.MESSAGE_TYPE_VIEW, newRoomData.roomId, clientMessage.client_mid,
                clientMessage.timestamp, [], mentions, review_url, message ? message.trim() : "")
            dispatch(chatAction.sendRabbitEvent({
                key_message: chatAction.SEND_MESSAGE,
                data
            }))
            if (roomData && roomData.draft && roomData.draft.body) {
                sendDraftDefault([], null, 0)
                setDraft(false)
            }
            setTyping(false)
            sendTyping(false)
            let tmpMessage = createModelMessageServer(chatContant.MESSAGE_TYPE_VIEW, newRoomData.roomId, clientMessage.client_mid,
                clientMessage.timestamp, [], mentions, review_url, message ? message.trim() : "")
            onChangeData({ addNewMessage: tmpMessage })
        }
        setState({ ...state, listFiles: [], fileEdit: null, message: null, chatData: { message: "", mentions: [] }, })
        setResetView(true)
    }
    //seleted list file
    const onSelectedFiles = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            let listFiles = [].concat(state.listFiles)
            let listFileSelected = []
            if (e.target.files) {
                for (var i = 0; i < e.target.files.length; i++) {
                    if (chatContant.FILE_LIMIT_SELECTED.some(v => e.target.files[i].type.length > 0 ? e.target.files[i].type.includes(v) : e.target.files[i].name.split('.').pop().includes(v))) {
                        listFileSelected.push(e.target.files[i])
                    } else {
                        showNotification({
                            type: NOTIFICATION_TYPE.error,
                            message: t('text_error_file') + ": " + e.target.files[i].name, duration: 1.8
                        })
                    }
                }
            }
            if (listFileSelected.length > 0) {
                const { results, listOutSize, listSizeEmpty } = hepler.getListFileAndOutSize(listFileSelected)
                listFileSelected = results

                if (listOutSize.length > 0) {
                    showNotification({
                        type: NOTIFICATION_TYPE.error,
                        message: t('text_error_max_file'), duration: 1.8
                    })
                } else if (listSizeEmpty.length > 0) {
                    showNotification({
                        type: NOTIFICATION_TYPE.error,
                        message: t('text_error_file_empty'), duration: 1.8
                    })
                }
                if (listFileSelected.length > 0) {
                    //kiểm tra edit và change file
                    if (state.fileEdit) {
                        var index = listFiles.findIndex((item) => item === state.fileEdit)
                        if (index >= 0) {
                            listFiles[index] = listFileSelected[0]
                        }
                    } else {
                        for (var i = 0; i < listFileSelected.length; i++) {
                            listFiles.push(listFileSelected[i])
                        }
                    }
                    if (state.listFiles.length === 0) {
                        let chatData = state.chatData
                        setState({ ...state, listFiles, fileEdit: null, message: chatData.message, visible: true })
                    } else {
                        setState({ ...state, listFiles, fileEdit: null, visible: false })
                    }
                }
            }
        }
    }
    const closeFileDialog = () => {
        setState({ ...state, listFiles: [], fileEdit: null, message: null, visible: false })
    }

    const onPressEnter = (editor) => {
        let chatData = state.chatData
        if (editor) {
            const raw = convertToRaw(editor.getCurrentContent());
            chatData = hepler.mapperDataSendMessageTextAndMentions(raw)
        }
        if (chatData.message && chatData.message.trim().length > 0) {
            onSendMessage(chatData)
            resetView()
        }
    }

    const onSelectionEmoji = (value) => {
        setImojiIcon(value)
    }
    const resetView = () => {
        setState({ ...state, chatData: { message: "", mentions: [] }, listFiles: [], fileEdit: null, message: null })
        setResetView(true)
    }
    useEffect(() => {
        console.log({ visible: state.visible })
    }, [state.visible])
    return (
        <div className="chat-foot chat-input" name-chat="ConversationBodyChatInput">

            {state.visible && <DialogDropFile
                visible={state.visible}
                STATE={{ state, setState }}
                onSave={sendMessageFile}
                openFile={openFile}
                close={closeFileDialog} />}
            <input
                ref={refFiles}
                class="input d-none"
                type="file"
                accept={chatContant.FILE_LIMIT_SELECTED.toString()}
                // multiple={!state.fileEdit}
                onChange={onSelectedFiles} onClick={e => (e.target.value = null)} />
            {/* input để nhập file hoặc text hoặc emoji vào */}
            <TextInputMessage
                mentions={hepler.mapperListUserToMentions(state.listMember)}
                draftDataEditor={draftDataEditor}
                roomData={roomData}
                resetView={{ isResetView, setResetView }}
                onPressEnter={onPressEnter}
                onFocusMessage={onFocusMessage}
                onChangeKey={onChangeKey}
                addTextImoji={imojiIcon}
                placeholder={t("enter_message")}
                onBlurMessage={onBlurMessage}
                onChangeEditor={onChangeMessage}
            />
            <div className="chat-input__actions" style={{ alignItems: '' }}>
                {/* input emoji  */}
                <EmojiInput onSelection={onSelectionEmoji} />
                {/* <i class="icon far fa-smile chatEmoji emoji" onClick={() => setExpanded(!expanded)}></i> */}
                <i className="icon attach fas fa-paperclip" onClick={openFile}></i>
            </div>
            <button class="chat-input__submit" onClick={() => onPressEnter()}>
                <i class="icon fab fa-telegram-plane"></i>
            </button>
        </div>
    )
}
export default ConversationBodyChatInput