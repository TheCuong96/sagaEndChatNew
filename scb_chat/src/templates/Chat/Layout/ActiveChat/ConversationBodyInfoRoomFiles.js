import IconTypeMedia from 'components/common/Chat/MediaIcon/IconTypeMedia'
import React from 'react'
import { Trans } from 'react-i18next'
import { downloadFileURL } from 'functions/Utils';

const ConversationFile = (props) => {
    const { data } = props

    // const openFile = () => {
    //     window.open(data.url, "_blank")
    // }

    return (
        <div class="fancybox"
        // onClick={openFile}
        >
            <div class="partner__list-file" >
                <figure class="img">
                    <IconTypeMedia type={data.url && data.url.split('.').pop()} style={{ width: "14px" }} />
                </figure>
                <div class="name" onClick={(e) => { downloadFileURL(e, data.url, data.title) }}>{data.title}</div>
                <i class="icon las la-download"
                    onClick={(e) => { downloadFileURL(e, data.url, data.title) }}
                />
            </div >
        </div >
    )
}

const ConversationBodyInfoRoomFiles = (props) => {
    const { STATE, data } = props
    const onLoadMore = () => {
        STATE.setState({ loadMoreFiles: data.page + 1 })
    }
    return (
        <div className={`partner__item partner__detail${STATE.state.isShowDataFiles ? ' show' : ''}`}>
            <label class="partner__label dropdown-toggle" onClick={() => STATE.setState({ isShowDataFiles: !STATE.state.isShowDataFiles })} >
                <Trans>file</Trans>
            </label>
            <div className={`partner__list dropdown-menu${STATE.state.isShowDataFiles ? ' show' : ''}`}>
                {data &&
                    data.data.map((item, index) =>
                        <ConversationFile data={item} key={index} />)}
                {data && data.page < data.totalPage &&
                    < div class="text-center">
                        <a onClick={onLoadMore} class="partner__readmore"><Trans>read_more</Trans></a>
                    </div>}
            </div>
        </div >
    )
}
export default ConversationBodyInfoRoomFiles