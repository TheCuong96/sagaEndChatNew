import React, { useState, useEffect, useRef } from "react";
import { Modal, Spin } from 'antd';
import { useTranslation } from "react-i18next";
import { chatContant } from "contant";
import WaveSurfer from "wavesurfer.js";
import { getTimeVideo, imageUrl } from 'functions/ChatHelper';
import SpinLoading from "components/common/Loading/SpinLoading";

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

const MediaImageItem = props => {
    const { data, parent } = props
    const [style, setStyle] = useState()
    useEffect(() => {
        if (data) {
            var img = new Image();
            img.src = imageUrl(data.url)
            img.onload = () => {
                const currentWidth = parent.current.clientWidth
                const currentHeight = parent.current.clientHeight
                let w = img.width
                let h = img.height
                w = currentHeight / h * w
                h = currentHeight
                if (h > currentHeight || w > currentWidth) {
                    h = currentWidth / w * h
                    w = currentWidth
                }
                setStyle({ width: w, height: h })
            }
        }
    }, [data])

    return (
        <figure style={{ width: '100%', height: '100%', justifyContent: 'center' }} className="d-flex m-auto align-items-center">
            <img style={style} src={imageUrl(data.url)} />
        </figure>
    )
}
const MediaVideoItem = props => {
    const { data } = props
    return (
        <figure style={{ width: '100%', height: '100%' }} className="d-flex m-auto">
            <video class="video" src={data.url} alt="video" autoPlay={true} muted={false} controls />
        </figure>
    )
}
const MediaAudioItem = props => {
    const { data } = props
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
        <div>
            <figure style={{ width: 'fit-content', paddingTop: '225px' }} className="d-flex align-items-center m-auto">
                <div className="media">
                    <span class="time">{currentTime}</span>
                    <a class="fancybox">
                        <div class="audio" ref={waveformRef} />
                    </a>
                    <button class="play" onClick={handlePlayPause}>
                        {!playing ? <i className="las la-play"></i> : <i className="las la-pause"></i>}
                    </button>
                </div>
            </figure>
            <div className="title">{data.title}</div>
        </div>
    )
}

const DialogShowMediaList = (props) => {
    const { attachmentData, close, visible, loadMore } = props
    const [currentIndex, setCurrent] = useState(0)
    const [mediaList, setMedaiList] = useState([])
    const [totalMedia, setTotalMedia] = useState(0)
    const [itemShow, setItemShow] = useState()
    const listMediaRef = useRef()
    const [keyPress, setPressed] = useState();
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (attachmentData) {
            if (attachmentData.data) {
                setMedaiList([].concat(attachmentData.data))
                setTotalMedia(attachmentData.totalRecord > 0 ? attachmentData.totalRecord : attachmentData.data.length)
            }
            setCurrent(attachmentData.currentIndex)
            setLoading(false)
        }
    }, [attachmentData])

    useEffect(() => {
        if (currentIndex >= 0 && totalMedia > 0 && currentIndex < totalMedia) {
            if (currentIndex == mediaList.length - 1 && mediaList.length < totalMedia) {
                loadMore(attachmentData.page);
                setLoading(true)
            }
            else {
                setItemShow(mediaList[currentIndex])
            }
        }


    }, [currentIndex, mediaList])

    useEffect(() => {
        let total = totalMedia > 0 ? totalMedia : mediaList.length
        if (keyPress == 37) {
            if (total > 0 && currentIndex > 0) {
                setCurrent(currentIndex - 1)
            }
        } else if (keyPress == 39) {
            if (total > 0 && currentIndex < total - 1) {
                setCurrent(currentIndex + 1)
            }
        }
        setPressed()
    }, [keyPress])

    const keydownFunction = (event) => {
        setPressed(event.keyCode)
    }
    useEffect(() => {
        document.addEventListener("keydown", keydownFunction, false);
        return () => document.removeEventListener("keydown", keydownFunction, false);
    }, [])

    return (
        <Modal visible={visible} onCancel={close} width={1000} footer={null} header={null}>
            <div className="btn_change_img  d-flex">
                {
                    totalMedia > 0 && currentIndex > 0 &&
                    <span className="btn_prev left d-flex" onClick={() => setCurrent(currentIndex - 1)} >
                        <i className="las la-arrow-left" />
                    </span>
                }
                {
                    totalMedia > 0 && currentIndex < totalMedia - 1 &&
                    <span className="btn_next right d-flex ml-auto" >
                        <SpinLoading spinning={isLoading} className="loading_full loading_content t-0 l-0">
                            <div onClick={() => setCurrent(currentIndex + 1)}>
                                <i className="las la-arrow-right" />
                            </div>
                        </SpinLoading>
                    </span>
                }
            </div>
            <div className="list_img" ref={listMediaRef} >
                {itemShow &&
                    (itemShow.type === chatContant.ATTACHMENT_TYPE_IMAGE ?
                        <MediaImageItem data={itemShow} parent={listMediaRef} /> :
                        itemShow.type === chatContant.ATTACHMENT_TYPE_VIDEO ?
                            <MediaVideoItem data={itemShow} /> :
                            itemShow.type === chatContant.ATTACHMENT_TYPE_AUDIO ?
                                <MediaAudioItem data={itemShow} /> :
                                "")
                }
            </div>
        </Modal>)
}
export default DialogShowMediaList