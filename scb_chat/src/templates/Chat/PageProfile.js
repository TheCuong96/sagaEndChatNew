import ButtonBase from 'components/base/Button/ButtonBase';
import React, { useState } from 'react';
import DialogChangePassword from './Layout/User/DialogChangePassword';
import ProfileMain from './Layout/User/ProfileMain';
import {useTranslation} from "react-i18next";

const PageProfile = () => {
    const { t: translate } = useTranslation();
    // const [isShowModal, setShowModal] = useState(false);
    // const onShowModal = () => {
    //     setShowModal(!isShowModal);
    // }
    return (
        <>
            <div className="header-page">
                <div className="header-page__title">
                    {translate('my_profile')}
            </div>
                {/*<div className="header-page__action">*/}
                {/*    <ButtonBase className="rc_button-blue-outline" onClick={onShowModal}>Change Password</ButtonBase>*/}
                {/*</div>*/}
            </div>
            <ProfileMain />
            {/*<DialogChangePassword*/}
            {/*    visible={isShowModal}*/}
            {/*    setShowModal={setShowModal}*/}
            {/*    title="Change Password"*/}
            {/*/>*/}
        </>
    )
}
export default PageProfile;