/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Button,
  Row,
  Modal,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import styles from './addbill.module.css';
import { setAuthData } from '../../../../../features/auth';
import AddBIllModal from './addBIllModal';
import BillPaymentTable from './paymentTable';
import PaymentCard from './card';
import UnAuthorized from '../../unAuthorized';

function AddBill() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAddBillModalOpen, isAdmin } = auth;

  const modalClick = () => {
    dispatch(setAuthData('isAddBillModalOpen', !isAddBillModalOpen));
  };
  if (isAdmin) {
    return <UnAuthorized />;
  }
  return (
    <>
      <Row className={styles.sideButton}>
        <Button
          type="primary"
          icon={<PlusCircleOutlined style={{ fontSize: '15px' }} />}
          onClick={modalClick}
        >
          Add Usage
        </Button>
        <Modal
          title="Add Usage"
          centered
          open={isAddBillModalOpen}
          onOk={modalClick}
          onCancel={modalClick}
          footer
          width="auto"
        >
          <AddBIllModal />
        </Modal>
      </Row>
      <PaymentCard />
      <div className={styles.parent}>
        <h1 className={styles.h1Heading}>Billing History</h1>
        <BillPaymentTable />
      </div>
    </>

  );
}

export default AddBill;
