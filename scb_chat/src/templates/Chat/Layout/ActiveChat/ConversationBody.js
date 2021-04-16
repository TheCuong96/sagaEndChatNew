import React, { useState, useEffect } from 'react'
import ConversationBodyHeader from './ConversationBodyHeader'
import ConversationBodyEmptyMessage from './ConversationBodyEmptyMessage'
import ConversationBodyChatInput from './ConversationBodyChatInput'
import ConversationBodyInfoRoom from './ConversationBodyInfoRoom'
import ConversationBodyChat from './ConversationBodyChat'

const ConversationBody = props => {
    const { STATE, scrollIndex, isFetching, isFetchingChatLog, onChangeData, isShowRoomInfo, listMessage, isSearchRoom, roomData, roomInfoData,
        clearChatBody, searchSelected, roomDataChange, userId, roomInfoDataMention, mentionData, roomInfoDataMedia,
        roomInfoDataFiles, roomInfoDataMentionFiles, roomInfoDataMentionMedia } = props
    const scrollBottom = () => {
        onChangeData({ scrollBottom: true })
    }
    return (
        <div className="conversation__detail active">
            {/* header của khung chat */}
            <ConversationBodyHeader
                onChangeData={onChangeData}//gửi data về component cha
                isShowRoomInfo={isShowRoomInfo}
                isSearchRoom={isSearchRoom}
                roomData={roomData}
                roomInfoData={roomInfoData}
            />
            <div className="conversation__detail--wrap">
                <div className="conversation__detail--chat">
                    <div className="chat-center chat-messages">
                        {
                            listMessage?.data.length > 0 ?
                                //show data của chat
                                <ConversationBodyChat
                                    isFetchingChatLog={isFetchingChatLog}
                                    scrollIndex={scrollIndex}
                                    clearChatBody={clearChatBody}
                                    listMessage={listMessage}
                                    onChangeData={onChangeData}
                                    roomData={roomData}
                                    searchSelected={searchSelected}
                                />
                                //nếu data trả về không có text thì show lên
                                : !isFetching && <ConversationBodyEmptyMessage />
                        }
                    </div>
                    {/* list các input emoje add file ...  */}
                    <ConversationBodyChatInput
                        roomDataChange={roomDataChange}
                        roomData={roomData}
                        userId={userId}
                        roomInfoData={roomInfoData}
                        onChangeData={onChangeData}

                    />
                    {/* {(STATE.state.currentIndexMessage <= STATE.state.listMessage.data.length - 5) && <div className="btn-scroll" onClick={scrollBottom}>
                        {STATE.state.roomData.unreadTotal > 0 && <div className="unread-count">{STATE.state.roomData.unreadTotal}</div>}
                        <i className="icon las la-angle-down"></i>
                    </div>} */}
                </div>
                {/* hiện tab bên phải của 1 room chat */}
                {isShowRoomInfo && <ConversationBodyInfoRoom
                    STATE={STATE}
                    onChangeData={onChangeData}
                    roomInfoData={roomInfoData}
                    roomInfoDataMention={roomInfoDataMention}
                    mentionData={mentionData}
                    roomInfoDataFiles={roomInfoDataFiles}
                    roomInfoDataMedia={roomInfoDataMedia}
                    roomInfoDataMentionFiles={roomInfoDataMentionFiles}
                    roomInfoDataMentionMedia={roomInfoDataMentionMedia}
                />}
            </div>
        </div>
    )
}
export default ConversationBody