import ButtonSwitch from 'components/base/Button/ButtonSwitch';
import Table from 'components/base/Table/Table';

import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';


const TableProject = ({dataSource, translate,setToggle,setProjectUpdate}) => {

    const [edit, setEdit] = useState(false);
    const showAction = (id) => {
        console.log({ id });
        setEdit(id);
    }
    const adjustProject = ( project ) =>{
        setProjectUpdate((pre) => {return [...pre,project]})
        setToggle(pre =>!pre)

    }
    const columns = [
        {
            title: translate('STT'),
            render: (_text, _record, index) => index + 1,
            width: "70px",
        },
        {

            title: translate('project_name'),
            dataIndex: 'projectName',
            key: 'projectName',
            width: '10%',
            ellipsis: true,
        },
        {

            title: translate('project_type'),
            dataIndex: 'projectType',
            key: 'visitor',
            width: '10%',
            ellipsis: true,
        },
        {

            title: translate('project_role'),
            dataIndex: 'projectRole',
            key: 'projectRole',
            width: '5%',
            ellipsis: true,
        },
        {
            title: translate('Status'),
            dataIndex: 'projectStatus',
            key: 'projectStatus',
            width: '17%',
            ellipsis: true,
            render: () => <ButtonSwitch />
        },
        {
            title: () => <i className="fas fa-cog pr-2"></i>,
            key: 'project',
            dataIndex: 'project',
            width: '10%',
            ellipsis: true,
            render: (text, record) =>
                <Dropdown
                    overlay={
                        <>
                            <Menu className="dropdown-menu show" style={{ boxShadow: '0 2px 6px 0 rgb(0 0 0 / 20%)' }}>
                                <Menu.Item className="dropdown-item" onClick={()=>adjustProject(record)}>
                                    {translate('add_file')}
                                </Menu.Item>
                                <Menu.Item className="dropdown-item del">
                                    {translate('delete')}
                                </Menu.Item>
                            </Menu>
                        </>
                    }
                    overlayClassName="blueDropdown"
                    trigger={['click']}
                >
                    <span>
                        <i class="icon-dots las la-ellipsis-h"></i>
                    </span>
                </Dropdown>
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={dataSource} />
    )
}
export default TableProject;