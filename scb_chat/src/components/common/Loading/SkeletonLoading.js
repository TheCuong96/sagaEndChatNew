import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonLoading = (props) => {
    const { items } = props

    return (
        <SkeletonTheme color="#ddd">
            <div style={{ height: '100px', width: '100%', backgroundColor: '#ddd' }}></div>
            <Skeleton count={3} className="mt-2" />
        </SkeletonTheme>
    )
}

export default SkeletonLoading