import React, { Component } from 'react';
import '../css/login.scss';
import * as loginAjax from '../ajaxOperation/loginAjax';
import { message, Input, Button } from 'antd';
import cookieUtil from '../../../../lib/cookieUtil';
import jwt from 'jsonwebtoken';

message.config({
    top: 210,
    duration: 0.5,
});

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            captcha: ''
        };
    }
    componentWillMount() {
        if(jwt.decode(cookieUtil.get('token')) !== null) {
            // window.location.href = '/software_training/public/index#/customer';
        }
    }
    changeUsernameValue = (event) => {
        this.setState({
            username:event.target.value
        });
    };
    changePasswordValue = (event) => {
        this.setState({
            password:event.target.value
        });
    };
    changeCaptchaValue = (event) => {
        this.setState({
            captcha:event.target.value
        });
    };
    submitUserInfo = () => {
        const { username, password, captcha } = this.state;
        if(username === '') {
            message.info('用户名不能为空!');
        }else if(password === '') {
            message.info('密码不能为空!');
        }else if(captcha === '') {
            message.info('验证码不能为空!');
        }else {
            loginAjax.login({ username, password, captcha })
                .then((value) => {
                    if(value === 403) {
                        message.info('用户名或密码错误!');
                    }else if(value === 409) {
                        message.info('验证码错误!');
                    }
                    else {
                        message.info('登录成功!', 1);
                        setTimeout(function () {
                            window.location.href = '/software_training/public/index#/customer';
                        }, 2000);
                    }
                });
        }
    };
    fetchCaptcha = () => {
        this.captchaNode.setAttribute('src', "/software_training/public/captcha");
    };
    render() {
        return(
            <div className="main">
                <div className="login">
                    <span className="welcome">welcome</span>
                    <Input
                        className="inputInfor"
                        onChange={this.changeUsernameValue}
                        placeholder="请输入用户名"
                    />
                    <Input
                        className="inputInfor"
                        onChange={this.changePasswordValue}
                        type="password"
                        placeholder="请输入密码"
                    />
                    <div className="vertifyCode">
                        <Input
                            onChange={this.changeCaptchaValue}
                            className="captchaInfor"
                        />
                        <div className="vetifyCodeRight">
                            <img
                                ref={node => (this.captchaNode = node)}
                                src="/software_training/public/captcha"
                                style={{ width: 80, height: 30 }}
                                onClick={() => this.fetchCaptcha()}
                            />
                        </div>
                    </div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="loginBtn"
                        onClick={() => this.submitUserInfo()}>
                        登录
                    </Button>
                </div>
            </div>
        );
    }
}

export default Login;