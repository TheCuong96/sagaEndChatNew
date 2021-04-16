import { getEmojiIndexes } from 'functions/ChatHelper'
import React, { useEffect, useState } from 'react'
const default_save_message = '../../images/ic_save_message.png'

const AvatarRender = props => {
    const { url, fullName } = props
    const [textName, setTextName] = useState("")
    
    useEffect(() => {
        if (fullName) {
            const { result, text } = getEmojiIndexes(fullName)
            if (text && text.trim().length > 0) {
                setTextName(text.trim()[0].toUpperCase())
            } else if (result && result.length > 0) {
                setTextName(result[0].emoji)
            }
        }
    }, [fullName])

    if (url != null && url.includes('http') || url == default_save_message) {
        return (<img src={url} alt="avatar" />)
    } else {
        return (<span className="span-avatar">{textName}</span>)
    }
}
export default AvatarRender