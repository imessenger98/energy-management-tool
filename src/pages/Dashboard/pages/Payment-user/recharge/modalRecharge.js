/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Space,
  Row,
  message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthData, recharge } from '../../../../../features/auth';

function RechargeModal() {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isRechargeModalOpen } = auth;

  const modalClick = () => {
    dispatch(setAuthData('isRechargeModalOpen', !isRechargeModalOpen));
  };

  const onSubmit = () => {
    if (!code) {
      message.error('Fields cannot be empty');
      return;
    }
    if (code?.length !== 8) {
      message.error('Energy Voucher Code(EVC) is an 8 digit code');
      return;
    }
    dispatch(recharge(code));
  };
  useEffect(() => {
    setCode('');
  }, [isRechargeModalOpen]);

  return (
    <div style={{
      paddingLeft: '20px',
      paddingRight: '20px',
      margin: '10px',
      paddingBottom: '10px',
      paddingTop: '10px',
    }}
    >
      <Space direction="vertical" size="middle">
        <Input
          name="evcCode"
          allowClear
          placeholder="Input Voucher Code"
          value={code}
          onChange={(event) => setCode(event.target.value?.toUpperCase())}
        />
      </Space>
      <Row style={{ paddingTop: '15px' }}>
        <Button
          type="primary"
          size="middle"
          onClick={onSubmit}
          disabled={!code}
        >
          Submit
        </Button>
        <Button
          style={{ marginLeft: '5px' }}
          size="middle"
          onClick={modalClick}
        >
          cancel
        </Button>
      </Row>
    </div>
  );
}

export default RechargeModal;
