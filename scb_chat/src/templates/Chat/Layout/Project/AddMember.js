
import React, { useEffect } from "react";
import { optionProject } from "contant";
import { Form, Input, Select } from "antd";
import { useHistory, useLocation } from "react-router";
import { monitoringAction } from "store/action";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
const AddMemberProject = () =>{
    return <div className="card">
    <Form >
      <div className="row">
        <div className="col-12">
          <Form.Item>
            <div className="custom_select" style={{marginBottom: '10px'}}>
              <div>Tên dự án </div>
              <Input />
            </div>
          </Form.Item>
        </div>
        <div className="col-12">
          <Form.Item>
            <div className="custom_select" style={{marginBottom: '10px'}}>
              <div>Loại thành viên </div>
              <Select dropdownStyle={{ backgroundColor: "green" }}>
                <Select.Option value="demo">-All-</Select.Option>
                <Select.Option value="demo">Người quản lý</Select.Option>
                <Select.Option value="demo">Thành viên</Select.Option>
              </Select>
            </div>
          </Form.Item>
        </div>
        <div className="col-12">
          <Form.Item>
            <div className="custom_select" style={{marginBottom: '10px'}}>
              <div>Email </div>
              <Input />
            </div>
          </Form.Item>
        </div>
        <div className="col-12">
          <Form.Item>
              <div className="custom_select" style={{marginBottom: '10px'}}>
              <div>Tên thành viên </div>
              <Input/>
              </div>
          </Form.Item>
          </div>
      </div>
    </Form>
  </div>
}
export default AddMemberProject;