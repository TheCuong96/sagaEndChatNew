import { imageUrl } from 'functions/ChatHelper'
import React, { useEffect } from 'react'
import ConversationMessageTimeRender from './ConversationMessageTimeRender'
import { IMAGE_DEFAULT } from "contant"
import { Animated } from 'react-animated-css';

const ConversationMesageAttactmentImage = props => {
    const { data, isGroup, measure, openFile } = props

    const [state, setState] = React.useState({
        src: IMAGE_DEFAULT
    })

    React.useEffect(() => {
        if (data.thumbnail) {
            let src = imageUrl(data.thumbnail);
            setState(e => ({ ...e, src }))
        }
    }, [data.thumbnail])
    return (
        <div class="client__mess--item">
            {!data.isHideAvatar && isGroup && !data.isMessageOut && <i class="client__name_on-group" style={{ color: 'white' }}>{data.sender.fullName}:</i>}
            <figure class="client__upload-images d-flex align-items-center" style={{ maxWidth: 280 + "px" }}>
                <a class="fancybox" onClick={openFile}>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <img className="image" onLoad={measure} src={state.src} alt="" />
                    </Animated>
                </a>
            </figure>
            <ConversationMessageTimeRender data={data} />
        </div>
    )
}
export default React.memo(ConversationMesageAttactmentImage)