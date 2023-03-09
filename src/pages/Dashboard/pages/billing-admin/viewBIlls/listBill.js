/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { Table, Tag, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import styles from './table.module.css';
import { listBills, payViaAdmin } from '../../../../../features/auth';

export default function ListBill() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isDataLoading, billList, billListRefetch } = auth;
  const tableLength = billList?.length;
  useEffect(() => {
    dispatch(listBills());
  }, []);

  useEffect(() => {
    if (billListRefetch) {
      dispatch(listBills());
    }
  }, [billListRefetch]);

  const invokeAction = (id) => {
    dispatch(payViaAdmin(id));
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (user) => user.username,
      sorter: (a, b) => a.user.username.localeCompare(b.user.username),
    },
    {
      title: 'Generated on',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Electricity Day Usage',
      dataIndex: 'electricity',
      key: 'electricity',
      render: (electricity) => electricity.day,
      sorter: (a, b) => a.electricity.day - b.electricity.day,

    },
    {
      title: 'Electricity Night Usage',
      dataIndex: 'electricity',
      key: 'electricity',
      render: (electricity) => electricity.night,
      sorter: (a, b) => a.electricity.night - b.electricity.night,
    },
    {
      title: 'Gas Usage',
      dataIndex: 'gas',
      key: 'gas',
      sorter: (a, b) => a.gas - b.gas,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'paid',
      key: 'paid',
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
    {
      title: 'Action',
      key: 'key',
      dataIndex: 'key',
      render: (text, record) => (
        <Button
          size="small"
          type="primary"
          onClick={() => invokeAction(record._id)}
          disabled={record.paid === 'Paid'}
        >
          {record.paid === 'Not Paid' ? 'Pay Offline' : 'Paid'}
        </Button>
      ),
    },
  ];
  return (
    <div className={styles.parent}>
      <h1 className={styles.h1Heading}>User BIlls</h1>
      <Table
        className={styles.tableCustom}
        columns={columns}
        dataSource={billList}
        expandable
        loading={isDataLoading}
        align="center"
        scroll={{ x: true }}
        pagination={{
          pageSize: 8,
          total: { tableLength },
        }}
      />
    </div>
  );
}
