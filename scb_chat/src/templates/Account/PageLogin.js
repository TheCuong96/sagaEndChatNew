import Input from 'components/base/Input/Input';
import InputPassword from 'components/common/Input/InputPassword';
import {NOTIFICATION_TYPE} from 'contant';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import Logo from '../../../public/images/logo-bg.png';
import {showNotification} from "functions/Utils";
import {Form} from "antd";
import StaticLoading from "components/common/Loading/StaticLoading";
import {accountAction} from "store/action";

const PageLogin = () => {
    const {t: translate} = useTranslation()
    const dispatch = useDispatch();
    const onFinish = (values) => {
        const {username, password} = values;
        dispatch(accountAction.loadLogin({username: username, password: password}))
    }
    const dataLogin = useSelector(state => state.accountReducer);
    let {error, isFetching} = dataLogin;
    const [formContact] = Form.useForm();

    useEffect(() => {
        console.log('errorTemplate', error);
        if (error) {
            showNotification({type: NOTIFICATION_TYPE.error, title: 'Error', message: error})
        }
    }, [error])

    const onToggle = () => {
        formContact.submit()
    }
    const onFinishFailed = (errors) => {
        // console.log('errors', errors)
    }
    return (
        <div className="login t_login">
            <div className="login__bg">
                <img className="logo" src={Logo}/>
            </div>
            <div className="login__right">
                <div className="login__form">
                    <div className="title">{`${translate("login")}`}</div>
                    {error &&
                        <div class="form-group">
                            <div class="alert alert-danger " role="alert">{error}</div>
                        </div>
                    }
                    {isFetching && <StaticLoading/>}
                    <Form
                        name="basic"
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        form={formContact}
                    >
                        <div className="cus-input">
                            <div className="form-group">
                                <label className="label">Email</label>
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: translate('login_input_username_placeholder'),
                                        },
                                    ]}
                                >
                                    <Input placeholder="Email"/>
                                </Form.Item>
                                <small className="mess-error text-danger">Email của bạn không đúng. Vui lòng thử lại !</small>
                            </div>
                        </div>
                        <div className="cus-input">
                            <div className="form-group">
                                <label className="label">{`${translate("login_input_password")}`}</label>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: translate('login_input_password_placeholder'),
                                        },
                                    ]}
                                >
                                    <InputPassword placeholder={`${translate("login_input_password")}`}/>
                                </Form.Item>
                                <small className="mess-error text-danger">Mật khẩu của bạn không đúng. Vui lòng thử lại !</small>
                            </div>
                        </div>
                    </Form>

                    <Form.Item>

                        <button type="submit" className="btn btn-blue" onClick={onToggle}>{`${translate("login")}`}</button>
                    </Form.Item>

                </div>
            </div>
        </div>
    )
}
export default PageLogin;