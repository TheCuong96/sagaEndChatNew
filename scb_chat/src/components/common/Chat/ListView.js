import React, { useState, useEffect, useRef } from "react";
import { List, AutoSizer, InfiniteLoader, CellMeasurerCache, CellMeasurer, WindowScroller, ScrollSync } from "react-virtualized";

const ListView = (props) => {
    //rowRenderView return component 
    const { items, isReverse, isTop, scrollIndex, rowRenderView, loadMore, setCurrentIndex, isMutilLoad, getRowHeight, clearAll } = props
    const [firstInit, setFirstInit] = useState(true)
    const [cache] = useState(new CellMeasurerCache({
        fixedWidth: true,
        // keyMapper: index => items[index]
    }));
    const [mIndex, setIndex] = useState(0)
    const [isCrollTop, setScrollTop] = useState(false)
    const refList = useRef()
    const infiniteList = useRef()
    const loadMoreRows = ({ startIndex, stopIndex }) => {
        loadMore && loadMore(startIndex, stopIndex)
    }

    useEffect(() => {
        if (clearAll && clearAll.isClear) {
            cache.clearAll()
            setFirstInit(true)
            clearAll.resetClear()
            scrollIndex.updateScrollMessage(-1)
        }
    }, [clearAll])

    useEffect(() => {
        cache.clearAll();
    }, [items])

    useEffect(() => {
        if (!scrollIndex.indexScrollMessage) {
            setFirstInit(true)
        }
        else if (scrollIndex?.indexScrollMessage > -1) {
            refList.current && refList.current.scrollToRow(scrollIndex.indexScrollMessage)
            scrollIndex.updateScrollMessage(-1)
        }
    }, [scrollIndex])


    const _rowRenderer = ({ index, parent, key, style }) => {
        return rowRenderView && <CellMeasurer
            cache={cache}
            columnIndex={0}
            key={key}
            rowIndex={index}
            parent={parent}>
            {({ measure }) => (
                rowRenderView && rowRenderView(index, key, style, measure)
            )}
        </CellMeasurer>
    }


    const _isRowLoaded = ({ index }) => {
        if (mIndex > index) {
            setScrollTop(true)
        } else {
            setScrollTop(false)
        }
        setIndex(index)
        if (isMutilLoad ? ((index > 0) && (index < items.length - 1)) : (isReverse ? (index > 0) : (index < items.length - 1))) {
            setCurrentIndex && setCurrentIndex(index)
            return true
        }
        // dùng cho khi init data lần đầu tiên không bị loadmore của isReverse
        if ((isMutilLoad ? ((index === 0) || (index === items.length - 1)) : isReverse && index === 0) && firstInit) {
            if (scrollIndex.indexScrollMessage != null) {
                setFirstInit(false)
                if (isTop) {
                    setScrollTop(true)
                } else {
                    refList.current && refList.current.scrollToRow(items.length)
                }
            }
            return true
        }
        if (isMutilLoad && ((isCrollTop && index > 0) || (!isCrollTop && index < items.length - 1))) {
            return true
        }
        return false
    }


    let timeOut, index = 0
    const onScroll = (e) => {

        // setScrollRow(els => {
        //     if (els < 8) {
        //         index = els
        //         let doc = document.getElementsByClassName("ReactVirtualized__Grid__innerScrollContainer");
        //         if (doc.length > 1) {
        //             index = index + 1
        //             if (timeOut) clearInterval(timeOut)
        //             timeOut = setInterval(() => {
        //                 if (index < 8) {
        //                     index = index + 1
        //                     let els = doc[doc.length - 1];
        //                     els.parentElement.scrollTo(0, els.scrollHeight)
        //                 }
        //                 else {
        //                     clearInterval(timeOut)
        //                 }
        //             }, 500);
        //             // clearInterval(timeOut)
        //         }
        //         return index
        //     }
        //     return els
        // })

    }

    return (
        <InfiniteLoader
            ref={infiniteList}
            isRowLoaded={_isRowLoaded}
            threshold={0.4}//khoảng cách để gọi thêm data
            loadMoreRows={loadMoreRows}
            rowCount={items.length} >
            {({ onRowsRendered, registerChild }) => {
                return (
                    <AutoSizer >
                        {({ width, height }) => (
                            <List
                                ref={refList}
                                onRowsRendered={onRowsRendered}
                                width={width}
                                height={height}
                                className="listView"
                                deferredMeasurementCache={cache}
                                scrollToRow={items.length}
                                rowHeight={cache.rowHeight}
                                scrollToAlignment="end"
                                estimatedRowSize={4}
                                overscanRowCount={3}
                                rowCount={items.length}
                                rowRenderer={_rowRenderer}
                                onScroll={onScroll}
                            />
                        )}
                    </AutoSizer>
                )
            }

            }
        </InfiniteLoader>
    )
}
export default ListView