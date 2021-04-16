import React, { useState } from "react";
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'

const DialogCallTo = (props) => {
    const { t } = useTranslation()
    const {visible, userInfo, onAcceptClick, onDeclineClick, onCloseClick } = props

    return (
        <Modal
            visible={visible}
        >
            <div className="modal-content square">
                <div className="">
                    <b className="mb-0 title">{t('incomming_call')}</b>
                    <i className="close las la-times" onClick={onCloseClick} />
                </div>
                <div className="modal-body video_call_request">
                    <figure className="avatar">
                        <img src={userInfo.avatar} />
                    </figure>
                    <p className="action"><b>{userInfo.full_name}</b>{t("isCalling_you")}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={onDeclineClick} className="btn btn-uni-cancel square">{t("Decline")}</button>
                    <button type="button" onClick={onAcceptClick} className="btn btn-uni-purple square">{t("Accept")}</button>
                </div>
            </div>
        </Modal>
    );
};

export default DialogCallTo;
