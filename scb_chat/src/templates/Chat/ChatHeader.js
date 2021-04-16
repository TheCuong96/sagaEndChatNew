import React, { useState, useEffect } from "react";
import DialogAddNewGroup from "./Dialog/DialogAddNewGroup";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import * as helper from '../../functions/ChatHelper'
import UserActionMenu from "components/common/Menu/UserActionMenu";
const ChatHeader = (props) => {
    const { t } = useTranslation()
    const chatProfileReducer = useSelector(state => state.chatProfileReducer)
    const { listUser } = chatProfileReducer

    const handleAdd = () => {
        setState({ ...state, isShowModal: true })
    }
    const onClose = () => {
        setState({ ...state, isShowModal: false })
    }
    const [state, setState] = useState({
        isShowModal: false,
        listUser: null
    })
    useEffect(() => {
        if (listUser) {
            let list = helper.mapperUserListData(listUser)
            setState({ ...state, listUser: list })
        }
    }, [listUser])

    return (
        <div className="heading">
            <div className="heading__title">
                <div className="user">
                    {/* <span className="fw-medium text_big">{t("message")} </span> */}
                    <UserActionMenu />
                </div>
            </div>
            <div className="heading__border">
                
            </div>
            {
                state.isShowModal && <DialogAddNewGroup STATE={{ state, setState }} visible={state.isShowModal} listUser={state.listUser} onClose={onClose} />
            }
        </div>
    )
};
export default ChatHeader;
