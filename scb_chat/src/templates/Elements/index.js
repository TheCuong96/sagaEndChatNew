import ButtonSwitch from 'components/base/Button/ButtonSwitch';
import React from 'react';
import ChartColumn from 'components/common/Chart/ChartColumn';
import ChartLine from 'components/common/Chart/ChartLine';

const index = () => {
    return (
        <div className="row">
            <div className="col-6">
                <h3>ButtonSwitch</h3>
                <ButtonSwitch />
            </div>
            <div className="col-6">
                <h3>Chart Column</h3>
                <ChartColumn />
            </div>
            <div className="col-6">
                <h3>Chart Line</h3>
                <ChartLine />
            </div>
        </div>
    )
}
export default index;