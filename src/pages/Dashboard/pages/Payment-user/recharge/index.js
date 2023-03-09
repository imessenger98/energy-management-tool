/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Button,
  Row,
  Modal,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import styles from './recharge.module.css';
import { setAuthData } from '../../../../../features/auth';
import RechargeModal from './modalRecharge';
import RechargeCard from './rechargeCard';
import RechargeTable from './rechargeTable';

function Recharge() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isRechargeModalOpen } = auth;

  const modalClick = () => {
    dispatch(setAuthData('isRechargeModalOpen', !isRechargeModalOpen));
  };
  return (
    <>
      <Row className={styles.sideButton}>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={modalClick}
        >
          Recharge
        </Button>
        <Modal
          title="Recharge Wallet"
          centered
          open={isRechargeModalOpen}
          onOk={modalClick}
          onCancel={modalClick}
          footer
          width="auto"
        >
          <RechargeModal />
        </Modal>
      </Row>
      <RechargeCard />
      <div className={styles.parent}>
        <h1 className={styles.h1Heading}>Recharge History</h1>
        <RechargeTable />
      </div>
    </>

  );
}

export default Recharge;
