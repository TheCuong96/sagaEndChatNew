import React, { useState } from 'react';
import Modal from 'components/base/Modal/ModalCustom'
import ContentUpload from './ContentUpload';
import { useTranslation } from 'react-i18next';

const Uploadavatar = (props) => {
    const { t: translate } = useTranslation('staffProfile');

    const oldUrl = props.oldUrl ? props.oldUrl : '/images/default_image_minerva.png';
    const [visileReviewModal, setVisileReviewModal] = useState(false);

    const showReviewModal = () => {
        setVisileReviewModal(true)
    }
    const hideReviewModal = (loadDefaultImage) => {
        setVisileReviewModal(false);
        loadDefaultImage()
    }
    return (
        <div id="div_image_preview">
            <div className="profile__avatar">
                <div className="picture">
                    <img src={oldUrl} className="img-camera" />
                    <div className="change_pic" onClick={showReviewModal}>
                        <i className="fas fa-camera icon-upload"></i>
                    </div>
                </div>
            </div>
            <Modal
                forceRender
                visible={visileReviewModal}
                children={
                    <ContentUpload
                        oldUrl={oldUrl}
                        hideReviewModal={hideReviewModal}
                    />
                }
                heading={
                    <div class="m_heading">
                        <button class="m_button no-event"><span>{translate('update_avata')}</span></button>
                    </div>
                }
                classModal={'rc_modal'}
                widthModal={800}
            />
        </div>
    );
}
export default Uploadavatar;