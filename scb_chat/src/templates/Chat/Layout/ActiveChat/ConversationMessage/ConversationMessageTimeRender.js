import React, { useEffect } from 'react'

import { convertTimeMessage } from '../../../../../functions/ChatHelper'
import { chatContant } from '../../../../../contant'
import { Trans } from 'react-i18next'
const ConversationMessageTimeRender = props => {
    const { data } = props
    return (<div class="client__time">
        {data.isMessageOut && data.status == chatContant.STATUS_ERROR && <i class="icon las la-clock"></i>}
        {convertTimeMessage(data.timeStamp)}
        {
            data.isMessageOut && (data.status === chatContant.STATUS_READ ? <i class="icon_read las la-check-double"></i>
                : data.status === chatContant.STATUS_SENDING ? <i class="icon_unread fab fa-telegram-plane"></i>
                    : data.status === chatContant.STATUS_SENT ? <i class="icon_read las la-check"></i>
                        : <i class="icon_readfail fas fa-exclamation-triangle"></i>)
        }
        {data.isMessageOut && data.status == chatContant.STATUS_ERROR && <div className="error"><Trans>error_message</Trans></div>}
    </div>)
}
export default ConversationMessageTimeRender