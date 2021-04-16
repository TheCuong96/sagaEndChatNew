import React, { useState, useEffect } from "react";
import ConversationListView from "../../../../components/common/Chat/ListView"
import ConversationMessageItem from './ConversationMessage/ConversationMessageItem'
import ConversationMessageCenterItem from './ConversationMessage/ConversationMessageCenterItem'
import { chatContant } from "../../../../contant";
import { List } from 'antd';
import { getAllFileListInListMessage } from "functions/ChatHelper";
import { Spin } from 'antd'

const ConversationBodyChat = props => {
    const { scrollIndex, isFetchingChatLog, listMessage, clearChatBody, onChangeData, roomData, searchSelected } = props
    const [mIndex, setIndex] = useState(0)
    const [listItem, setListItem] = useState([])

    //data từ list + rabbit trả về đã được concat lại
    useEffect(() => {
        if (listMessage.data) {
            // console.log({ listMessage })
            setListItem(listMessage.data)
        }
    }, [listMessage])

    //set lại vị trí scroll
    useEffect(() => {
        setIndex(scrollIndex.indexScrollMessage)
    }, [scrollIndex.indexScrollMessage])

    //click vào 1 link user trên group chat
    const onClickMention = (value) => {
        if (value) {
            onChangeData({ mentionData: { userId: value.userId } })
        }
    }

    //mở file được nhấn lên
    const openFile = ({ item, index }) => {

        let list = getAllFileListInListMessage(listItem)
        let itemIndex = list.findIndex((model) => model.url === item.url && model.timeStamp === item.timeStamp)
        if (list.length > 0 && itemIndex > -1) {
            onChangeData({ attachmentDataShow: { data: list, currentIndex: itemIndex, }, isShowAttachmentDataShow: true })
        }
    }

    const rowRenderer = React.useMemo(() => (index, key, style, measure) => {
        const item = listItem[index];
        return (
            <List.Item key={key} style={{ ...style, padding: 0 }} className={`row-${index}`}>
                {item && item.messageType === chatContant.MESSAGE_TYPE_VIEW
                    //nhận data của chính mình
                    && <ConversationMessageItem
                        measure={measure}
                        data={item}
                        isGroup={roomData.isGroup}
                        key={index}
                        onClickMention={onClickMention}
                        openFile={() => openFile({ item, index })}
                    />}
                {item && item.messageType === chatContant.MESSAGE_TYPE_ADMIN
                    //nhận data của người khác
                    && <ConversationMessageCenterItem measure={measure} data={item} key={index} onClickMention={onClickMention} />}
            </List.Item>
        )
    }, [listItem])

    const loadMessage = (startIndex, stopIndex) => {
        onChangeData({ loadMessage: { startIndex, stopIndex } })
    }
    return (
        <div className="hasData w-100 h-100" id="message">
            {isFetchingChatLog &&
                <div className="loading_more">
                    <Spin size={'small'} spinning={true} /> </div>
            }
            {/* view list text trong chat  */}
            {/* dùng chung list view với tab room chat */}
            <ConversationListView
                isReverse={true}
                isTop={searchSelected ? true : false}
                clearAll={{ isClear: clearChatBody, resetClear: () => onChangeData({ clearChatBody: false }) }}
                items={listItem}
                rowRenderView={rowRenderer}
                loadMore={loadMessage}
                scrollIndex={{ indexScrollMessage: mIndex, updateScrollMessage: scrollIndex.updateScrollMessage }}
                setCurrentIndex={(value) => onChangeData({ currentIndexMessage: value })}
                isMutilLoad={true} />
        </div>
    )
}
export default ConversationBodyChat


