import React, { useEffect } from 'react';
import { Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { listEvcCodes } from '../../../../../features/auth';
import styles from './table.module.css';

const columns = [
  {
    title: 'EVC code',
    dataIndex: 'code',
    key: 'code',
    sorter: (a, b) => a.code.localeCompare(b.code),

  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    responsive: ['md'],
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Expired',
    dataIndex: 'expired',
    key: 'expired',
    render: (tag) => {
      const color = tag ? 'red' : 'green';
      return (
        <Tag color={color} key={tag}>
          {tag ? 'Expired' : 'Not Expired'}
        </Tag>
      );
    },
    filters: [
      { text: 'Expired', value: true },
      { text: 'Not Expired', value: false },
    ],
    onFilter: (value, record) => record.expired === value,
  },
  {
    title: 'owner',
    dataIndex: 'owner',
    key: 'owner',
    responsive: ['lg'],
    render: (owner) => String(owner?.username || 'unclaimed'),

  },
];

function TableEVCCode() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isEvcLoading, EVCCodes, evcRefetch } = auth;

  useEffect(() => {
    dispatch(listEvcCodes());
  }, []);

  useEffect(() => {
    if (evcRefetch) {
      dispatch(listEvcCodes());
    }
  }, [evcRefetch]);
  const tableLength = EVCCodes?.length;

  return (
    <Table
      className={styles.tableCustom}
      columns={columns}
      dataSource={EVCCodes}
      expandable
      loading={isEvcLoading}
      align="center"
      size="small"
      pagination={{
        pageSize: 8,
        total: { tableLength },
      }}
      scroll={{
        y: 'auto',
      }}
    />
  );
}
export default TableEVCCode;
