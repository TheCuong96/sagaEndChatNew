import React from 'react'
import { Modal as ModalAnt  } from 'antd'

const DialogWarning = props =>{
    const { visible, onClose, classModal, widthModal, title} = props
    return(
        <ModalAnt
            visible = { visible }
            onCancel={ onClose }
            className={classModal ? classModal : ''}
            width={widthModal ? widthModal : '390px'}
        >
            <div className="swal-overlay swal-overlay--show-modal" name-c="DialogWarning">
                <div className="swal-modal">
                    <div className="swal-icon swal-icon--error">
                        <div className="swal-icon--error__x-mark">
                        <span className="swal-icon--error__line swal-icon--error__line--left"></span>
                        <span className="swal-icon--error__line swal-icon--error__line--right"></span>
                    </div>
                </div>
                <div className="swal-title">
                    {title}
                </div>
                {props.label && <div className="swal-text">{props.label}</div>}
                <div className="swal-footer">
                    <div className="swal-button-container">
                        <button class="swal-button swal-button--confirm" onClick={onClose}>OK</button>
                    </div>
                </div>
                </div>
            </div>
        </ModalAnt>
    )
}
export default DialogWarning;