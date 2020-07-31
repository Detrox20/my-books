import React from 'react';
import axios from 'axios';
import { message } from 'antd';
import withAuth from '../hocs/withAuth';

class Signin extends React.Component {
  state = {
    email: '',
  };

  passwordRef = React.createRef(null);

  render() {
    return (
      <div>
        <h1>로그인</h1>
        <p>
          <input type="text" value={this.state.email} onChange={this.change} />
        </p>
        <p>
          <input type="password" ref={this.passwordRef} />
        </p>
        <p>
          <button onClick={this.click}>로그인</button>
        </p>
      </div>
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
