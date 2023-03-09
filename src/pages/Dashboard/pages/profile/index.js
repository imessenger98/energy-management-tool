/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import {
  Avatar, Card, Space, Tooltip,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.css';
import { getUserProfile } from '../../../../features/auth/action';
import UnAuthorized from '../unAuthorized';

const { Meta } = Card;
function Profile() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, isDataLoading, isAdmin } = auth;
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
  const avatar = userData?.username?.charAt(0);
  const onSettingsClick = () => {
    navigate('/dashboard/settings');
  };
  if (isAdmin) {
    return <UnAuthorized />;
  }
  return (
    <div className={styles.parent}>
      <Card
        loading={isDataLoading}
        className={styles.child}
        cover={(
          <Space>
            <Avatar
              size={100}
              className={styles.avatar}
              style={{
                color: '#f56a00',
                backgroundColor: '#fde3cf',
              }}
            >
              {avatar}
            </Avatar>
          </Space>
      )}
        actions={[
          <Tooltip key="setting" title="Settings">
            <SettingOutlined key="setting" onClick={onSettingsClick} />
          </Tooltip>,
          <Tooltip key="edit" title="Please contact admin to update your information">
            <EditOutlined key="edit" />
          </Tooltip>,
        ]}
      >
        <Meta
          title="User Information"
          description={(
            <div>
              <p>
                {' '}
                Username:
                {' '}
                {userData?.username}
              </p>
              {!isAdmin && (
              <>
                <p>
                  {' '}
                  Wallet Balance:
                  {' '}
                  {userData?.wallet}
                </p>
                <p>
                  {' '}
                  Address:
                  {' '}
                  {userData?.address}
                </p>
                <p>
                  {' '}
                  Property Type:
                  {' '}
                  {userData?.propertyType}
                </p>
                <p>
                  {' '}
                  Bedroom Count:
                  {' '}
                  {userData?.bedRooms}
                </p>
              </>
              )}
            </div>
          )}
        />
      </Card>
    </div>
  );
}

export default Profile;
