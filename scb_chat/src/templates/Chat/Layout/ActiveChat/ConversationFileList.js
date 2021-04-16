import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import * as helper from 'functions/ChatHelper'
import { chatProfileAction } from 'store/action'
import { chatContant } from 'contant'
import ConversationFileItem from './ConversationFileItem'


const ConversationFileList = props => {
    const { onChangeData } = props
    const chatProfileReducer = useSelector(state => state.chatProfileReducer)
    const dispatch = useDispatch()
    const { userAttachmentList, listUser, loadMoreImage } = chatProfileReducer
    const [state, setState] = useState({
        senderTab: 0,
        attachmentList: [],
        isFirstInit: false,
        page: 1,
        totalPage: 1,
        totalRecord: 0,
        isShowLoadMore: false,
        currentIndex: -1
    })

    useEffect(() => {
        if (loadMoreImage > 0) {
            getAttachMentList(state.senderTab, state.page + 1)
        }
    }, [loadMoreImage])

    useEffect(() => {
        if (userAttachmentList && listUser && state.isFirstInit) {

            let list = helper.fileListMapper(state.attachmentList, userAttachmentList.detail, listUser);
            let listResult = []
            let currentIndex = state.currentIndex
            if (loadMoreImage > 0) {
                for (var i = 0; i < list.length; i++) {
                    listResult = listResult.concat(list[i].list)
                }
                listResult = listResult.filter((item) => item.type != chatContant.ATTACHMENT_TYPE_FILE)
                onChangeData({ attachmentDataShow: { data: listResult, currentIndex, totalRecord: userAttachmentList.total_record, page: userAttachmentList.page } })
                currentIndex = listResult.length - 1
            }
            else {
                currentIndex = -1
            }

            setState(e => ({
                ...e,
                attachmentList: list,
                page: userAttachmentList.page,
                totalPage: userAttachmentList.total_page,
                totalRecord: userAttachmentList.total_record,
                isShowLoadMore: userAttachmentList.page < userAttachmentList.total_page,
                currentIndex
            }))
        }
    }, [userAttachmentList])

    useEffect(() => {
        setState({ ...state, isFirstInit: true })
        getAttachMentList(0, 1)
    }, [])

    const getAttachMentList = (senderTab, page) => {
        let sender = null
        if (senderTab === 1) {
            sender = chatContant.CHAT_USER_ATTACHMEN_RECIVED
        } else if (senderTab === 2) {
            sender = chatContant.CHAT_USER_ATTACHMEN_SEND
        }
        dispatch(chatProfileAction.getUserAttachmentListRequest({
            page: page, limit: chatContant.CHAT_USER_FILE_LIMIT, sender,
            attachment_type_list: `[${chatContant.ATTACHMENT_TYPE_IMAGE},
            ${chatContant.ATTACHMENT_TYPE_VIDEO},
            ${chatContant.ATTACHMENT_TYPE_AUDIO}]`
        }))
    }
    const openFileAll = () => {
        getAttachMentList(0, 1)
        setState({ ...state, senderTab: 0, totalPage: 1, page: 1, attachmentList: [], isShowLoadMore: false })
    }
    const openFileRecived = () => {
        getAttachMentList(1, 1)
        setState({ ...state, senderTab: 1, totalPage: 1, page: 1, attachmentList: [], isShowLoadMore: false })
    }
    const openFileSent = () => {
        getAttachMentList(2, 1)
        setState({ ...state, senderTab: 2, totalPage: 1, page: 1, attachmentList: [], isShowLoadMore: false })
    }

    const onHandleLoadMore = () => {
        getAttachMentList(state.senderTab, state.page + 1)
    }



    const openFile = ({ attachment, index }) => {
        if (attachment.type === chatContant.ATTACHMENT_TYPE_FILE) {
            window.open(attachment.url, "_blank")
        } else {
            let list = [].concat(state.attachmentList)

            let listResult = []
            for (var i = 0; i < list.length; i++) {
                listResult = listResult.concat(list[i].list)
            }
            listResult = listResult.filter((item) => item.type != chatContant.ATTACHMENT_TYPE_FILE)
            let indexFile = listResult.findIndex((item) => item === attachment)
            onChangeData({ attachmentDataShow: { data: listResult, currentIndex: indexFile, totalRecord: state.totalRecord, page: state.page }, isShowAttachmentDataShow: true })
            setState(e => ({ ...e, currentIndex: listResult.length - 1 }))
        }
    }
    const getTime = (date) => {
        if (date) {
            var time = date.format('MMMM / YYYY')
            time = time.charAt(0).toUpperCase() + time.slice(1)
            return time
        }
    }
    return (<div className="conversation__detail active">
        <div class="conversation__detail--head chat-image__head pt-3 pb-3">
            <div class="chat-image__label">
                <Trans>chat_file_list</Trans>
            </div>
            <div class="chat-image__tabs nav ">
                <a onClick={openFileAll} class={`nav-link chat-image__tab${state.senderTab === 0 ? ' active show' : ''}`}><Trans>chat_file_all</Trans></a>
                <a onClick={openFileRecived} class={`nav-link chat-image__tab${state.senderTab === 1 ? ' active show' : ''}`}><Trans>chat_file_recived</Trans></a>
                <a onClick={openFileSent} class={`nav-link chat-image__tab${state.senderTab === 2 ? ' active show' : ''}`}><Trans>chat_file_sent</Trans></a>
            </div>
        </div>
        <div className="conversation__detail--wrap chat-image">
            <div className="tab-content w-100">
                <div className="tab-pane fade active show">
                    {
                        state.attachmentList.length > 0 && state.attachmentList.map((item, index) =>
                            <div className="chat-image__wrap" key={index}>
                                <div class="chat-image__time">{getTime(item.date)}</div>
                                <div className="chat-image__list">
                                    {
                                        item.list.map((attachment, index) =>
                                            <ConversationFileItem key={index} data={attachment} openFile={() => openFile({ attachment, index })} />
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        state.isShowLoadMore && <div className="text-center pt-2">
                            <a style={{ fontSize: 18 }} onClick={onHandleLoadMore}> <Trans>read_more</Trans></a>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>)
}
export default ConversationFileList