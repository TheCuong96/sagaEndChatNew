import { chatContant } from 'contant'
import { getTimeVideo } from 'functions/ChatHelper'
import React, { useEffect, useRef, useState } from 'react'
import ConversationMessageTimeRender from './ConversationMessageTimeRender'

const ConversationMesageAttactmentVideo = props => {
    const { data, isGroup, measure, openFile } = props
    const refVideo = useRef()
    const [currentTime, setCurrentTime] = useState("00:00")
    const [isLoading, setLoading] = useState(true)

    return (
        <div class="client__mess--item">
            {!data.isHideAvatar && isGroup && !data.isMessageOut && <i class="client__name_on-group" style={{ color: 'white' }}>{data.sender.fullName}:</i>}
            <figure class="client__upload-video">
                <a class="fancybox" onClick={openFile} >
                    <video loop ref={refVideo}
                        onLoadedMetadata={(e) => {
                            setLoading(false)
                        }}
                        onLoad={measure}
                        onTimeUpdate={e => {
                            let time = e.target.duration - e.target.currentTime
                            setCurrentTime(getTimeVideo(time))
                        }}
                        class="video" src={data.url} alt="video" autoPlay={true} muted={true} />
                    {!isLoading && <span class="time">
                        {currentTime}
                        <i class="time_icon fas fa-volume-mute"></i>
                    </span>}
                    {isLoading && <span class="loading">
                        {/* <span class="size">576,0 KB / 1,8 MB</span> */}
                        <div class="loading_icon">
                            <i class="icon las la-times"></i>
                        </div>
                    </span>}
                </a>
            </figure>
            <ConversationMessageTimeRender data={data} />
        </div>
    )
}
export default ConversationMesageAttactmentVideo