

import { isURL } from 'functions/ChatHelper'
import React, { useEffect } from 'react'
import ConversationMessageTimeRender from './ConversationMessageTimeRender'

const ConversationMesageBodyString = props => {
    const { data, isGroup, onClickMention } = props
    const renderMessageLink = (message) => {
        if (message.length == 0) return "";
        // message = message.trim()
        let messageSplitEnter = message.split('\n')
        let messageText = []
        let isUrlAfter = false
        for (var i = 0; i < messageSplitEnter.length; i++) {
            let messageSpit = messageSplitEnter[i].split(' ')
            for (var j = 0; j < messageSpit.length; j++) {
                if (isURL(messageSpit[j])) {
                    messageText.push(<a key={messageSpit[j] + j + "-" + i} href={messageSpit[j]} target="_blank">{messageSpit[j]}</a>)
                    isUrlAfter = true
                } else {
                    let text = messageSpit[j].length > 0 ? messageSpit[j] : " "
                    if (!isUrlAfter && messageText.length > 0) {
                        messageText[messageText.length - 1] = messageText[messageText.length - 1] + text
                    } else {
                        messageText.push(text)
                    }
                    isUrlAfter = false
                }
                if (j < messageSpit.length - 1 && messageSpit[j].length > 0) {
                    if (isUrlAfter) {
                        messageText.push(" ")
                    } else if (messageText.length > 0) {
                        messageText[messageText.length - 1] = messageText[messageText.length - 1] + " "
                    }
                }
            }
            if (i < messageSplitEnter.length - 1) {
                if (isUrlAfter) {
                    messageText.push("\n")
                } else if (messageText.length > 0) {
                    messageText[messageText.length - 1] = messageText[messageText.length - 1] + "\n"
                }
            }
        }
        return messageText
    }
    const renderMessage = () => {
        if (data.mentions && data.mentions.length > 0) {
            var start = 0
            let listMessage = []
            for (var i = 0; i < data.mentions.length; i++) {
                let mention = data.mentions[i]
                listMessage.push(renderMessageLink(data.message.substring(start, mention.start)))
                listMessage.push(<a className="mention" key={`${start}:${mention.userId}:${mention.end}`} onClick={() => onClickMention(mention)}>{data.message.substring(mention.start, mention.end)}</a>)
                start = mention.end
            }
            if (start < data.message.length) {
                listMessage.push(renderMessageLink(data.message.substring(start, data.message.length)))
            }
            return listMessage
        } else {
            return renderMessageLink(data.message)
        }
    }
    return (
        <div class="client__mess--item">
            <span class="client__text">
                {!data.isHideAvatar && isGroup && !data.isMessageOut && <i class="client__name_on-group">{data.sender.fullName}:</i>}
                {renderMessage()}
            </span>
            <ConversationMessageTimeRender data={data} />
        </div>
    )
}
export default ConversationMesageBodyString

