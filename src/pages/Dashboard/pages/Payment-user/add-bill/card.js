/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Card, Col, Row, Button,
  message,
  Modal,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import styles from './addbill.module.css';
import { payDue } from '../../../../../features/auth';

export default function PaymentCard() {
  const { confirm } = Modal;
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    totalBill, addBillCodes, wallet, isAddBillLoading,
  } = auth;
  const lastBill = addBillCodes;
  const lastAmount = lastBill?.length > 1 ? `Last Bill Amount: ${lastBill[0].amount}` : 'No Payment Required';
  const LastDate = lastBill?.length > 1 ? ` Generated on: ${moment(lastBill[0].date).format('YYYY-MM-DD')}` : null;
  const nextBilling = lastBill?.length > 1 ? moment(lastBill[0].date).add(1, 'months').calendar() : null;
  const nextBIllingDate = lastBill?.length > 1 ? `Next BIlling Date(M/D/Y): ${nextBilling} ` : null;
  const onRechargeClick = () => {
    navigate('/dashboard/payment/recharge');
  };
  const showConfirm = () => {
    confirm({
      title: 'Amount will be Taken from your Wallet. Do you want to continue',
      onOk() {
        dispatch(payDue(totalBill));
      },
    });
  };
  const onPayBIll = () => {
    if (totalBill > wallet) {
      message.error('Insufficient balance. Please recharge your Account');
      return;
    }
    showConfirm();
  };
  return (
    <div>
      <Row gutter={16}>
        <Col lg={8} xs={24} md={12} className={styles.paymentCard}>
          <Card
            title="Wallet Balance"
            hoverable
            bordered
            loading={isAddBillLoading}
          >
            <h1>{(Math.round(wallet * 100) / 100).toFixed(2)}</h1>
            <Button
              style={{ margin: '5px' }}
              type="primary"
              onClick={onRechargeClick}
              disabled={isAddBillLoading}
              loading={isAddBillLoading}
            >
              Recharge
            </Button>
          </Card>
        </Col>
        <Col lg={8} xs={24} className={`${styles.paymentCard} ${styles.hideOnMobile}`}>
          <Card
            title="Last Bill"
            hoverable
            bordered
            loading={isAddBillLoading}
          >
            <p>
              {lastAmount}
            </p>
            <p>
              {' '}
              {LastDate}
            </p>
            <p style={{ color: 'green', fontWeight: 'bold' }}>{nextBIllingDate}</p>

          </Card>
        </Col>
        <Col lg={8} md={12} xs={24} className={styles.paymentCard}>
          <Card
            title="Total Due"
            hoverable
            bordered
            loading={isAddBillLoading}
          >
            <h1>
              {' '}
              {(Math.round((totalBill || 0) * 100) / 100).toFixed(2)}
            </h1>

            {lastBill?.length > 1 && (
            <Button
              style={{ margin: '5px' }}
              type="primary"
              danger={totalBill > 0}
              loading={isAddBillLoading}
              disabled={isAddBillLoading || totalBill === 0}
              onClick={onPayBIll}
            >
              Pay Now
            </Button>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
