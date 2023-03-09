import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './signin.module.css';
import imageSRc from '../../assets/images/signIn.jpg';
import SignInGroup from './singInGroup';
import SignUpGroup from './SignUpGroup';

function SignIn() {
  const location = useLocation();
  return (
    <div className={styles.row}>
      <div className={`${styles.column} ${styles.hideOnMobile} `}>
        <img
          src={imageSRc}
          alt="signin"
          className="responsive"
          width="600"
          height="400"
        />
      </div>
      <div className={styles.column}>
        {location.pathname === '/' ? <SignInGroup /> : <SignUpGroup />}
      </div>
    </div>
  );
}

export default SignIn;
