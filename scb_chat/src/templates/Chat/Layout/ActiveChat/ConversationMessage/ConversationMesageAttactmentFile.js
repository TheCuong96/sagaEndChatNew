import IconTypeMedia from 'components/common/Chat/MediaIcon/IconTypeMedia'
import React from 'react'
import ConversationMessageTimeRender from './ConversationMessageTimeRender'
import { downloadFileURL } from 'functions/Utils';

const ConversationMesageAttactmentFile = props => {
    const { isGroup, data } = props;
    return (
        <div class="client__mess--item">
            <span class="client__text">
                {!data.isHideAvatar && isGroup && !data.isMessageOut && <i class="client__name_on-group">{data.sender.fullName}:</i>}
                <figure class="client__upload-files">
                    <IconTypeMedia type={data.url && data.url.split('.').pop()} style={{ width: "20px" }} />
                    <a class="name" onClick={(e) => { downloadFileURL(e, data.url, data.message) }} >
                        {data.message}
                    </a>
                </figure>
            </span>
            <ConversationMessageTimeRender data={data} />
        </div>
    )
}
export default ConversationMesageAttactmentFile