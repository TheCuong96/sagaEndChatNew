// import * as Login from './templates/Login';
import React, { lazy } from 'react';
import { PAGES_URL } from 'contant';
const PageLogin = lazy(() => import('templates/Account/PageLogin'));
const PageDashboard = lazy(() => import('templates/Chat/PageDashboard'));
const PageMonitoring = lazy(() => import('templates/Chat/PageMonitoring'));
const PageActiveChat = lazy(() => import('templates/Chat/PageActiveChat'));
const PageHistory = lazy(() => import('templates/Chat/PageHistory'));
const PageProject = lazy(() => import('templates/Chat/PageProject'));
const PageChatBot = lazy(() => import('templates/Chat/PageChatBot'));
const PageProfile = lazy(() => import('templates/Chat/PageProfile'));
const PageOldChat = lazy(() => import('templates/Chat/PageOldChat'));
const PageChatbotDetail = lazy(() => import('templates/Chat/PageChatbotDetail'));

const PageVideoCall = lazy(() => import('templates/Chat/PageVideoCall'));

const PageElement = lazy(() => import('templates/Elements/index'));

const GUESTS = [
    {
        "path": PAGES_URL.login,
        "component": PageLogin
    }
]

const MAIN = [
    {
        "path": PAGES_URL.home,
        "component": PageDashboard
    },
    {
        "path": PAGES_URL.video_call,
        "component": PageVideoCall
    },
    {
        "path": PAGES_URL.monitoring,
        "component": PageMonitoring
    },
    {
        "path": PAGES_URL.activeChat,
        "component": PageActiveChat
    },{
        "path": PAGES_URL.oldChat,
        "component": PageOldChat
    },
    {
        "path": PAGES_URL.history,
        "component": PageHistory
    },
    {
        "path": PAGES_URL.project,
        "component": PageProject
    },
    {
        "path": PAGES_URL.chatbot,
        "component": PageChatBot
    },
    {
        "path": PAGES_URL.element,
        "component": PageElement
    },
    {
        "path": PAGES_URL.profile,
        "component": PageProfile
    },
    {
        "path": PAGES_URL.chatbot_detail,
        "component": PageChatbotDetail
    },
]

const getPathList = (DATA) => {
    var list = []
    for (var i = 0; i < DATA.length; i++) {
        if (DATA[i]) {
            list.push(DATA[i].path)
        }
    }
    return list
}
export { GUESTS, MAIN, getPathList }