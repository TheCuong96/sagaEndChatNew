import React from 'react'
import { chatContant } from '../../../../../contant'
import ConversationMesageBodyString from './ConversationMesageBodyString'
import ConversationMesageAttactmentImage from './ConversationMesageAttactmentImage'
import ConversationMesageAttactmentFile from './ConversationMesageAttactmentFile'
import ConversationMesageAttactmentVideo from './ConversationMesageAttactmentVideo'
import ConversationMesageAttachmentAudio from './ConversationMesageAttachmentAudio'
import AvatarRender from './AvatarRender'

const ConversationMessageItem = props => {
    const { data, isGroup, measure, onClickMention, openFile, style } = props;

    const renderMessage = (type) => {
        //chọn lại mess theo type
        switch (type) {
            case chatContant.VIEW_IMAGE:
                //xuất ra file hình
                return <ConversationMesageAttactmentImage measure={measure} isGroup={isGroup} data={data} openFile={openFile} />
            case chatContant.VIEW_FILE:
                //xuất ra file tài liệu
                return <ConversationMesageAttactmentFile data={data} isGroup={isGroup} />
            case chatContant.VIEW_VIDEO:
                //xuất ra file video
                return <ConversationMesageAttactmentVideo measure={measure} isGroup={isGroup} data={data} openFile={openFile} />
            case chatContant.VIEW_AUDIO:
                //xuất ra file âm thanh
                return <ConversationMesageAttachmentAudio measure={measure} isGroup={isGroup} data={data} />
            default:
                //xuất ra text
                return <ConversationMesageBodyString data={data} isGroup={isGroup} onClickMention={onClickMention} />;
        }
    }

    return (
        <div className={`client ${data.isMessageOut ? 'client__right' : 'client__left'}`} style={{ marginTop: 0 }}>
            <figure class={`client__avatar${!data.isHideAvatar ? ' avatar' : ''}`}>
                {!data.isHideAvatar && data.sender &&
                    <AvatarRender url={data.sender.avatar} fullName={data.sender.fullName} />}
            </figure>
            <div className="client__messages" >
                {renderMessage(data.type)}
            </div>
        </div>
    )
}
export default ConversationMessageItem