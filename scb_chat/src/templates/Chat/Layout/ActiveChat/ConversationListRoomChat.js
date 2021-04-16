import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { convertTimeRelation, imageUrl } from '../../../../functions/ChatHelper'
import ListViewLeft from 'components/common/Chat/ListViewLeft';
import { List } from 'antd';
import AvatarRender from './ConversationMessage/AvatarRender';
import { TitleSearchItem } from './ConversationListSearchMessage';
import { chatContant } from 'contant';
export const ItemSearchRoomMessage = (props) => {
    const { t } = useTranslation
    const { data, onSelected, isSelected, measure } = props
    return (
        <div className={`conversation__user--item ${isSelected ? 'active' : ""}`} onClick={onSelected}>
            <figure className="conversation__user--avatar">
                <span className="wrap d-flex align-items-center justify-content-center">
                    <AvatarRender url={data.roomData.avatar} fullName={data.roomData.roomName} />
                </span>
            </figure>
            <div className="conversation__user--content">
                <span className="temp top">
                    <i className="name">
                        {data.roomData.roomName}
                        {!data.isMessageOut && data.status === chatContant.STATUS_READ && <i className="icon_read las la-check-double"></i>}
                    </i>
                    <i className="time">{(data.timeStamp != null && data.timeStamp > 0) && convertTimeRelation(data.timeStamp, t)}</i>
                </span>
                <span className="temp bottom">
                    {data.sender.fullName}
                </span>
                <span className="temp bottom">
                    {<i className="detail">{data.message}</i>}
                </span>
            </div>
        </div>
    )
}
const ConversationListRoomChatItem = (props) => {
    let { t } = useTranslation()
    const { isSelected, handleSelect, data, userId } = props
    const getDetailMessage = () => {
        // if (data.draft && data.draft.state === 1) {
        //     return (<i class="detail"><i class="draft_txt">{t('chat_draft')}:</i>{data.draft.body}</i>)
        // }
        if (data.isGroup) {
            let sender = null
            if (data.sender) {
                sender = data.sender.fullName
                if (data.sender.userId == userId) {
                    sender = t('you')
                }
            }
            if (data.typing) {
                if (data.typing) {
                    sender = data.typing.fullName
                    if (data.typing.userId == userId) {
                        sender = t('you')
                    }
                }
                return (<i class="typing">
                    <i class="typing__dot dot-elastic"></i>
                    {`${sender ? sender : ''} ${t('chat_typing')}`}
                </i>)
            }
            else if (data.sendFile) {
                if (data.sendFile) {
                    sender = data.sendFile.fullName
                    if (data.sendFile.userId == userId) {
                        sender = t('you')
                    }
                }
                return (<i class="typing">
                    <i class="typing__dot dot-elastic"></i>
                    {`${sender ? sender : ''} ${t('chat_sending_file')}`}
                </i>)
            }
            else if (data.draft && data.draft.state === 1) {
                return (<i class="detail"><i class="draft_txt">{t('chat_draft')}: </i>{data.draft.body}</i>)
            }
            else if (data.message && data.message.length > 0) {
                return (<i className="detail"> {`${sender ? sender : ''}: ${data.message}`}</i>)
            }
        } else {
            if (data.typing) {
                return (<i class="typing">
                    <i class="typing__dot dot-elastic"></i>
                    {`${t('chat_typing')}`}
                </i>)
            }
            else if (data.sendFile) {
                return (<i class="typing">
                    <i class="typing__dot dot-elastic"></i>
                    {t('chat_sending_file')}
                </i>)
            }
            else if (data.draft && data.draft.state === 1) {
                return (<i class="detail"><i class="draft_txt">{t('chat_draft')}: </i>{data.draft.body}</i>)
            }
            else if (data.message && data.message.length > 0) {
                return (<i className="detail">{data.message}</i>)
            }
        }
    }
    return (
        <div className={`conversation__user--item ${isSelected ? 'active' : ""}`} onClick={handleSelect}>
            <figure className="conversation__user--avatar">
                <span className="wrap d-flex align-items-center justify-content-center">
                    <AvatarRender url={data.avatar} fullName={data.roomName} />
                </span>
            </figure>
            <div className="conversation__user--content">
                <span className="temp top">
                    <i className="name">
                        {data.roomName}
                        {data.isRead && <i className="icon_read las la-check-double"></i>}
                    </i>
                    <i className="time">{(data.time != null && data.time > 0) && convertTimeRelation(data.time, t)}</i>
                </span>
                <span className="temp bottom">
                    {getDetailMessage()}
                    {!data.typing && data.unreadTotal > 0 && <i className="number">{data.unreadTotal}</i>}
                </span>
            </div>
        </div>
    )
}

