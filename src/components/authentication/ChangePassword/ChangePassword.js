import React, { useState } from 'react';
import "./ChangePassword.scss";
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changePassword } from '../../../actions/authentication';


const ChangePassword = props => {
  const { mail, resetToken } = useParams()

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const changePassword = () => {
    if (password !== passwordConfirm) {
      alert('password and password confirm not match');
      return;
    };
    if (password.length < 6) {
      alert('password must be at least 6 characters');
      return;
    }
    props.changePassword({
      mail,
      resetToken,
      password,
    });
  };



  return (
    <div className='ChangePassword-continer'>
      <div class="card login-form">
        <div class="card-body">
          <h3 class="card-title text-center">Change password</h3>
          <div class="card-text">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Your new password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" class="form-control form-control-sm" />
              </div>
              <br />
              <div class="form-group">
                <label for="exampleInputEmail1">Repeat password</label>
                <input value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} type="password" class="form-control form-control-sm" />
              </div>
              <br />
              <div onClick={() => changePassword()} class="btn btn-primary btn-block submit-btn">Confirm</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, { changePassword })(ChangePassword);