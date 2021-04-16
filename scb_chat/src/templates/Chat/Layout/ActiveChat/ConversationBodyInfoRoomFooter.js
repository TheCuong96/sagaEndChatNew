
import { chatContant } from 'contant'
import React, { useState, useEffect, useRef } from 'react'
import { Trans } from 'react-i18next'
const ConversationBodyInfoRoomFooter = (props) => {
    const { onChangeData, roomInfoData } = props;
    const outGroup = () => {
        onChangeData({ actionOutGroup: roomInfoData })
    }
    const removeGroup = () => {
        onChangeData({ actionRemoveGroup: roomInfoData })
    }
    return (<div class="chat-foot del">
        {(roomInfoData.roomType == chatContant.ROOM_TYPE_USER) ?
            (roomInfoData.roomId ?
                <a onClick={removeGroup} class="chat-del">
                    <i class="icon fas fa-trash-alt"></i>
                    <Trans>chat_info_delete_group</Trans>
                </a> : "") :
            <a onClick={outGroup} class="chat-del">
                <i class="icon fas fa-sign-out-alt"></i>
                <Trans>chat_out_group</Trans>
            </a>
        }
    </div>)
}
export default ConversationBodyInfoRoomFooter
