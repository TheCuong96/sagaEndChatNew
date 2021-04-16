import Uploadavatar from 'components/common/UploadAvatar';
import React from 'react';
import {useTranslation} from "react-i18next";

const BlockAvatar = (props) => {
    const {t: translate} = useTranslation()
    const { url } = props;
    return (
        <div className="col-lg-3 d-flex flex-column">
            <div className="card h-100" >
                <div className="title__card">{translate('avatar')}</div>
                <Uploadavatar oldUrl={url} />
            </div>
        </div>
    )
}
export default BlockAvatar;