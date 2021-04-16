import React, { useState, useEffect, useRef } from "react";
import { Modal } from 'antd';
import Avatar from 'react-avatar-edit'
import { Trans, useTranslation } from "react-i18next";

const DialogEditorAvatar = (props) => {
    const { fileAvatar, onSave, visible, close } = props
    const { t } = useTranslation()
    const [image, setImage] = useState()

    const saveImage = () => {
        if (image) {
            var block = image.split(";");
            var contentType = block[0].split(":")[1];// In this case "image/gif"
            var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
            var blob = b64toBlob(realData, contentType);
            onSave(blob)
        }
    }

    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    return (
        <Modal visible={visible}
            mask={true} width={420}
            footer={null}
            maskClosable={false}
            className="modal-dialog"
            header={null} >
            <div class="modal-content" name-c="DialogEditorAvatar">
                <div class="modal-header">
                    <span class="modal-title" id="addGroupModalLabel"><Trans>chat_select_avatar_title</Trans></span>
                    <button type="button" class="close" onClick={close}>
                        <span aria-hidden="true">
                            <i class="las la-times"></i>
                        </span>
                    </button>
                </div>
                <div class="modal-body conversation__files">
                    <div class="conversation__files--wrap">
                        {fileAvatar && <Avatar
                            width={370}
                            imageWidth={370}
                            imageHeight={200}
                            height={295}
                            onCrop={setImage}
                            label={t('chat_select_avatar')}
                            labelStyle={{ color: 'white' }}
                            src={URL.createObjectURL(fileAvatar)}
                            onClose={close}
                        />}
                        <div class="heading__button mt-4 text-center">
                            <button class="btn btn_none_bg green_outline" onClick={saveImage} ><Trans>chat_save</Trans></button>
                            <button class="btn btn_none_bg red_outline" onClick={close}><Trans>cancel</Trans></button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>)
}
export default DialogEditorAvatar