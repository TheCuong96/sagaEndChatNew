import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatAction, chatProfileAction } from 'store/action'
import { useTranslation } from 'react-i18next'
import { chatContant, PAGES_URL, NOTIFICATION_TYPE } from 'contant'
import ConversationLeft from './Layout/ActiveChat/ConversationLeft'
import ConversationRight from './Layout/ActiveChat/ConversationRight';
import DialogConfirm from './Dialog/DialogConfirm'
import DialogAddMember from './Dialog/DialogAddMember'
import DialogShowMediaList from './Dialog/DialogShowMediaList'
import * as helper from 'functions/ChatHelper'
import { reducer, initialState, init } from './reducer';
import { showNotification } from 'functions/Utils'


const ChatMain = (props) => {
   
    return (
        <div className="conversation mb-5">
            {/* Tab bên trái */}
            <ConversationLeft
                searchKey={state.searchKey}
                userId={state.userId}
                listRoomSearchAll={state.listRoomSearchAll}
                listRoom={state.listRoom}
                searchSelected={state.searchSelected}
                searchSelectedWithRoom={state.searchSelectedWithRoom}
                isSearchRoom={state.isSearchRoom}
                searchDatas={state.searchDatas}
                roomData={state.roomData}
                showListRoom={state.showListRoom}
                selectTab={state.selectTab}
                isFetching={isFetchingLeftMenu}
                listUser={state.listUser}
                onChangeData={(value) => onChangeState(value)}
                isFetchingLoadmoreLeftMenu={isFetchingLoadmoreLeftMenu}
            />
            {/* tab bên phải */}
            <ConversationRight
                STATE={{ state, setState }}
                userId={state.userId}
                selectTab={state.selectTab}
                roomData={state.roomData}
                isShowRoomInfo={state.isShowRoomInfo}
                listMessage={state.listMessage}
                isSearchRoom={state.isSearchRoom}
                roomInfoData={state.roomInfoData}
                clearChatBody={state.clearChatBody}
                searchSelected={state.searchSelected}
                roomDataChange={state.roomDataChange}
                roomInfoDataMention={state.roomInfoDataMention}
                mentionData={state.mentionData}
                roomInfoDataFiles={state.roomInfoDataFiles}
                roomInfoDataMedia={state.roomInfoDataMedia}
                roomInfoDataMentionMedia={state.roomInfoDataMentionMedia}
                roomInfoDataMentionFiles={state.roomInfoDataMentionFiles}
                onChangeData={(value) => onChangeState(value)}
                isFetching={isFetching || (isFetchingChatLog && state.listMessage.data.length === 0)}
                scrollIndex={{ indexScrollMessage, updateScrollMessage }}
            />
            {/*Modal delete member in group*/}
            {state.deleteMember &&
                <DialogConfirm
                    visible={state.deleteMember}
                    onSave={deleteMember}
                    close={() => setState({ deleteMember: null })}
                    titleHeader="chat_delete_member"
                    title={`${t('chat_delete')} ${state.deleteMember.fullName} ${t('chat_delete_title')}`}
                />}

            {/*Modal add new member in group*/}
            {state.isShowAddMember && state.listMemberAddInRoom &&
                <DialogAddMember
                    visible={state.isShowAddMember}
                    close={() => setState({ isShowAddMember: false, listMemberAddInRoom: null })}
                    listMember={state.listMemberAddInRoom}
                    onSave={addNewMember}
                />}

            {/*Modal user out group*/}
            {/* thoát ra khỏi group */}
            {state.actionOutGroup &&
                <DialogConfirm
                    visible={state.actionOutGroup}
                    ok="chat_out_group"
                    icon='/images/icon_out_group.png'
                    onSave={onOutGroup}
                    close={() => setState({ actionOutGroup: null })}
                    titleHeader="chat_out_group_title"
                    title={t('chat_out_groups')}
                />}
            {/* remove người ra khỏi group */}
            {state.actionRemoveGroup &&
                <DialogConfirm visible={state.actionRemoveGroup}
                    ok="chat_remove_ok"
                    icon='/images/icon_out_group.png'
                    onSave={onDeleteRoom}
                    close={() => setState({ actionRemoveGroup: null })}
                    titleHeader="chat_info_delete_group"
                    title={t('chat_remove_groups')}
                />}
            {/* comfix gửi file lên */}
            {state.isShowAttachmentDataShow &&
                <DialogShowMediaList
                    attachmentData={state.attachmentDataShow}
                    visible={state.isShowAttachmentDataShow}
                    loadMore={(page) => state.selectTab == 2 ? onNextImage(page) : setState({ loadMoreMedia: page + 1 })}
                    close={() => onClose()}
                />}
        </div>
    )
}
export default ChatMain