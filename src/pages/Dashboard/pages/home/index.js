import React from 'react';
import {
  Typography,
  Card,
} from 'antd';
import { useSelector } from 'react-redux';
import styles from './home.module.css';

function Home() {
  const auth = useSelector((state) => state.auth);
  const { isAdmin } = auth;

  return (
    <div style={{ margin: '20px' }}>
      <Card>
        {isAdmin ? (
          <>
            <Typography className={styles.font}>
              Welcome, Admin,
            </Typography>
            <Typography className={styles.font}>
              Thank you for all that you do to keep
              our organization running smoothly.
            </Typography>
            <Typography className={styles.font}>
              We appreciate your dedication and hard work.
            </Typography>
          </>
        ) : (
          <Typography className={styles.font}>
            Welcome! We&apos;re glad you&apos;re here.
            Thank you for taking the time to visit our site.
          </Typography>
        )}
      </Card>
    </div>
  );
}

export default Home;
