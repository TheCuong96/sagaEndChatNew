import React, { useState, useEffect } from 'react'
import { Input, Spin } from 'antd';
import ConversationListSearchMessage from './ConversationListSearchMessage'
import ConversationListRoomChat from './ConversationListRoomChat'
import ConversationListUser from './ConversationListUser'
import ConversationCategory from './ConversationCategory'
import { useTranslation } from 'react-i18next';
import StaticLoading from '../../../../components/common/Loading/StaticLoading';
import SpinLoading from 'components/common/Loading/SpinLoading';

const ConversationLeft = props => {
    const { isFetching, isFetchingLoadmoreLeftMenu, searchKey, onChangeData,
        isSearchRoom, showListRoom, selectTab, searchDatas, roomData, searchSelected, searchSelectedWithRoom, userId, listRoomSearchAll } = props
    const { t } = useTranslation()

    const onChange = (e) => {
        //gửi từ khóa search về component cha
        let value = e.target.value
        if (value.length > 0 && value.trim().length > 0) {
            onChangeData({ searchKey: value })
        } else {
            onChangeData({ searchKey: "" })
        }
    }

    return (
        <div className="conversation__wrap conversation__left position-relative">
            {isFetching && <StaticLoading />}
            <div className="conversation__search">
                <i className="icon las la-search"></i>
                {/* input search room chat */}
                <Input type="text" className="form-control" placeholder={t("search")} onChange={onChange} value={searchKey} />
            </div>
            <div className="conversation__tabs">
                {
                    isSearchRoom ?
                        //tab khi search room
                        <ConversationListSearchMessage
                            searchDatas={searchDatas}
                            roomData={roomData}
                            onChangeListSearchMessage={onChangeData}
                            searchSelected={searchSelected}
                        />
                        : showListRoom ?
                            //tab selected user
                            // tab list room chat
                            <ConversationListRoomChat
                                roomData={roomData}
                                onChangeListRoomChat={onChangeData}
                                searchSelectedWithRoom={searchSelectedWithRoom}
                                userId={userId}
                                searchKey={searchKey}
                                isSearchRoom={isSearchRoom}
                                showListRoom={showListRoom}
                                listRoomSearchAll={listRoomSearchAll}
                                listRoom={props.listRoom}
                            /> :
                            //tab list user
                            <ConversationListUser
                                listUser={props.listUser}
                                roomData={roomData}
                                onChangeListUser={onChangeData}
                            />
                }
                {isFetchingLoadmoreLeftMenu &&
                    <div className="loading_more let_menu">
                        <Spin size={'small'} spinning={isFetchingLoadmoreLeftMenu} />
                    </div>}
            </div>
            {/* thanh tab bên dưới */}
            {/* <ConversationCategory selectTab={selectTab} onChangeSelectTab={onChangeData} /> */}
        </div>
    )
}
export default ConversationLeft