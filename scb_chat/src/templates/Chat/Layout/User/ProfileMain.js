import React, {useEffect} from 'react';
import BlockAvatar from './BlockAvatar';
import BlockInfo from './BlockInfo';
import StaticLoading from 'components/common/Loading/StaticLoading';
import {useDispatch, useSelector} from "react-redux";
import {staffAction} from "store/action";


const ProfileMain = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(staffAction.loadStaffProfile());
    }, []);
    const staffProfile = useSelector((state) => state.staffReducer.staffProfile);
    return (
        <>
            {staffProfile.isFetching ?
                <StaticLoading/>
                :
                <div className="row">
                    <BlockAvatar url={staffProfile.data.avatar_url} />
                    <BlockInfo infoDetail={staffProfile.data}/>
                </div>
            }
        </>
    )
}

export default ProfileMain