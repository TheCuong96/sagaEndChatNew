import React, { useState, useEffect, useRef } from 'react'
import { Trans } from 'react-i18next'
import AvatarRender from './ConversationMessage/AvatarRender'
const ConversationMember = (props) => {
    const { data, isAdmin, deleteMember, onClickMention } = props
    return (
        <div class="user-group">
            <figure class="user-group__avatar">
                <span class="user-group__img">
                    <AvatarRender url={data.avatar} fullName={data.fullName} />
                </span>
            </figure>
            <span class="user-group__name" onClick={() => onClickMention(data)}>
                {data.fullName}
            </span>
            {
                data.isAdmin && <span class="user-group__position ml-auto">
                    <Trans>Admin</Trans>
                </span>
            }
            {
                !data.isAdmin && isAdmin && <span class="user-group__delete las la-times ml-auto" onClick={deleteMember}> </span>
            }
        </div>
    )
}
const ConversationBodyInfoRoomListUser = (props) => {
    const { STATE } = props
    const [state, setState] = useState({
        isShowListUser: false
    })
    const onAddMember = () => {
        STATE.setState({ isShowAddMember: !STATE.state.isShowAddMember })
    }
    const onDeleteMember = (data) => {
        STATE.setState({ deleteMember: data })
    }
    const onClickMention = (value) => {
        if (value) {
            STATE.setState({ mentionData: { userId: value.userId } })
        }
    }

    return (
        <div class={`partner__item partner__detail${state.isShowListUser ? ' show' : ''}`}>
            <label class="partner__label dropdown-toggle mb-0" onClick={() => setState({ ...state, isShowListUser: !state.isShowListUser })} aria-expanded={state.isShowListUser} >
                <Trans>chat_member</Trans> ({STATE.state.roomInfoData && STATE.state.roomInfoData.listMember && STATE.state.roomInfoData.listMember.length})
            </label>
            {
                STATE.state.roomInfoData && STATE.state.roomInfoData.isAdmin &&
                <a class="add" onClick={onAddMember}>+ <Trans>add_members</Trans></a>
            }
            {
                <div className={`partner__list dropdown-menu${state.isShowListUser ? ' show' : ''}`}>
                    {STATE.state.roomInfoData && STATE.state.roomInfoData.listMember &&
                        STATE.state.roomInfoData.listMember.map((item, index) =>
                            <ConversationMember data={item} key={index}
                                isAdmin={STATE.state.roomInfoData.isAdmin}
                                onClickMention={onClickMention}
                                deleteMember={() => onDeleteMember(item)}
                            />)}
                </div>
            }
        </div >
    )
}
export default ConversationBodyInfoRoomListUser