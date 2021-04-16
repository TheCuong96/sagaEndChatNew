import React, {useEffect, useState, memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {chatAction} from '../store/action'
import {getLocalStorage} from 'functions/Utils'
import {TOKEN_QUEUE_CHAT} from 'functions/Utils';

var Stomp = require('stompjs')
const receive_topic = `CLIENT.USER_${TOKEN_QUEUE_CHAT}.#`
const send_topic = `SERVER.USER_${TOKEN_QUEUE_CHAT}.`

const StompConnect = props => {
    const [rabbitInfo, setRabbitInfo] = useState();
    const dispatch = useDispatch();
    const chatReducer = useSelector(state => state.chatReducer)
    const {eventRabbit, eventReconnect} = chatReducer
    const [isConnected, setConnected] = useState(false)
    const [isInit, setInit] = useState(false)
    const [client, setClient] = useState(null);


    const receive_topic = `CLIENT.USER_NjdlNTM0OGJmNjAzZTMwYjdmOGRlMTM5MmM5Njc5NTdjYmE2NDBlZg==.#`
    const send_topic = `SERVER.USER_NjdlNTM0OGJmNjAzZTMwYjdmOGRlMTM5MmM5Njc5NTdjYmE2NDBlZg==.`
    const fake_user = {
        "id": "1000010003",
        "full_name": "Administrator111",
        "avatar_url": "https://picsum.photos/200",
        "mobile": null,
        "email": "admin@minnerva",
        "gender": 1,
        "token": "MTAwMDAxMDAwMzo5YjFhMzMzYWZmNDQ4OWU2MmIxNzk4Y2EwYjg0ZmI3YjAxN2ViNWRh",
        "last_login": "2021-04-15 16:23:17",
        "app": {
            "chat": {"name": "chat", "rabbit_info": {"host": "mq.minerva.vn", "password": "123123", "username": "cctv_client_chatting", "amqp_port": 3005, "mqtt_port": 1883, "stomp_port": 3007, "chatting_vhost": "cctv_chatting_v2"}},
            "los": {"name": "Loan Origination System"},
            "drive": {"name": "drive"}
        },
        "chat_info": {
            "system_user_id": "1000010003",
            "queue_token": "NjdlNTM0OGJmNjAzZTMwYjdmOGRlMTM5MmM5Njc5NTdjYmE2NDBlZg==",
            "rabbit_info": {"host": "chatmq.minerva.vn", "amqp_port": 5672, "mqtt_port": 1883, "stomp_port": 3636, "chatting_vhost": "chatting_v2", "username": "client_chatting", "password": "123123"}
        }
    }

    useEffect(() => {
        // let user = getLocalStorage('user')
        let user = fake_user

        if (user) {
            if (!isConnected && user.chat_info) {
                setRabbitInfo(user.chat_info.rabbit_info)
            }
        } else if (client) {
            client.disconnect()
        }
    }, [])

    const onErrorCallback = (error) => {
        setConnected(false)
        dispatch(chatAction.sendConnectedStatus({isConnected: false}))
    }

    const printReceivedMessage = (response) => {
        let key_message = response.headers.destination.split('.').pop()
        dispatch(chatAction.handleRabbitResponse({key_message, body: JSON.parse(response.body)}))
    }

    useEffect(() => {
        connectMqtt()
    }, [rabbitInfo])
    useEffect(() => {
        if (eventReconnect && rabbitInfo && !isConnected) {
            console.log("reconnect")
            connectMqtt()
            dispatch(chatAction.sendReconnectRabbit(false))
        }
    }, [eventReconnect])
    const connectMqtt = () => {
        if (rabbitInfo) {
            let url = "wss://" + rabbitInfo.host + ":" + rabbitInfo.stomp_port + "/ws"
            var client = Stomp.client(url); // asign the created client as global for sending or subscribing messages
            client.reconnect_delay = 1000;
            client.debug = null;
            // username, password, connectCallback, errorCallback, host
            const onConnectCallback = () => {
                setConnected(true)
            }
            var headers = {
                login: rabbitInfo.username,
                passcode: rabbitInfo.password,
                host: rabbitInfo.chatting_vhost,
            }
            client.connect(headers, onConnectCallback, onErrorCallback);
            setClient(client)
        }
    }

    useEffect(() => {
        if (client && isConnected && !isInit) {
            // var countRecord = 0
            client.subscribe("/exchange/amq.topic/" + receive_topic, function (response) {
                // countRecord = countRecord+1
                // console.log({countRecord})
                printReceivedMessage(response);
            });
            setInit(true)
            dispatch(chatAction.sendConnectedStatus({isConnected: true}))
        }
    }, [client, isConnected])

    useEffect(() => {
        if (eventRabbit && eventRabbit.length > 0 && isConnected && client) {
            let event = eventRabbit[0]
            client.send("/exchange/amq.topic/" + send_topic + event.key_message, {}, JSON.stringify(event.data))
            dispatch(chatAction.clearSendRabbitData(event))
        }
    }, [eventRabbit, client, isConnected])

    return (<div id="rabbit_connect"></div>)
}
export default StompConnect
