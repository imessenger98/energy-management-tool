/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Button,
  Row,
  Modal,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import styles from './evc.module.css';
import { setAuthData } from '../../../../../features/auth';
import EVCModal from './modal';
import TableEVCCode from './table';

function EVCCode() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isEVCModalOpen } = auth;

  const modalClick = () => {
    dispatch(setAuthData('isEVCModalOpen', !isEVCModalOpen));
  };
  return (
    <>
      <Row className={styles.sideButton}>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={modalClick}
        >
          Add EVC
        </Button>
        <Modal
          title="Add Energy Voucher Code"
          centered
          open={isEVCModalOpen}
          onOk={modalClick}
          onCancel={modalClick}
          footer
          width="auto"
        >
          <EVCModal />
        </Modal>
      </Row>
      <div className={styles.parent}>
        <h1 className={styles.h1Heading}>Energy Voucher Code</h1>
        <TableEVCCode />
      </div>
    </>

  );
}

export default EVCCode;
