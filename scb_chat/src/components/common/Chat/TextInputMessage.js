import React, { useState, useEffect, useRef } from "react";
import { EditorState, ContentState, getDefaultKeyBinding, Modifier } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createMentionPlugin, { defaultSuggestionsFilter } from "draft-js-mention-plugin";
import * as hepler from '../../../functions/ChatHelper'

const createMentionPluginData = () => {
    return createMentionPlugin({
        positionSuggestions: (settings) => {
            return {
                left: settings.decoratorRect.left + 'px',
                top: settings.decoratorRect.top - 10 + 'px', // change this value (40) for manage the distance between cursor and bottom edge 
            };
        },
        theme: {
            mention: "mention",
            mentionSuggestions: "mentionSuggestions",
            mentionSuggestionsEntryFocused: "mentionSuggestionsEntryFocused",
            mentionSuggestionsEntryText: "mentionSuggestionsEntryText",
            mentionSuggestionsEntryTitle: "mentionSuggestionsEntryTitle",
            mentionSuggestionsEntryAvatar: "mentionSuggestionsEntryAvatar"
        }
    })
}
const TextInputMessage = (props) => {
    const { mentions, addTextImoji, draftDataEditor, onFocusMessage, resetView, onBlurMessage, onChangeEditor, placeholder, onPressEnter, onChangeKey, roomData } = props

    const [mentionPlugin] = useState(createMentionPluginData())
    const { MentionSuggestions } = mentionPlugin
    const [state, setState] = useState({ suggestions: mentions })
    const editorRef = useRef()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    useEffect(() => {
        console.log({ draftDataEditor })
        if (draftDataEditor) {
            const editor = EditorState.push(editorState, draftDataEditor, 'insert-characters');
            onChange(editor)
        }
    }, [draftDataEditor])

    // settime để focus sau khi tạo plusgin
    useEffect(() => {
        if (roomData && editorRef.current) {
            setTimeout(() => {
                editorRef.current.focus()
            }, 0);

        }
    }, [roomData])

    useEffect(() => {
        if (addTextImoji) {
            const editor = insertCharacter(`${addTextImoji} `, editorState)
            onChangeEditor && onChangeEditor(editor)
            setEditorState(EditorState.moveFocusToEnd(editor));
        }
    }, [addTextImoji])

    const insertCharacter = (characterToInsert, editorState) => {
        const currentContent = editorState.getCurrentContent(),
            currentSelection = editorState.getSelection();
        const newContent = Modifier.replaceText(
            currentContent,
            currentSelection,
            characterToInsert
        );
        const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
        return newEditorState;
    }

    useEffect(() => {
        if (resetView.isResetView) {
            const editor = EditorState.push(editorState, ContentState.createFromText(''));
            onChange(editor)
            // // setMentionPlugin(createMentionPluginData())
            resetView.setResetView(false)
        }
    }, [resetView])


    const onSearchChange = ({ value }) => {
        // setState({ ...state, suggestions: defaultSuggestionsFilter(value, mentions) });
        setState({ ...state, suggestions: hepler.filterMentionsWithValue(mentions, value) });
    };

    const keyBindingFn = () => (event) => {
        if ((event.keyCode == 13 && !event.ctrlKey && !event.altKey && !event.shiftKey)) {
            return 'enter_command'
        }
        return getDefaultKeyBinding(event);
    };
    const handleKeyCommand = (command, editorState) => {
        if (command == 'enter_command') {
            onPressEnter && onPressEnter(editorState)
            return 'handled'
        }
        return 'not-handled';
    }
    const onChange = (editor) => {
        onChangeKey && onChangeKey()
        onChangeEditor && onChangeEditor(editor)
        const currentContentTextLength = editorState.getCurrentContent().getPlainText().length;
        const newContentTextLength = editor.getCurrentContent().getPlainText().length;
        if (currentContentTextLength == 0 && newContentTextLength >= 1) {
            setEditorState(EditorState.moveFocusToEnd(editor));
        } else {
            setEditorState(editor);
        }
    }
    const [stateKeyBinding, setStateKeyBinding] = useState(keyBindingFn);

    const removeBinding = () => {
        setStateKeyBinding()
    }
    const applyBinding = () => {
        setStateKeyBinding(keyBindingFn)
    }

    const handlePastedText = (text, html) => {
        const newContent = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            text
        );
        onChange(EditorState.push(
            editorState,
            newContent,
            'insert-characters'
        ));
        return true;
    }
    return (
        <div className="form-editor">
            <Editor
                ref={editorRef}
                onFocus={onFocusMessage}
                onBlur={onBlurMessage}
                placeholder={placeholder}
                keyBindingFn={stateKeyBinding}
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={onChange}
                formatPastedText={handlePastedText}
                plugins={[mentionPlugin]}
            />
            <MentionSuggestions
                // style={{ margin: 0, padding: 0, maxHeight: `200px`, overflowY: `auto` }}
                onSearchChange={onSearchChange}
                suggestions={state.suggestions}
                spellCheck={true}
                onOpen={removeBinding}
                onClose={applyBinding}
            />
        </div>
    )
}
export default TextInputMessage