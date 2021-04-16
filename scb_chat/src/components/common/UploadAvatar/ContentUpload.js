import React from 'react';
import ImgCrop from './ImgCrop';
import { useState } from 'react';
import { staffAction } from 'store/action';
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

const ContentUpload = (props) => {
    const { t: translate } = useTranslation('staffProfile');
    const { showModalReview, oldUrl, hideReviewModal } = props;
    const imageFirstDefault = <img class="first_img" src={oldUrl} style={{ height: '100%', width: '100%' }} />
    const [firstImage, setFirstImage] = useState(imageFirstDefault);
    const [fileUpload, setFileUpload] = useState([]);
    const dispatch = useDispatch();
    const loadDefaultImage = () => {
        setFirstImage(imageFirstDefault);
        setFileUpload([])
    }
    const updateImage = () => {
        dispatch(staffAction.updateAvatar(fileUpload.originFileObj));
        console.log('fileUpload.originFileObj', fileUpload.originFileObj);
    }
    return (
        <div class="row">
            <div class="col-lg-5 col-md-5 col-sm-5">
                <div class="first" style={{
                    border: '1px solid #ccc',
                    height: '100%'
                }}>
                    {firstImage}
                </div>
            </div>
            <div class="col-lg-7 col-md-7 col-sm-7">
                <ImgCrop
                    btnUpload={
                        <label class="btn square wrap_upload mb-0" for="fileInput">
                            <i class="icon la la-image fs-14 pr-2"></i>{translate('select_image')}
                        </label>}
                    setFirstImage={setFirstImage}
                    setFileUpload={setFileUpload}
                    fileUpload={fileUpload}
                />
                <strong class="black mt-2 d-block">{translate('note')}</strong>
                <ul>
                    <li>{translate('Kích cỡ hình ảnh 128 x 128 pixels. Kích thước tệp cần phải được điều chỉnh cho phù hợp.')}</li>
                    <li>{translate('Bao gồm định dạng ảnh: ')}<b>{translate('png, jpg, jpeg …')}</b></li>
                </ul>
                <div class="d-flex mt-2 justify-content-end">
                    <button
                        type="button"
                        class="btn btn-red-bd-none"
                        style={{ border: '1px solid #e94c4c' }}
                        onClick={() => hideReviewModal(loadDefaultImage)}
                    >
                        {translate('cancel')}
                    </button>
                    <button
                        type="button"
                        class="btn btn-blue ml-2"
                        style={{ width: 150 }}
                        onClick={updateImage}
                        disabled={fileUpload.length === 0}
                    >
                        {translate('update')}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ContentUpload;