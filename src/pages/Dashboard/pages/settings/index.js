/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Card,
  Col,
  Row,
  Button,
  Input,
  Space,
  message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import sha256 from 'crypto-js/sha256';
import styles from './settings.module.css';
import { changePassword, setAuthData } from '../../../../features/auth';

export default function Settings() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isDataLoading } = auth;
  const handleSubmit = () => {
    if (!oldPassword || !newPassword) {
      message.error('Fields cannot be empty');
      return;
    }
    const oldPasswordHash = sha256(oldPassword).toString().toUpperCase();
    const newPasswordHash = sha256(newPassword).toString().toUpperCase();
    dispatch(changePassword(oldPasswordHash, newPasswordHash));
    // TODO:dispatch api call
  };

  const handleReset = () => {
    setOldPassword('');
    setNewPassword('');
  };
  useEffect(() => {
    dispatch(setAuthData('isDataLoading', false));
  }, []);
  return (
    <div className={styles.parent}>
      <h1 className={styles.addPadding}>Settings</h1>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title="Change Password"
            bordered
          >
            <Space direction="vertical" size="small">
              <Space direction="horizontal">
                <p>Old Password &nbsp;</p>
                <Input.Password
                  size="middle"
                  name="oldPassword"
                  value={oldPassword}
                  allowClear
                  placeholder="Old Password"
                  disabled={isDataLoading}
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                  onChange={(event) => setOldPassword(event.target.value)}
                />
              </Space>
              <Space direction="horizontal">
                <p>New Password</p>
                <Input.Password
                  size="middle"
                  name="newPassword"
                  value={newPassword}
                  allowClear
                  placeholder="New Password"
                  disabled={isDataLoading}
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
              </Space>
              <Space direction="horizontal" size="small">
                <Button
                  type="primary"
                  size="middle"
                  onClick={handleSubmit}
                  loading={isDataLoading}
                  disabled={isDataLoading}
                >
                  submit
                </Button>
                <Button
                  size="middle"
                  onClick={handleReset}
                  loading={isDataLoading}
                  disabled={isDataLoading}
                >
                  reset
                </Button>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
