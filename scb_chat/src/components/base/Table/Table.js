import React, { useEffect, useState } from 'react';
import { Table as TableAntd } from 'antd';
import PropTypes from 'prop-types';
import { mapModifiers, translate } from 'functions/Utils';
import {useTranslation} from "react-i18next";

const Table = (props) => {
    const {t: translate} = useTranslation()
    const {
        dataSource,
        columns,
        rowClassName,
        classTable,
        modifiers,
        onSelectRow,
        classMinWidth,
        resetCount = 0, // 0, 1, 2 ....
        defaultSelectedFirstRows,
        allowDeselect = true,
        ...remainingProps
    } = props;
    const [selectedRowKeys, setSelectedRowKeys] = useState(defaultSelectedFirstRows ? [0] : []);
    const className = mapModifiers("rc_table mb-3", modifiers);
    const rowSelectType = allowDeselect ? 'checkbox' : 'radio';
    const onSelect = (record, selected, _selectedRows) => {
        onSelectRow(selected ? record : undefined);
    }
    const onChange = (_selectedRowKeys, selectedRows) => {
        if (selectedRows.length) {
            const lastSelected = [...selectedRows].slice(-1)[0];
            setSelectedRowKeys([lastSelected.key]);
        } else {
            setSelectedRowKeys([]);
        }
    }

    useEffect(() => {
        if (!!resetCount) { // Rest if resetCount > 0
            setSelectedRowKeys([]);
        }
    }, [resetCount])

    return (
        <div className={`${className} ${classMinWidth ? classMinWidth : 'min-width-100-pc'}`} >
            <TableAntd
                rowSelection={onSelectRow && {
                    selectedRowKeys,
                    hideSelectAll: true,
                    selections: false,
                    type: rowSelectType,
                    onChange: onChange,
                    onSelect: onSelect,
                }}
                columns={columns}
                dataSource={dataSource}
                className={classTable}
                rowClassName={rowClassName}
                pagination={false}
                // tableLayout={'auto'}
                locale={{
                    emptyText: translate('no_data')
                }}
                {...remainingProps}
            />
        </div >
    );
}

const { string, bool, array } = PropTypes;

Table.propTypes = {
    dataSource: array,
    columns: array,
    modifiers: array,
    bordered: bool,
    rowClassName: string,
    emptyText: string,
}

export default Table;