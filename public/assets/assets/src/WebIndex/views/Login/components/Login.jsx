import React, { Component } from 'react';
import '../css/login.scss';

class Login extends Component {
    render() {
        return(
            <div className="main">
                <div className="welcome">
                    <span>welcome</span>
                </div>
                <div className="login">
                    <input
                        className="inputInfor"
                    />
                    <input
                        className="inputInfor"
                    />
                    <div className="vertifyCode">
                        <span className="vertifyCodeLeft">验证码</span>
                        <div className="vetifyCodeRight">
                            sxsf
                        </div>
                    </div>
                    <input type="button" value="登录" className="loginBtn" />
                </div>
            </div>
        );
    }
}

export default Login;