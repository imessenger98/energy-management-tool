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
import { setAuthData, addEVCCode } from '../../../../../features/auth';

function EVCModal() {
  const [charge, setCharge] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isEVCModalOpen } = auth;

  const modalClick = () => {
    dispatch(setAuthData('isEVCModalOpen', !isEVCModalOpen));
  };

  const onSubmit = () => {
    if (!charge || !price) {
      message.error('Fields cannot be empty');
      return;
    }

    if (isNaN(price)) {
      message.error('price value should be a number');
      return;
    }
    if (charge?.length !== 8) {
      message.error('Energy Voucher Code(EVC) is an 8 digit code');
      return;
    }
    dispatch(addEVCCode(charge, price));
  };
  useEffect(() => {
    setCharge('');
    setPrice('');
  }, [isEVCModalOpen]);

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
          value={charge}
          onChange={(event) => setCharge(event.target.value?.toUpperCase())}
        />
        <Space direction="horizontal">
          <Input
            name="Price"
            allowClear
            placeholder="Input Price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            addonBefore="£"
          />
        </Space>
      </Space>
      <Row style={{ paddingTop: '15px' }}>
        <Button
          type="primary"
          size="middle"
          onClick={onSubmit}
          disabled={!charge || !price}
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

export default EVCModal;
