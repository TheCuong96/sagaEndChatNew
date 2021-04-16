import React, { useState, useEffect } from 'react'

const ConversationCategory = props => {
    const { selectTab, onChangeSelectTab } = props
    const [tabs, setTab] = useState(
        [{
            label: 'fas fa-comment-alt',
            active: true
        },
        {
            label: 'fas fa-image'
        },
        {
            label: 'fas fa-address-book'
        }]
    )

    useEffect(() => {
        if (selectTab && tabs) {
            let currentTabs = [].concat(tabs)
            for (var i = 0; i < currentTabs.length; i++) {
                currentTabs[i].active = false
            }
            currentTabs[selectTab - 1].active = true
            setTab(currentTabs)
        }
    }, [selectTab])

    return (
        <ul className="conversation__categories">
            {
                tabs && tabs.map((item, index) =>
                    <li className={`icon${item.active ? " active" : ""}`} key={index} onClick={() => onChangeSelectTab({ selectTab: index + 1 })}>
                        <i className={item.label} />
                    </li>
                )
            }
        </ul >
    )
}
export default React.memo(ConversationCategory)