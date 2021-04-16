
import React, { useState, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { convertTimeRelation } from '../../../../functions/ChatHelper';
import { chatContant } from 'contant';
import ListView from 'components/common/Chat/ListView';
import { List } from 'antd';
import AvatarRender from './ConversationMessage/AvatarRender';

const ItemSearchRoom = (props) => {
    const { data, onClose } = props
    return (
        <div class="conversation__user--item border-none">
            <figure class="conversation__user--avatar">
                <span className="wrap d-flex align-items-center justify-content-center">
                    <AvatarRender url={data.avatar} fullName={data.roomName} />
                </span>
            </figure>
            <div class="conversation__user--content">
                <span class="temp top">
                    <i class="name">{data.roomName}</i>
                    <i className="las la-times" onClick={onClose}></i>
                </span>
            </div>
        </div>
    )
}

export const ItemSearchRoomMessage = (props) => {
    const { t } = useTranslation
    const { data, onSelected, isSelected, measure } = props
    return (
        <div className={`conversation__user--item ${isSelected ? 'active' : ""}`} onClick={onSelected}>
            <figure className="conversation__user--avatar">
                <span className="wrap d-flex align-items-center justify-content-center">
                    <AvatarRender url={data.sender.avatar} fullName={data.sender.fullName} />
                </span>
            </figure>
            <div className="conversation__user--content">
                <span className="temp top">
                    <i className="name">
                        {data.sender.fullName}
                        {!data.isMessageOut && data.status === chatContant.STATUS_READ && <i className="icon_read las la-check-double"></i>}
                    </i>
                    <i className="time">{(data.timeStamp != null && data.timeStamp > 0) && convertTimeRelation(data.timeStamp, t)}</i>
                </span>
                <span className="temp bottom">
                    {<i className="detail">{data.message}</i>}
                </span>
            </div>
        </div>
    )
}
export const TitleSearchItem = (props) => {
    const { title } = props
    return (
        <div className="conversation__search-label"><Trans>{title}</Trans></div>
    )
}

const getListHeader = () => {
    let listHeader = []
    listHeader.push({ typeHeader: 1 }) //header
    listHeader.push({ typeHeader: 2 }) //room Seleted
    listHeader.push({ typeHeader: 3 }) //row total
    return listHeader
}
const ConversationListSearchMessage = (props) => {
    const { searchDatas, roomData, onChangeListSearchMessage, searchSelected } = props

    const [mIndex, setIndex] = useState(0)
    const [listData, setListData] = useState(getListHeader())

    useEffect(() => {
        if (searchDatas.data) {
            let index = 0;
            let list = [].concat(searchDatas.data)
            //them item header vào đầu.
            list = getListHeader().concat(list)
            if (listData.length > 3) {
                index = list.length - (list.length - listData.length)
            }
            setListData(list)
            setIndex(index)
        }
    }, [searchDatas.data])

    const rowRenderer = (index, key, style, measure) => {
        const item = listData[index];
        if (item)
            return (
                <List.Item key={key} style={{ ...style, padding: 0 }} className={`row-${index}`}>
                    {item.typeHeader === 1
                        && <TitleSearchItem title={"search_message_in"} />}
                    {item.typeHeader === 2
                        && <ItemSearchRoom
                            data={roomData}
                            onClose={() => onChangeListSearchMessage({ isSearchRoom: false, searchDatas: { data: [], page: 1, totalPage: 1 } })}
                        />}
                    {item.typeHeader === 3
                        && <div class="conversation__search-label"><Trans>chat_found</Trans><span class="number"> {searchDatas.data.length} </span><Trans>chat_message</Trans></div>}
                    {item.typeSearchMessage
                        && <ItemSearchRoomMessage
                            data={item}
                            isSelected={searchSelected === item}
                            onSelected={() => onChangeListSearchMessage({ searchSelected: item })} measure={measure} />}
                </List.Item>
            )
        else return null
    }
    const loadMessage = (startIndex, stopIndex) => {
        onChangeListSearchMessage({ loadMoreSearch: { startIndex, stopIndex } })
    }

    return (
        <div className="conversation__user list-search active">
            <ListView items={listData} rowRenderView={rowRenderer} loadMore={loadMessage}
                scrollIndex={{ indexScrollMessage: mIndex, updateScrollMessage: setIndex }} setCurrentIndex={(value) => onChangeListSearchMessage({ currentIndexMessage: value })}
                isMutilLoad={false} />
        </div>
    )
}

export default ConversationListSearchMessage;
