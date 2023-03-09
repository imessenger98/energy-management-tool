/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { Table, Tag } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { listBillPayment } from '../../../../../features/auth';
import styles from './table.module.css';

const columns = [
  {
    title: 'Generated On',
    dataIndex: 'date',
    key: 'date',
    render: (date) => moment(date).format('YYYY-MM-DD')
    ,
  },
  {
    title: 'Electricity Day Usage',
    dataIndex: 'electricity',
    key: 'electricity',
    render: (electricity) => electricity.day,
    sorter: (a, b) => a.electricity.day - b.electricity.day,
    responsive: ['md'],

  },
  {
    title: 'Electricity Night Usage',
    dataIndex: 'electricity',
    key: 'electricity',
    render: (electricity) => electricity.night,
    sorter: (a, b) => a.electricity.night - b.electricity.night,
    responsive: ['md'],

  },
  {
    title: 'Gas',
    dataIndex: 'gas',
    key: 'gas',
    responsive: ['md'],
    sorter: (a, b) => a.gas - b.gas,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (record) => (record || null),
  },
  {
    title: 'Status',
    dataIndex: 'paid',
    key: 'paid',
    responsive: ['md'],
    render: (record) => {
      let color = '';
      if (record === 'Not Required') {
        color = 'green';
      } else if (record === 'Not Paid') {
        color = 'red';
      } else color = 'green';

      return (
        <Tag color={color} key={record}>
          {record}
        </Tag>
      );
    },
  },
];

function BillPaymentTable() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAddBillLoading, addBillCodes, addBIllRefetch } = auth;

  useEffect(() => {
    dispatch(listBillPayment());
  }, []);

  useEffect(() => {
    if (addBIllRefetch) {
      dispatch(listBillPayment());
    }
  }, [addBIllRefetch]);
  const tableLength = addBillCodes?.length;

  return (
    <Table
      className={styles.tableCustom}
      columns={columns}
      dataSource={addBillCodes}
      expandable
      loading={isAddBillLoading}
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
export default BillPaymentTable;
