import React, { useState } from 'react';
import "./ChangePassword.scss";
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { changePassword } from '../../../actions/authentication';


const ChangePassword = props => {

  const navigate = useNavigate();

  const { mail, resetToken } = useParams();

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
    }, navigate);
  };



  return (
    <div className='ChangePassword-continer'>
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Change password</h3>
          <div className="card-text">
            <form>
              <div className="form-group">
                <label for="exampleInputEmail1">Your new password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control form-control-sm" />
              </div>
              <br />
              <div className="form-group">
                <label for="exampleInputEmail1">Repeat password</label>
                <input value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} type="password" className="form-control form-control-sm" />
              </div>
              <br />
              <div onClick={() => changePassword()} className="btn btn-primary btn-block submit-btn">Confirm</div>
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