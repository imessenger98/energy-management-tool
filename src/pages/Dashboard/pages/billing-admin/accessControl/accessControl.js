/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react';
import {
  Card,
  Input,
  Col,
  Row,
  Button,
  message,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import style from './accessControl.module.css';
import { setAuthData, getCostControl, updateCostControl } from '../../../../../features/auth';

function AccessControl() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    electricityDay, standingCharge, gasCost, electricityNight, isDataLoading,
  } = auth;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setAuthData(name, value));
  };

  const handleSubmit = () => {
    if (!electricityDay || !electricityNight || !gasCost || !standingCharge) {
      message.error('Fields cannot be empty');
      return;
    }
    // Check if the fields are numbers
    if (isNaN(electricityDay)
    || isNaN(electricityNight)
    || isNaN(gasCost)
    || isNaN(standingCharge)) {
      message.error('Fields must be numbers');
      return;
    }
    dispatch(updateCostControl(electricityDay, electricityNight, gasCost, standingCharge));
  };

  useEffect(() => {
    dispatch(getCostControl());
  }, []);
  return (
    <div className={style.parent}>
      <Card
        span={24}
        title="Cost Control"
        bordered
        loading={isDataLoading}
      >
        <Row gutter={[16, 16]}>
          <Col className={style.textAlign} span={6} xs={24} md={6}>
            <p>Standing Charge</p>
            <Input
              name="standingCharge"
              value={standingCharge}
              addonBefore="£"
              addonAfter=" Day"
              onChange={handleChange}
              disabled={isDataLoading}
            />
          </Col>
          <Col className={style.textAlign} span={6} xs={24} md={6}>
            <p>Electricity Day</p>
            <Input
              name="electricityDay"
              value={electricityDay}
              addonBefore="£"
              addonAfter="KWh"
              onChange={handleChange}
              disabled={isDataLoading}
            />
          </Col>
          <Col className={style.textAlign} span={6} xs={24} md={6}>
            <p>Electricity Night</p>
            <Input
              name="electricityNight"
              value={electricityNight}
              addonBefore="£"
              addonAfter="KWh"
              onChange={handleChange}
              disabled={isDataLoading}
            />
          </Col>
          <Col className={style.textAlign} span={6} xs={24} md={6}>
            <p>Gas </p>
            <Input
              name="gasCost"
              value={gasCost}
              addonBefore="£"
              addonAfter="KWh"
              onChange={handleChange}
              disabled={isDataLoading}
            />
          </Col>
        </Row>
        <Button
          className={style.submitButton}
          type="primary"
          size="middle"
          loading={isDataLoading}
          onClick={handleSubmit}
          disabled={isDataLoading}
        >
          Submit
        </Button>
      </Card>
    </div>
  );
}

export default AccessControl;
