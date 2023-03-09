/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { Table, Tag, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import styles from './table.module.css';
import { listUser, userControl } from '../../../../features/auth';

export default function UserManagement() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isDataLoading, userList, userListRefetch } = auth;
  const tableLength = userList?.length;
  useEffect(() => {
    dispatch(listUser());
  }, []);

  useEffect(() => {
    if (userListRefetch) {
      dispatch(listUser());
    }
  }, [userListRefetch]);

  const invokeAction = (record) => {
    dispatch(userControl(record?._id, !record.status));
  };

  const columns = [
    {
      title: 'Joining Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('YYYY-MM-DD'),
      responsive: ['md'],
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Property type',
      dataIndex: 'propertyType',
      key: 'propertyType',
      responsive: ['md'],

    },
    {
      title: 'Bed Rooms',
      dataIndex: 'bedRooms',
      key: 'bedRooms',
      responsive: ['md'],
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      responsive: ['lg'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      responsive: ['md'],
      render: (record) => {
        const color = record ? 'green' : 'red';
        return (
          <Tag color={color} key={record}>
            {record ? 'Active' : 'Disabled'}
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
          onClick={() => invokeAction(record)}
        >
          {record.status ? 'Disable' : 'enable'}
        </Button>
      ),
    },
  ];
  return (
    <div className={styles.parent}>
      <h1 className={styles.h1Heading}>User Management</h1>
      <Table
        className={styles.tableCustom}
        columns={columns}
        dataSource={userList}
        expandable
        loading={isDataLoading}
        align="center"
        pagination={{
          pageSize: 8,
          total: { tableLength },
        }}
      />
    </div>
  );
}
