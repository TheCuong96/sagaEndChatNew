import React from 'react';
import { Modal } from 'antd';
import { Trans } from 'react-i18next';
const DialogConfirm = props => {
    const { visible, close, onSave, title, titleHeader,ok,icon } = props;
    return (
        <Modal
            visible={visible}
            mask={true} width={420}
            footer={null}
            onCancel={close}
            className="modal-dialog"
            header={null} >
            <div className="modal-content"  name-c="DialogConfirm">
                <div className="modal-header">
                    <span className="modal-title" id="addGroupModalLabel"><Trans>{titleHeader}</Trans></span>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
                        <span>
                            <i className="las la-times"></i>
                        </span>
                    </button>
                </div>
                <div className="modal-body conversation__deletePerson">
                    <div className="conversation__deletePerson--wrap">
                        <figure className="conversation__deletePerson--icon">
                            <img src={icon?icon:'/images/icon_delete.png'} alt="delete" />
                        </figure>
                        <div className="conversation__deletePerson--label">
                            {title}
                        </div>
                        <div className="heading__button mt-4 text-center">
                            <button className="btn btn_none_bg red_outline" onClick={onSave} ><Trans>{ok ? ok : 'chat_delete'}</Trans></button>
                            <button className="btn btn_none_bg white_outline" onClick={close}><Trans>chat_cancel</Trans></button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default DialogConfirm