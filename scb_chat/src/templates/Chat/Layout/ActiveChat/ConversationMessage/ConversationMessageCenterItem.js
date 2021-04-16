
import { imageUrl } from 'functions/ChatHelper'
import React from 'react'
const ConversationMessageCenterItem = props => {
    const { data, onClickMention } = props
    const renderMessage = () => {
        if (data.mentions && data.mentions.length > 0) {
            var start = 0
            let listMessage = []
            for (var i = 0; i < data.mentions.length; i++) {
                let mention = data.mentions[i]
                listMessage.push(data.message.substring(start, mention.start))
                listMessage.push(
                    <a
                        className="mention"
                        key={`${start}:${mention.userId}:${mention.start}`}
                        onClick={() => onClickMention(mention)}>
                        {data.message.substring(mention.start, mention.end)}
                    </a>
                )
                start = mention.end
            }
            if (start < data.message.length) {
                listMessage.push(data.message.substring(start, data.message.length))
            }
            return listMessage
        } else {
            return data.message
        }
    }
    return (
        <div class="chat-messages__time">
            {data.isTopLine && <div className="line-top" />}
            <div className="container_memtion">
                {renderMessage()}
            </div>
            {data.url && <figure class="partner__group--avatar" style={{ width: '120px', marginTop: '5px' }}>
                <img src={imageUrl(data.url)} />
            </figure>}
        </div>
    )
}
export default ConversationMessageCenterItem

