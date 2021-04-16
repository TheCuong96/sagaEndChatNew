import React, { useState, useEffect } from 'react'
import { Trans } from 'react-i18next'

const ConversationBodyEmptyMessage = props => {
    return (
        <div className="noneData h-100 w-100">
            <div className="d-flex align-items-center justify-content-center h-100">
                <div className="chat-messages__time chat-messages__noneContent mt-5">
                    <Trans>chat_not_have_message</Trans>
                </div>
            </div>
        </div>
    )
}
export default ConversationBodyEmptyMessage