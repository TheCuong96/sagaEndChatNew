import { chatContant } from 'contant'
import { imageUrl } from 'functions/ChatHelper'
import React, { useState, useEffect, useRef } from 'react'
import { Trans } from 'react-i18next'

const MediaAttachmentAudio = props => {
    const { data, openFile } = props
    return (
        <figure class="img d-flex align-items-center" onClick={openFile}>
            <span class="title">{data.title}</span>
            <button class="play">
                <i className="las la-play"></i>
            </button>
        </figure>
    )
}

const MediaAttachmentVideo = props => {
    const { data, openFile } = props
    return (
        <figure class="img" onClick={openFile}>
            <video src={data.url} />
        </figure>
    )
}

const MediaAttachmentImage = props => {
    const { data, openFile } = props
    return (
        <figure class="img" onClick={openFile}>
            <img src={imageUrl(data.url)} alt="" />
        </figure>
    )
}
const ConversationFileMedia = (props) => {
    const { data, openFile } = props
    return (
        data.type === chatContant.ATTACHMENT_TYPE_VIDEO ?
            <MediaAttachmentVideo data={data} openFile={openFile} />
            : data.type === chatContant.ATTACHMENT_TYPE_AUDIO ?
                <MediaAttachmentAudio data={data} openFile={openFile} /> :
                <MediaAttachmentImage data={data} openFile={openFile} />
    )
}
const ConversationBodyInfoRoomImages = (props) => {
    const { STATE, data } = props
    // const [state, setState] = useState({
    //     isShowListUser: false
    // })
    const onLoadMore = () => {
        STATE.setState({ loadMoreMedia: data.page + 1 })
    }
    const openFile = ({ item, index }) => {
        // let list = [].concat(STATE.state.roomInfoDataMedia.data)
        STATE.setState({ attachmentDataShow: { data: data.data, currentIndex: index, totalRecord: data.totalRecord, page: data.page }, isShowAttachmentDataShow: true })
    }
    return (
        <div className={`partner__item partner__detail${STATE.state.isShowDataMedia ? ' show' : ''}`}>
            <label class="partner__label dropdown-toggle" onClick={() => STATE.setState({ isShowDataMedia: !STATE.state.isShowDataMedia })} >
                <Trans>image</Trans> {STATE.state.isShowDataMedia && data?.totalRecord > 0 ? `(${data.totalRecord})` : ""}
            </label>
            <div className={`partner__list dropdown-menu${STATE.state.isShowDataMedia ? ' show' : ''}`}>
                <div className="partner__list-images">
                    {data &&
                        data.data.map((item, index) =>
                            <ConversationFileMedia data={item} key={index} openFile={() => openFile({ item, index })} />)}
                    {data && data.page < data.totalPage &&
                        < div class="text-center">
                            <a onClick={onLoadMore} class="partner__readmore"><Trans>read_more</Trans></a>
                        </div>}
                </div>
            </div>
        </div >
    )
}
export default ConversationBodyInfoRoomImages