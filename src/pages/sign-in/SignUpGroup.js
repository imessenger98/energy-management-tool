/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Input,
  Space,
  message,
  Select,
  Tooltip,
} from 'antd';
import validator from 'validator';
import sha256 from 'crypto-js/sha256';
import {
  QrcodeOutlined,
} from '@ant-design/icons';
import styles from './signin.module.css';
import { setAuthData, register } from '../../features/auth/action';
import dropDownOptions from './singUpOptions';
import QRCode from './qrCode';

function SignUpGroup() {
  const { TextArea } = Input;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [evcCodes, setEVCCode] = useState('');
  const [bedRooms, setBedRooms] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { isDataLoading } = auth;
  const handleSubmit = () => {
    if (!userName || !password || !address || !propertyType || !evcCodes || !bedRooms) {
      message.error('Fields cannot be empty');
      return;
    }
    if (!validator.isEmail(userName)) {
      message.error('please input a valid Customer ID');
      return;
    }
    if (isNaN(bedRooms)) {
      message.error('bedRooms Should be a Number');
      return;
    }
    if (evcCodes?.length !== 8) {
      message.error('Invalid Energy Voucher Code(EVC)');
      return;
    }
    if (password.length < 8) {
      message.error(`
      password conditions:
       minimum password length is 8,
       should contain a special character,
       should contain a small letter
      `);
      return;
    }
    const passwordHash = sha256(password).toString()?.toUpperCase();
    dispatch(register({
      userName, passwordHash, address, propertyType, evcCodes, bedRooms, navigate,
    }));
  };

  useEffect(() => {
    dispatch(setAuthData('isDataLoading', false));
  }, []);
  const handleQR = () => {
    setModalOpen(true);
  };
  return (
    <>
      <h1 className={styles.h1heading}>Hello There !</h1>
      <h3 className={styles.h1}>Create An Account</h3>
      <Space direction="vertical" size="middle">
        <Input
          name="userName"
          size="middle"
          autoFocus
          allowClear
          value={userName}
          placeholder="Input Email"
          disabled={isDataLoading}
          onChange={(event) => setUserName(event.target.value)}
        />
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Select
            allowClear
            size="middle"
            style={{ width: '100%' }}
            placeholder="Choose Property Type"
            onChange={(property) => setPropertyType(property)}
            options={dropDownOptions}
          />
        </Space>
        <Input
          name="bedRooms"
          size="middle"
          autoFocus
          allowClear
          value={bedRooms}
          placeholder="Input Number of Bed Rooms"
          disabled={isDataLoading}
          onChange={(event) => setBedRooms(event.target.value)}
        />
        <Input
          size="middle"
          name="EVCCode"
          value={evcCodes}
          style={{ width: '100%' }}
          allowClear
          placeholder="Input Energy Voucher Code"
          disabled={isDataLoading}
          onChange={(event) => setEVCCode(event?.target?.value?.toUpperCase() || '')}
          suffix={(
            <Tooltip title="Scan QR Code">
              <Button
                icon={<QrcodeOutlined />}
                onClick={handleQR}
              />
            </Tooltip>
              )}
        />
        <Space direction="horizontal">
          <Input.Password
            size="middle"
            name="password"
            value={password}
            allowClear
            placeholder="Input Password"
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
        <TextArea
          name="address"
          size="middle"
          autoFocus
          allowClear
          value={address}
          placeholder="Input Address"
          disabled={isDataLoading}
          onChange={(event) => setAddress(event.target.value)}
        />
        <Button
          type="primary"
          size="middle"
          block
          onClick={handleSubmit}
          loading={isDataLoading}
          disabled={isDataLoading
            || !userName
            || !password
            || !address
            || !propertyType
            || !evcCodes
            || !bedRooms}
        >
          Register
        </Button>
        <p>
          Already have an Account?
          <Link to="/">
            <span> Sign In</span>
          </Link>
        </p>
      </Space>
      <QRCode
        setEVCCode={setEVCCode}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  );
}

export default SignUpGroup;
