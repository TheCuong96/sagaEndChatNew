import React from 'react';
import * as helper from 'functions/ChatHelper'
import { chatContant } from 'contant';
import { useTranslation } from 'react-i18next';
import IconTypeMedia from 'components/common/Chat/MediaIcon/IconTypeMedia'


const MediaAttachmentAudio = props => {
    const { data } = props
    return (
        <figure class="chat-image__img d-flex align-items-center" >
            <span class="title">{data.title}</span>
            <button class="play">
                <i className="las la-play"></i>
            </button>
        </figure>
    )
}
const MediaAttachmentFile = props => {
    const { data } = props
    return (
        <figure class="chat-image__img d-flex align-items-center">
            <IconTypeMedia type={data.url && data.url.split('.').pop()} style={{ width: "40px" }} />
            <span class="title">{data.title}</span>
        </figure>
    )
}
const MediaAttachmentVideo = props => {
    const { data } = props
    return (
        <figure class="chat-image__img">
            <video src={data.url} />
        </figure>
    )
}

const MediaAttachmentImage = props => {
    const { data } = props
    return (
        <figure class="chat-image__img" >
            <img src={helper.imageUrl(data.url)} alt="" />
        </figure>
    )
}

const ConversationFileItem = props => {
    const { data, openFile } = props
    const { t } = useTranslation()
    const dowloadFile = (e) => {
        e.stopPropagation()
        const requestOptions = {
            method: "GET"
        };
        fetch(data.url, requestOptions).then(res => res.blob()).then(res => {
            const url = window.URL.createObjectURL(res)
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', data.title);
            link.click();
        })
    }
    return (
        <div class="chat-image__item" onClick={openFile}>
            {
                data.type === chatContant.ATTACHMENT_TYPE_IMAGE ?
                    <MediaAttachmentImage data={data} />
                    : data.type === chatContant.ATTACHMENT_TYPE_VIDEO ?
                        <MediaAttachmentVideo data={data} />
                        : data.type === chatContant.ATTACHMENT_TYPE_AUDIO ?
                            <MediaAttachmentAudio data={data} /> :
                            <MediaAttachmentFile data={data} />
            }
            <div class="chat-image__des">
                <i class="icon_download las la-download" onClick={dowloadFile}></i>
                <span class="label">{t('Sender')}:</span>
                <span class="name">{data.sender && data.sender.fullName}</span>
                <span class="time"> {helper.convertTime(data.createdAt, 'YYYY-MM-DD HH:mm:ss', 'HH:mm - DD/MM/YYYY')}</span>
            </div>
        </div>
    )
}

export default React.memo(ConversationFileItem)