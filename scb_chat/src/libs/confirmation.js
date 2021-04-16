import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import ButtonBase from 'components/base/Button/ButtonBase';

/**
 * showConfirm Dialog
        showConfirm({
            onOk: () => deleteMember(),
            title: 'title',
            okText: 'okText',
            cancelText: 'CancelText',
            message: 'Message',
        })
 */
export const showConfirm = ({ onOk, img, message, okText, cancelText }) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='rc_confirmdialog'>
                    <div className="rc_confirmdialog_body">
                        <div class="modal-img">
                            <img src={img} alt="" />
                        </div>
                        <div className="rc_confirmdialog_content">
                            {message && message}
                        </div>
                    </div>
                    <div className="rc_confirmdialog_footer">
                        <div className="rc_confirmdialog_buttonwrap">
                            <ButtonBase type="button" modifiers={["blue"]} onClick={() => {
                                onClose();
                                onOk && onOk();
                            }}>
                                {okText || 'OK'}
                            </ButtonBase>
                            <ButtonBase type="button" modifiers={["white-outline"]} onClick={() => {
                                onClose();
                            }}>
                                {cancelText || 'Cancel'}
                            </ButtonBase>
                        </div>
                    </div>

                </div>
            );
        }
    });
}

/**
 * showAlert Dialog
        showAlert({
                        okText: 'Ok',
            message: 'Message',
        })
 */

export const showAlert = ({ message, okText }) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='rc_alertdialog'>
                    <div className="rc_alertdialog_content">
                        {message && message}
                    </div>
                    <div className="rc_alertdialog_footer">
                        <div className="rc_alertdialog_buttonwrap">
                            <ButtonBase type="button" modifiers={["red"]} onClick={onClose}>
                                {okText || 'OK'}
                            </ButtonBase>
                        </div>
                    </div>
                </div>
            );
        }
    });
}
