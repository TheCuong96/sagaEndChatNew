import React, { useState, useEffect } from 'react';
import * as helper from '../../../../functions/ChatHelper';
import ListView from 'components/common/Chat/ListView';
import { List } from 'antd';
import AvatarRender from './ConversationMessage/AvatarRender';

const ConversationUserItem = (props) => {
    const { isSelected, handleSelect, data } = props
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
                    </i>
                </span>
            </div>
        </div>
    )
}

const ConversationListUser = (props) => {

    const { listUser, roomData, onChangeListUser } = props
    const [mIndex, setIndex]  = useState(0)

    const rowRenderer = (index, key, style, measure) => {
        const item = listUser[index];
        return (
            <List.Item key={key} style={{ ...style, padding: 0 }} className={`row-${index}`}>
                {item && <ConversationUserItem data={item} key={index} handleSelect={() => onCreateRoom(item)} isSelected={roomData && (roomData.singleChatId == item.userId)} />}
            </List.Item>
        )
    }

    const loadMessage = (startIndex, stopIndex) => {
    }

    const onCreateRoom = (data) => {
        if (!data.roomId) {
            onChangeListUser({ createUserRoom: data, selectTab: 3 })
        } else if (roomData?.roomId != data.roomId) {
            onChangeListUser({ roomDataChange: data, selectTab: 3 })
        }
    }
    return (
        <ul className="conversation__user active">
            {
                (listUser && listUser.length > 0) &&
                <ListView
                    items={listUser}
                    rowRenderView={rowRenderer}
                    loadMore={loadMessage}
                    scrollIndex={{ indexScrollMessage: mIndex, updateScrollMessage: setIndex }}
                    setCurrentIndex={(value) => onChangeListUser({ currentIndexMessage: value })}
                    isMutilLoad={false} />
            }
        </ul>
    )
}

export default ConversationListUser;