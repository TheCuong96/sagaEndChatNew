import React, { useCallback, useEffect, useRef, useState } from 'react'
import ConversationMessageTimeRender from './ConversationMessageTimeRender'
import WaveSurfer from "wavesurfer.js";
import { getTimeVideo } from 'functions/ChatHelper';
//https://wavesurfer-js.org/docs/events.html

const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: "#eee",
    progressColor: "#f4a239",
    cursorColor: "#f4a239",
    backgroundColor: '#6c757d',
    barWidth: 1,
    barRadius: 1,
    height: 40,
    fillParent: true,
    normalize: true,
});
const ConversationMesageAttachmentAudio = props => {
    const { data, isGroup, measure } = props
    const [playing, setPlay] = useState(false);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState("00:00")
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    useEffect(() => {
        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);
        wavesurfer.current.load(data.url);
        wavesurfer.current.on("error", error => {
            setError(error)
        });
        wavesurfer.current.on("pause", () => {
            setPlay(false)
        });
        wavesurfer.current.on("play", () => {
            setPlay(true)
        });
        wavesurfer.current.on("seek", value => {
            setCurrentTime(getTimeVideo(wavesurfer.current.getCurrentTime()))
            wavesurfer.current.play()
        });
        wavesurfer.current.on('audioprocess', value => {
            setCurrentTime(getTimeVideo(value))
        })
        return () => wavesurfer.current.destroy();
    }, []);

    const handlePlayPause = () => {
        wavesurfer.current.playPause()
    }

    return (
        <div class="client__mess--item">
            {!data.isHideAvatar && isGroup && !data.isMessageOut && <i class="client__name_on-group" style={{ color: 'white' }}>{data.sender.fullName}:</i>}
            {
                error ? <figure class="client__upload-files">
                    <i className='las la-file' style={{ fontSize: '20px', color: "#387f55" }}></i>
                    <a class="name" href={data.url} target="_blank" >{data.message}</a>
                </figure> :
                    <figure class="client__upload-audio d-flex align-items-center">
                        <span class="time">{currentTime}</span>
                        <a class="fancybox">
                            <div class="audio" ref={waveformRef} onLoad={measure} />
                        </a>
                        <button class="play" onClick={handlePlayPause}>
                            {!playing ? <i className="las la-play"></i> : <i className="las la-pause"></i>}
                        </button>
                    </figure>
            }
            <ConversationMessageTimeRender data={data} />
        </div>
    )
}
export default ConversationMesageAttachmentAudio