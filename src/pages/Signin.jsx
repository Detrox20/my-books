import React from 'react';
import axios from 'axios';
import { Row, Col, message } from 'antd';
import withAuth from '../hocs/withAuth';
import styles from '../styles/Signin.module.scss';

class Signin extends React.Component {
  state = {
    email: '',
  };

  passwordRef = React.createRef(null);

  render() {
    return (
      <Row align="middle" className={styles['wrapper-container']}>
        <Col span={9} className={styles.side}></Col>
        <Col span={6} className={styles['login-container']}>
          <form>
            <h1 className={styles.title}>MY BOOKS | 내책</h1>
            <p className={styles.description}>LET'S READ A BOOK AT HOME</p>
            <p className={styles.gradient}></p>
            <p>
              <label htmlFor="email" className={styles.email}>
                Email<span>*</span>
              </label>
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.change}
              />
            </p>
            <p>
              <label htmlFor="password" className={styles.password}>
                Password<span>*</span>
              </label>
              <input type="password" name="password" ref={this.passwordRef} />
            </p>
            <p>
              <button onClick={this.click} className={styles.button}>
                Sign in
              </button>
            </p>
          </form>
        </Col>
        <Col span={9} className={styles.side}></Col>
      </Row>
    );
  }

  click = async () => {
    const email = this.state.email;
    const password = this.passwordRef.current.value;

    if (email === '' || password === '') return;

    try {
      const response = await axios.post('https://api.marktube.tv/v1/me', {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      this.props.history.push('/');
    } catch (error) {
      const errorCode = error?.response?.data?.error || 'NOT_MATCH';
      if (errorCode === 'PASSWORD_NOT_MATCH') {
        message.error('패스워드가 맞지 않습니다.');
      } else if (errorCode === 'USER_NOT_EXIST') {
        message.error('존재하지 않는 이메일 입니다.');
      } else {
        message.error('Error');
      }
    }
  };

  change = (e) => {
    this.setState({ email: e.target.value });
  };
}

export default withAuth(Signin, false);
