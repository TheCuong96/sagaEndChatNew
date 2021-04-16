import React, { useState, useEffect } from "react";
import ConversationBodyInfoRoomHeader from './ConversationBodyInfoRoomHeader'
import ConversationBodyInfoRoomProfile from './ConversationBodyInfoRoomProfile'
import ConversationBodyInfoRoomListUser from './ConversationBodyInfoRoomListUser'
import ConversationBodyInfoRoomImages from './ConversationBodyInfoRoomImages'
import ConversationBodyInfoRoomFiles from './ConversationBodyInfoRoomFiles'
import ConversationBodyInfoRoomFooter from './ConversationBodyInfoRoomFooter'
// import ConversationBodyInfoRoomLinks from './ConversationBodyInfoRoomLinks'

const ConversationBodyInfoRoom = (props) => {
    const { STATE, onChangeData, roomInfoData, roomInfoDataMention, mentionData, roomInfoDataMedia, roomInfoDataFiles, roomInfoDataMentionMedia, roomInfoDataMentionFiles } = props
    const onCloseInfo = () => {
        onChangeData({ isShowRoomInfo: false })
    }
    const onCloseMentionInfo = () => {
        onChangeData({ mentionData: null })
    }

    return (
        <div className="conversation__detail--info active">
            <div className="chat-center">
                {!mentionData && <i class="las la-times" style={{ marginRight: '20px', marginTop: '20px', cursor: "pointer" }} onClick={onCloseInfo} ></i>}
                {mentionData && <i class="las la-arrow-left" style={{ marginLeft: '20px', marginTop: '20px', alignSelf: 'flex-start', cursor: "pointer" }} onClick={onCloseMentionInfo}></i>}
                <ConversationBodyInfoRoomHeader STATE={STATE} roomInfoData={mentionData ? roomInfoDataMention : roomInfoData} />
                {!mentionData && roomInfoData && roomInfoData.isGroup ?
                    <ConversationBodyInfoRoomListUser STATE={STATE} />
                    : <ConversationBodyInfoRoomProfile roomInfoData={mentionData ? roomInfoDataMention : roomInfoData} />}
                <ConversationBodyInfoRoomImages STATE={STATE} data={mentionData ? roomInfoDataMentionMedia : roomInfoDataMedia} />
                <ConversationBodyInfoRoomFiles STATE={STATE} data={mentionData ? roomInfoDataMentionFiles : roomInfoDataFiles} />
                {/* <ConversationBodyInfoRoomLinks STATE={STATE} /> */}
            </div>
            {roomInfoData && !mentionData &&
                <div className="chat-foot del">
                    <ConversationBodyInfoRoomFooter roomInfoData={roomInfoData} onChangeData={onChangeData} />
                </div>
            }
        </div>
    )
}
export default ConversationBodyInfoRoom;
