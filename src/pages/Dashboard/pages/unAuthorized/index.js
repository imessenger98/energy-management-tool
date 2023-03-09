import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './403.module.css';

function UnAuthorized() {
  const navigate = useNavigate();
  const returnHome = () => {
    navigate('/dashboard');
  };
  return (
    <div className={styles.parent}>
      <Result
        status="403"
        title="403"
        subTitle={(
          <p>
            Sorry, you are not authorized to access this page.
          </p>
        )}
        extra={(
          <Button
            onClick={returnHome}
            type="primary"
          >
            Back Home
          </Button>
)}
      />
    </div>
  );
}
export default UnAuthorized;
