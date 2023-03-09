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
import { setAuthData, addUsage } from '../../../../../features/auth';

function AddBIllModal() {
  const [eday, setEday] = useState();
  const [eNight, setENight] = useState();
  const [gas, setGas] = useState();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAddBillModalOpen } = auth;

  const modalClick = () => {
    dispatch(setAuthData('isAddBillModalOpen', !isAddBillModalOpen));
  };

  const onSubmit = () => {
    if (!eday || !eNight || !gas) {
      message.error('Fields cannot be empty');
      return;
    }

    if (isNaN(eday) || isNaN(eNight) || isNaN(gas)) {
      message.error('Fields should be a number');
      return;
    }
    dispatch(addUsage(eday, eNight, gas));
  };
  useEffect(() => {
    setEday('');
    setENight('');
    setGas('');
  }, [isAddBillModalOpen]);

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
          name="EDay"
          allowClear
          placeholder="Electricity Day Usage"
          value={eday}
          onChange={(event) => setEday(event.target.value)}
        />
        <Space direction="horizontal">
          <Input
            name="ENight"
            allowClear
            placeholder="Electricity Night Usage"
            value={eNight}
            onChange={(event) => setENight(event.target.value)}
          />
        </Space>
        <Space direction="horizontal">
          <Input
            name="gas"
            allowClear
            placeholder="Gas Usage"
            value={gas}
            onChange={(event) => setGas(event.target.value)}
          />
        </Space>
      </Space>
      <Row style={{ paddingTop: '15px' }}>
        <Button
          type="primary"
          size="middle"
          onClick={onSubmit}
          disabled={!gas || !eNight || !eday}
        >
          Generate Bill
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

export default AddBIllModal;
