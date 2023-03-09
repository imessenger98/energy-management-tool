/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { listRecharge } from '../../../../../features/auth';
import styles from './recharge.module.css';
import UnAuthorized from '../../unAuthorized';

const columns = [
  {
    title: 'Recharge Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (createdAt) => moment(createdAt).format('YYYY-MM-DD'),
  },
  {
    title: 'Redeemed',
    dataIndex: 'redeemed',
    key: 'redeemed',
    sorter: (a, b) => a.redeemed - b.redeemed,
  },
  {
    title: 'Coupon',
    dataIndex: 'code',
    key: 'code',
    sorter: (a, b) => a.code.localeCompare(b.code),
  },
];

function RechargeTable() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const {
    isRechargeLoading, isRechargeList, isRechargeListRefetch, isAdmin,
  } = auth;

  useEffect(() => {
    dispatch(listRecharge());
  }, []);

  useEffect(() => {
    if (isRechargeListRefetch) {
      dispatch(listRecharge());
    }
  }, [isRechargeListRefetch]);
  const tableLength = isRechargeList?.length;

  if (isAdmin) {
    return <UnAuthorized />;
  }
  return (
    <Table
      className={styles.tableCustom}
      columns={columns}
      dataSource={isRechargeList}
      expandable
      loading={isRechargeLoading}
      align="center"
      size="small"
      pagination={{
        pageSize: 4,
        total: { tableLength },
      }}
      scroll={{
        y: 'auto',
      }}
    />
  );
}
export default RechargeTable;
