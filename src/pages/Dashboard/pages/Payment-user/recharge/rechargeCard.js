import React from 'react';
import {
  Card, Col, Row,
} from 'antd';
import { useSelector } from 'react-redux';
import styles from './recharge.module.css';

export default function RechargeCard() {
  const auth = useSelector((state) => state.auth);
  const {
    wallet,
    isRechargeLoading,
  } = auth;

  return (
    <div className={styles.rechargeCard}>
      <Row gutter={16}>
        <Col span={24} className={styles.rechargeCardMain}>
          <Card
            title="Wallet Balance"
            hoverable
            bordered
            className={styles.rechargeCardChild}
            loading={isRechargeLoading}
          >
            <h1>{(Math.round(wallet * 100) / 100).toFixed(2)}</h1>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
