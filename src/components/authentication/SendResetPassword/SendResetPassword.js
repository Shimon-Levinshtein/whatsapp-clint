import React, { useEffect, useState } from 'react';
import "./SendResetPassword.scss";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendResetPassword } from '../../../actions/authentication';


const SendResetPassword = props => {

  let navigate = useNavigate();
  const [mail, setMail] = useState('');


  const sendMail = () => {
    if (!mail.includes('@')) {
      alert('mail must be a valid email');
      return;
    }
    props.sendResetPassword(mail, navigate);
  };



  return (
    <div className='SendResetPassword-continer'>
      <div className="auth_class">
        <div className="container login-container">
          <img className="triangleA" src={require('../../../assets/images/triangle-top.png')} alt='Onestop triangle' />
          <div className="row">
            <div className="col-md-6 welcome_auth">
              <div className="auth_welcome">
                The steps of password reset are simple
                <br />
                <span><a>Good luck</a></span>
              </div>
            </div>
            <div className="col-md-6 login-form">
              <div className="login_form_in">
                <div className="auth_branding">
                  <a className="auth_branding_in" >
                    <img src={require('../../../assets/images/Procraft-Logo.jpg')} alt='reset password' /></a>
                </div>
                <h1 className="auth_title text-left">Password Reset</h1>
                <form>
                  <div className="alert alert-success bg-soft-primary border-0" role="alert">
                    Enter your email address and we'll send you an email with instructions to reset your password.
                  </div>
                  <div className="form-group">
                    <input value={mail} onChange={e => setMail(e.target.value)} type="email" className="form-control" name="email" placeholder="Email Address" />
                  </div>
                  <br />
                  <div className="form-group">
                    <button type="button" onClick={() => sendMail()} className="btn btn-primary btn-lg btn-block">Reset Password</button>
                  </div>
                  <div className="form-group other_auth_links">
                    <a className="" onClick={() => navigate('/login')}>Login</a>
                    <a className="" onClick={() => navigate('/sing-up')}>Register</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <img className="triangleB" src={require('../../../assets/images/triangle.png')} alt='Onestop triangle' />
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, { sendResetPassword })(SendResetPassword);