// roomId, isGroup, roomName, unreadTotal, message, time, sender, isOnline
const ConversationListRoomChat = (props) => {
    const { roomData, onChangeListRoomChat, searchSelectedWithRoom, userId, searchKey, isSearchRoom, showListRoom, listRoomSearchAll, listRoom } = props
    const [mIndex, setIndex] = useState(0)

    const onSelectedRoom = (item) => {
        if (!roomData || item.roomId != roomData.roomId) {
            onChangeListRoomChat({ roomDataChange: item, selectTab: 1, searchSelectedWithRoom: null })
        }
    }

    const onSelectedSearchMessage = (item) => {
        onChangeListRoomChat({ searchSelectedWithRoom: item, selectTab: 1 })
    }

    const rowRenderer = React.useMemo(() => (index, key, style, measure) => {

        let item = null
        if (showListRoom && searchKey && !isSearchRoom) {
            item = listRoomSearchAll.data[index];
        } else {
            item = listRoom[index];
        }
        if (item) {
            return (
                <List.Item key={key} style={{ ...style, padding: 0 }} className={`row-${index}`}>
                    {item.typeHeader === 1 &&
                        <TitleSearchItem title={"chats_title"}
                        />}
                    { item.typeHeader === 2 &&
                        <TitleSearchItem title={"messages_title"}
                        />}
                    { item.typeSearchMessage &&
                        <ItemSearchRoomMessage
                            isSelected={searchSelectedWithRoom === item}
                            data={item}
                            onSelected={() => onSelectedSearchMessage(item)}
                            measure={measure}
                        />}
                    { !item.typeHeader && !item.typeSearchMessage &&
                        < ConversationListRoomChatItem
                            key={index}
                            userId={userId}
                            handleSelect={() => onSelectedRoom(item)}
                            data={item}
                            isSelected={roomData && roomData.roomId === item.roomId}
                        />}
                </List.Item>
            )
        }
        else {
            return null
        }

    }, [listRoom, listRoomSearchAll.data])

    const loadMessage = (startIndex, stopIndex) => {
        if (showListRoom && searchKey && !isSearchRoom) {
            onChangeListRoomChat({ loadMoreSearchAllRoom: { startIndex, stopIndex } })
        } else {
            onChangeListRoomChat({ loadMoreChatList: { startIndex, stopIndex } })
        }
    }

    return (<ul className="conversation__user active">
        {
            (showListRoom && searchKey && !isSearchRoom) ?
                <ListViewLeft
                    items={listRoomSearchAll.data}
                    rowRenderView={rowRenderer}
                    loadMore={loadMessage}
                    scrollIndex={{ indexScrollMessage: mIndex, updateScrollMessage: setIndex }}
                    setCurrentIndex={(value) => onChangeListRoomChat({ currentIndexMessage: value })}
                    isMutilLoad={false}
                /> :
                (listRoom && listRoom.length > 0) &&
                <ListViewLeft
                    items={listRoom}
                    rowRenderView={rowRenderer}
                    loadMore={loadMessage}
                    scrollIndex={{ indexScrollMessage: mIndex, updateScrollMessage: setIndex }}
                    setCurrentIndex={(value) => onChangeListRoomChat({ currentIndexMessage: value })}
                    isMutilLoad={false}
                />
        }
    </ul>
    )
}
export default ConversationListRoomChat