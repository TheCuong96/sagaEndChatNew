import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import { showNotification, translate as translateCommon } from 'functions/Utils';
import { MAX_FILE_SIZE } from 'contant';
import { isValidImageType } from 'functions/ChatHelper';


const ImageCrop = (props) => {
    const { t: translate } = useTranslation('userProfile');
    const { btnUpload, setFirstImage, setFileUpload, fileUpload } = props;
    const onChange = async ({ fileList: newFileList }) => {
        let src;
        const lastItem = newFileList.length - 1;
        const file = newFileList[lastItem];
        src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
        });
        setFirstImage(<img class="first_img" src={src} style={{ width: '100%', height: '100%' }} />)
        setFileUpload(file);
    };

    const beforeCrop = (file) => {
        console.log('file', file);
        if (file.size / MAX_FILE_SIZE > 1) {
            showNotification({
                type: 'error',
                message: translateCommon('total_file_size_must_smaller_than_10MB'),
                title: translateCommon('error')
            })
            setFileUpload([]);
            return false;
        } else if (!isValidImageType(file.type)) {
            showNotification({
                type: 'error',
                message: translateCommon('file_not_valid'),
                title: translateCommon('error')
            })
            setFileUpload([]);
            return false;
        }
        return true;
    }

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    return (
        <ImgCrop
            modalTitle={translate('drop_image')}
            beforeCrop={beforeCrop}
            modalCancel={translate('cancel')}
            modalOk={translate('update')}
        >
            <Upload
                onChange={onChange}
                onPreview={onPreview}
                showUploadList={false}
                customRequest={() => { }}
            >
                {btnUpload}
            </Upload>
        </ImgCrop>
    );
};

export default ImageCrop;