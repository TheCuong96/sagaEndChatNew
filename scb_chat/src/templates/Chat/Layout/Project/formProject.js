import React, { useEffect } from "react";
import { optionProject } from "contant";
import { Form, Input, Select, Button } from "antd";
import { useHistory, useLocation } from "react-router";
import { monitoringAction, projectAction } from "store/action";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const FormNewOrUpdateProject = ({ setdataNewProject }) => {
  const [formSearch] = Form.useForm();
  const dispatch = useDispatch()
  const onFinish = (values) => {

   dispatch(projectAction.createNewProject({values}))  
   formSearch.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log({ formSearch });
  return (
    <div className="card">
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={formSearch}
        name="formcreate"
      >
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6 col-sx-12">
            <Form.Item
              name="project_name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên dự án!",
                },
              ]}
            >
              <div className="custom_select">
                <div>Tên dự án :</div>
                <Input />
              </div>
            </Form.Item>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-sx-12">
            <Form.Item 
                  >
              <div className="custom_select">
                <div>Loại dự án :</div>
                <Form.Item name="project_type"
                  noStyle
                  rules={[{ required: true, message: 'Vui lòng chọn loại!' }]}>
                <Select >
                  <Select.Option value="1">-All-</Select.Option>
                  <Select.Option value="2">Website</Select.Option>
                  <Select.Option value="3">Mobile</Select.Option>
                </Select>
                </Form.Item>
              </div>
            </Form.Item>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-sx-12">
            <Form.Item
              name="project_url"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập url!",
                },
              ]}
            >
              <div className="custom_select">
                <div>Url :</div>
                <Input />
              </div>
            </Form.Item>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-sx-12">
            <Form.Item >
              <div className="custom_select">
                <div>Trạng thái:</div>
                <Form.Item 
                  name="active_flag"
                  oStyle
                  rules={[{ required: true, message: 'Chưa cập nhật trạng thái' }]}>
                <Select>
                  <Select.Option value={true}>Hoạt động</Select.Option>
                  <Select.Option value={false}>Ngưng hoạt động</Select.Option>
                </Select>
                </Form.Item>
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default FormNewOrUpdateProject;
