import React, { useState, useCallback, useRef } from "react";
import { Picker } from "emoji-mart";
import FunnyEmojiIcon from '../Icon/FunnyEmojiIcon';
import useClickOutside from "../hooks/useClickOutside";
const EmojiInput = (props) => {
    const { onSelection } = props
    const [showPicker, setPickerState] = useState(false);
    const picker = useRef(null);

    const dismissPicker = useCallback(() => {
        setPickerState(false);
    }, [setPickerState]);

    useClickOutside([picker], dismissPicker);

    const togglePicker = () => {
        setPickerState(!showPicker);
    };

    const addEmoji = (emoji) => {
        if ("native" in emoji) {
            onSelection(emoji.native);
        }
    };

    return (<div ref={picker} className="btn-emoji">
        <div className="dialog-emoji">
            {showPicker && (
                <Picker set="facebook" emojiSize={20} emoji="" title="" native={true} onSelect={addEmoji} exclude={["flags"]}/>
            )}
        </div>
        <span className="button-emoji" onClick={togglePicker}>
            <FunnyEmojiIcon title="Open emoji selector" />
        </span>
    </div>) 
}
export default EmojiInput