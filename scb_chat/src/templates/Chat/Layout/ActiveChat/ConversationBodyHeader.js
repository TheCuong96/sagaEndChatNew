import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const ConversationBodyHeader = (props) => {
    const { onChangeData, isSearchRoom, isShowRoomInfo, roomInfoData, roomData } = props
    const { t } = useTranslation()

    const onSearchRoom = () => {
        onChangeData({ isSearchRoom: !isSearchRoom })
    }
    const onShowInfo = () => {
        onChangeData({ isShowRoomInfo: !isShowRoomInfo, mentionData: null })
    }
    const renderMember = () => {
        let totalMember = 0
        //nếu room chat là group thì hiện số thanh viên
        if (roomData.isGroup) {
            if (roomInfoData && roomInfoData.listMember) {
                totalMember = roomInfoData.listMember.length
            } else if (roomData && roomData.memberTotal) {
                totalMember = roomData.memberTotal
            }
            return `${totalMember} ${t('chat_member')}`
        }
    }
    return (
        <div className="conversation__detail--head">
            {roomData &&
                <div className="chat-user" >
                    <span className="chat-user__name">{roomData.roomName}</span>
                    <div className="chat-user__status">
                        {renderMember()}
                    </div>
                </div>
            }
            <div className="chat-actions">
                {/* anh Lộc nói bỏ actions này */}
                {/* icon search text trong 1 room chat */}
                {/* <i id="search_in_chat" className={`icon icon-search las la-search${isSearchRoom ? " active" : ""}`} onClick={onSearchRoom} ></i> */}
                {/* icon tab bên phải 1 room chat */}
                {/* <i id="chat_info_toggleIcon" className={`icon las la-columns${isShowRoomInfo ? " active" : ""}`} onClick={onShowInfo}></i> */}
            </div>
        </div >)
}
export default ConversationBodyHeader