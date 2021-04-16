import React, { useState, useEffect } from 'react'
import ConversationEmptyRoom from './ConversationEmptyRoom'
import ConversationBody from './ConversationBody'
import ConversationFileList from './ConversationFileList'
import StaticLoading from '../../../../components/common/Loading/StaticLoading';

const ConversationRight = props => {
    const { isFetching, selectTab, roomData, onChangeData } = props
    return (
        <div className="conversation__wrap conversation__right position-relative">
            {isFetching && <StaticLoading />}
            {
                // tab 2 là tab hình ảnh
                selectTab === 2 ?
                    //hiện khung hình ảnh
                    <ConversationFileList onChangeData={onChangeData} /> :
                    roomData ?
                        //hiện khung chat
                        <ConversationBody
                            {...props}
                        />
                        :
                        // page khi chưa chon room chat
                        <ConversationEmptyRoom />
            }
        </div>
    )
}
export default ConversationRight