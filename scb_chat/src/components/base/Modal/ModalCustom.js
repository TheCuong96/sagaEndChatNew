import React, { useState } from 'react';
import { Modal } from 'antd';
import { translate } from 'functions/Utils';


const ModalCustom = (props) => {
    const { visible, widthModal, setVisible, title, classBody, classModal, } = props
    const [isClearData, setClearData] = useState(false)

    const afterClearData = () => {
        setClearData(false)
    }
    return (
        <Modal
            forceRender
            visible={visible}
            onCancel={() => setVisible(false)}
            className={classModal ? classModal : 'rc_modal'}
            width={widthModal ? widthModal : '390px'}
            closeIcon={<span className="rc_modal_closeicon"><i class="fas fa-times"></i></span>}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{title ? translate(title) : translate("update avatar")}</h5>
                </div>
                <div className={`modal-body ${classBody ? classBody : ''}`}>
                    {props.children}
                </div>
            </div>
        </Modal>
    )
}

export default ModalCustom
