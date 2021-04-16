import React, { useState } from 'react';
import ModalCustom from './ModalCustom'
import { useTranslation } from 'react-i18next';

const ModelDelete = (props) => {
    const { visible, icon_delete, setVisible, title, onConfirmDelete } = props
    const { t } = useTranslation()

    return(<ModalCustom visible={visible} setVisible={setVisible} classModal="dialog_delete" title={title} children={
        <div className="content"  name-c="ModelDelete">
            <div className="icon text-center">
                <img src={icon_delete} />
            </div>
            <div className="title text-center" style={{ fontSize: "18px" }}>{t('do_you_want_to_delete_this')}</div>
            <div className="btn_group text-center">
                <button className="btn_delete mr-2" onClick={onConfirmDelete}>{t('chat_delete').toUpperCase()}</button>
                <button className="btn_cancle ml-2" onClick={() => setVisible(false)}>{t('cancle').toUpperCase()}</button>
            </div>
        </div>
    } />)
}
export default ModelDelete
 