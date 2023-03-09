import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './404.module.css';

function PageNotFound() {
  const navigate = useNavigate();
  const returnHome = () => {
    navigate('/dashboard');
  };
  return (
    <div className={styles.parent}>
      <Result
        status="404"
        title="404"
        subTitle={(
          <p>
            Sorry, the page you visited does not exist
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
export default PageNotFound;
