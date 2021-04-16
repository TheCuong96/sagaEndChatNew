import React from 'react';
import { Spin } from "antd"

const SpinLoading = ({ className, spinning, children }) => {
    return (
        <Spin className={className ? className : "loading_full"} spinning={spinning ? true : false}>
            {children}
        </Spin>
    )
}
export default SpinLoading;