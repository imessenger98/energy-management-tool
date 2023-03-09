/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Input,
  Space,
  Tooltip,
  message,
} from 'antd';
import {
  InfoCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import validator from 'validator';
import sha256 from 'crypto-js/sha256';
import styles from './signin.module.css';
import { signIN, setAuthData } from '../../features/auth/action';

function SignInGroup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem('user'));
  const { isDataLoading, isLoggedIn } = auth;
  const handleSubmit = () => {
    if (!userName || !password) {
      message.error('Customer ID and Password cannot be empty');
      return;
    }
    if (!validator.isEmail(userName)) {
      message.error('please input a valid Customer ID');
      return;
    }
    if (password.length < 8) {
      message.error(`
      password conditions:
       minimum password length is 8,
       should contain a special character,
       should contain a small letter.
      `);
      return;
    }
    const passwordHash = sha256(password).toString().toUpperCase();
    dispatch(signIN(userName, passwordHash, navigate));
  };
  useEffect(() => {
    dispatch(setAuthData('isDataLoading', false));
    if (user && isLoggedIn) navigate('/dashboard');
  }, []);

  useEffect(() => {
    if (user && isLoggedIn) navigate('/dashboard');
  }, [user, isLoggedIn]);
  return (
    <>
      <h1 className={styles.h1heading}>Welcome Back!</h1>
      <h3 className={styles.h1}>Sign In to your Account</h3>
      <Space direction="vertical" size="middle">
        <Input
          name="userName"
          size="large"
          autoFocus
          allowClear
          value={userName}
          placeholder="Input Email"
          disabled={isDataLoading}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={(
            <Tooltip title="Input Email">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
              )}
          onChange={(event) => setUserName(event.target.value)}
        />
        <Space direction="horizontal">
          <Input.Password
            size="large"
            name="password"
            value={password}
            allowClear
            placeholder="input password"
            disabled={isDataLoading}
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            style={{
              width: 80,
            }}
            onClick={() => setPasswordVisible((prevState) => !prevState)}
          >
            {passwordVisible ? 'Hide' : 'Show'}
          </Button>
        </Space>
        <Button
          type="primary"
          size="middle"
          block
          onClick={handleSubmit}
          loading={isDataLoading}
          disabled={isDataLoading}
        >
          Login
        </Button>
        <p>
          Don&apos;t have an Account?
          <Link to="/sign-up">
            <span> Create An Account</span>
          </Link>
        </p>
      </Space>
    </>
  );
}

export default SignInGroup;
