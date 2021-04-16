
import React, { useState, useEffect, useRef } from 'react'
import { Trans } from 'react-i18next'
const ConversationBodyInfoRoomProfile = (props) => {
    const { roomInfoData } = props
    const [state, setState] = useState({
        isShowListUser: false
    })
    return (<div class={`partner__item partner__detail${state.isShowListUser ? ' show' : ''}`}>
        <label class="partner__label dropdown-toggle" onClick={() => setState({ ...state, isShowListUser: !state.isShowListUser })}>
            <Trans>personal_information</Trans>
        </label>
        <div className={`partner__list dropdown-menu${state.isShowListUser ? ' show' : ''}`}>
            <div class="partner__list-item">
                <Trans>chat_info_phone</Trans>
                <span class="value"> {roomInfoData && roomInfoData.phone}</span>
            </div>
            <div class="partner__list-item">
                <Trans>chat_info_email</Trans>
                <span class="value"> {roomInfoData && roomInfoData.email}</span>
            </div>
        </div>
    </div>)
}
export default ConversationBodyInfoRoomProfile