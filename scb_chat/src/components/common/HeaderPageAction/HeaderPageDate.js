import React from 'react';

const HeaderPageDate = ({translate}) => {
    return (
        <div class="header-page__date-filter">
            <div class="date">
                <a href="#">{`${translate('day')}`}</a>
            </div>
            <div class="date">
                <a href="#">{`${translate('month')}`}</a>
            </div>
            <div class="date active">
                <a href="#">{`${translate('year')}`}</a>
            </div>
        </div>
    )
}
export default HeaderPageDate;