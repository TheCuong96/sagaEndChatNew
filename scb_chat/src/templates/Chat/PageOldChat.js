import React, { useEffect, useState } from "react";
import { notification } from "antd";
import ChatHeader from "./ChatHeader";
import OldChatMain from './OldChatMain'
import { getLocalStorage } from "functions/Utils";
import { useTranslation } from 'react-i18next';

const showToast = (type, message, className) => {
  notification[type]({
    message: message,
    placement: "BottomRight",
    className: className,
  });
};

const PageOldChat = (props) => {
  const { t: translate } = useTranslation()
  const [userInfo] = useState(getLocalStorage('user'))
  return (
    <div className="container-fluid main_content chat_ui" name-c="PageChat">
      <ChatHeader userId={userInfo['id']} />
      <OldChatMain userId={userInfo['id']} showToast={showToast} />
    </div>
  );
};


export default PageOldChat;