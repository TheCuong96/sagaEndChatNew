import { InputDatePicker } from 'components/base';
import React from 'react';

const HeaderPageDateDouble = ({ translate , setDateHistory ,onChange} ) => {
    return (
        <div className="header-page__action-blue date-double ">
            <div className="text">{`${translate('day')}`} :</div>
            <div className="cus-date-picker d-flex ">
                <InputDatePicker setDateHistory={ setDateHistory }  onChange ={ onChange}/> 
            </div>
        </div>
    )
}
export default HeaderPageDateDouble;