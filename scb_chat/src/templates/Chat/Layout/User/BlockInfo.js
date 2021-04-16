import React, { useState, useEffect } from 'react';
import {Form} from 'antd';
import Input from 'components/base/Input/Input';
import {staffAction} from 'store/action';
import {
    formatProfile, formatProfileUpdateParams
} from './Mapping/ProfileDetailMapping';
import {RULES} from "contant";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

const FormItem = Form.Item;

const BlockInfo = (props) => {
    const {t: translate} = useTranslation()
    const { infoDetail } = props;
    const defaultDisable = true;
    const [formProfile] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        formProfile.setFieldsValue({
            ...formatProfile(infoDetail)
        })
    }, [infoDetail])

    const onFinish = (values) => {
        const updateData = formatProfileUpdateParams(values);
        dispatch(staffAction.updateStaffProfile(updateData));
    }

    const onSave = () => {
        formProfile.submit();
    }
    const onCancel = () => {
        formProfile.resetFields();
    }

    return (
        <>
            <div className="col-lg-9 d-flex flex-column">
                <div className="card h-100">
                    <Form
                        form={formProfile}
                        onFinish={onFinish}
                    >
                        <div className="title__card">{translate('info')}</div>
                        <div className="group mb-2">
                            <label className="label" style={{marginBottom: 0, color: "#666b77"}}>{translate('username')}</label>
                            <FormItem name='username'>
                                <Input disabled={defaultDisable}/>
                            </FormItem>
                        </div>
                        <div className="group mb-2">
                            <label className="label" style={{marginBottom: 0, color: "#666b77"}}>Email</label>
                            <FormItem name='email'>
                                <Input disabled={defaultDisable}/>
                            </FormItem>
                        </div>
                        <div className="group mb-2">
                            <label className="label" style={{marginBottom: 0, color: "#666b77"}}>{translate('name')}</label>
                            <FormItem name='fullName' rules={RULES.text.form()}>
                                <Input />
                            </FormItem>
                        </div>
                        <div className="group mb-2">
                            <label className="label" style={{marginBottom: 0, color: "#666b77"}}>{translate('phone')}</label>
                            <FormItem name='mobile' >
                                <Input type='number' />
                            </FormItem>
                        </div>

                    </Form>
                </div>
            </div>
            <div className="footer-action-btn" style={{marginLeft: 'auto'}}>
                <button className="btn btn-blue" onClick={onSave}>{translate('save')}</button>
                <button className="btn btn-red-bd-none" onClick={onCancel}>{translate('cancel')}</button>
            </div>
        </>
    )
}
export default BlockInfo;