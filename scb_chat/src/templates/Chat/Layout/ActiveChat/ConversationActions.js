import React, { useState, useEffect } from 'react'
import {chatContant} from 'contant'
import { useTranslation } from 'react-i18next'
const ConversationActions = props => {
    const { data } = props
    const { t } = useTranslation();
    const [action, setAction] = useState(null)
    useEffect(() => {
        if (data) {
            let user = data.user.userName
            let message = null
            let value = null
            let image = null
            switch (data.message_type) {
                case chatContant.CREATE_NEW_ROOM:
                    message = t("text_action_chat_create_group")
                    value = data.message
                    break;
                case chatContant.LEAVE_ROOM:
                    message = t("text_action_chat_has_left")
                    value = null
                    break;
                case chatContant.RENAME_ROOM:
                    message = t("text_action_chat_change_name")
                    value = data.message
                    break;
                case chatContant.CHANGE_AVATAR:
                    message = t("text_action_chat_change_avatar")
                    image = data.message
                    break;
                case chatContant.VIDEO_CALL:
                    message = t("text_video_call")
                    value = null
                    break;
                case chatContant.ADD_MEMBER:
                    message = t("text_action_chat_add_member")
                    value = getListUser(data.listUser)
                    break;
                case chatContant.REMOVE_MEMBER:
                    message = t("text_action_chat_remove_member")
                    value = getListUser(data.listUser)
                    break;
            }
            setAction(createModelAction(user, message, value))
        }
    }, [data])
    const createModelAction = (user, message, listUser) => {
        return { user, message, listUser }
    }
    const getListUser = (listUser) => {
        let name = ''
        if (listUser) {
            for (var i = 0; i < listUser.length; i++) {
                name += listUser[i].full_name + ", "
            }
            if (name.length > 0) {
                name = name.substr(0, name.length - 2)
            }
        }
        return name
    }
    return (
        <div className="conversation-add-user text-center">
            <b>{action && action.user} </b>{action && action.message}<b> {action && action.listUser}</b>
        </div>
    )
}
export default ConversationActions;