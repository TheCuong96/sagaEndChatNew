import ButtonSwitch from 'components/base/Button/ButtonSwitch';
import Table from 'components/base/Table/Table';
import React, { useState } from 'react';
import { Dropdown, Menu , Modal , Button } from 'antd';
import AddMemberProject from './AddMember';


const TableMenber = ({dataSource, translate}) => {

    const [edit, setEdit] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const showAction = (id) => {
        console.log({ id });
        setEdit(id);
    }
    const columns = [
        {
            title: translate('STT'),
            render: (_text, _record, index) => index + 1,
            width: "70px",
        },
        {

            title: 'Tên thành viên',
            dataIndex: 'projectName',
            key: 'projectName',
            width: '10%',
            ellipsis: true,
        },
        {

            title: 'Vai trò',
            dataIndex: 'projectType',
            key: 'visitor',
            width: '10%',
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
            <i
            className="fas fa-trash-alt table-icon"
          ></i>
        },
    ];
    return (
        <div className="card">
            <div class="title__card">
            <span class="text">Danh sách thành viên</span>
                    <div class="title__action-button">
                    <button
                        type="button"
                        class="btn btn-light-blue"
                        data-toggle="modal"
                        data-target="#modalAdd"
                        style={{minWidth: "110px"}}
                        onClick={showModal}
                    >
                        <i class="fas fa-user-plus btn-icon"></i>Thêm thành viên
                    </button>
                    <button
                        type="button"
                        class="btn btn-light-blue"
                        data-toggle="modal"
                        data-target="#modalInvite"
                        onClick={showModal}
                    >
                        <i class="fas fa-user-friends btn-icon"></i>Mời thành viên
                    </button>                 
                    </div>
            </div>
            <Modal 
                title="Thêm thành viên" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
                >
                <AddMemberProject />
            </Modal>
            <Table
                columns={columns}
                dataSource={dataSource} />
        </div>
    )
}
export default TableMenber;