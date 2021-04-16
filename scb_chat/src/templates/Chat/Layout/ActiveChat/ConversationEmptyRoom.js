import React, { useState, useEffect } from 'react'
import { Trans } from 'react-i18next'

const ConversationEmptyRoom = props => {
    return (
        <div className="conversation__start active">
            <i className="icon las la-comments"></i>
            <span className="text"><Trans>select_a_chat_to_start_messaging</Trans></span>
        </div>
    )
}
export default ConversationEmptyRoom