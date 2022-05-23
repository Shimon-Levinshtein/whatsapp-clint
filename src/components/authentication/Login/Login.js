import React, { useEffect, useState } from 'react';
import styles from "./Login.module.scss";
import { connect } from 'react-redux';
import { login } from '../../../actions/authentication';
import { useNavigate } from 'react-router-dom';


const Login = props => {

  const navigate = useNavigate();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [submited, setSubmited] = useState(false);
  useEffect(() => {
    if (props.userData.signIn && submited) {
      navigate('/');
      setSubmited(false);
    }
  }, [props.userData.signIn]);

  const login = () => {
    if (password.length < 6) {
      alert('password must be at least 6 characters');
      return;
    }
    if (!mail.includes('@')) {
      alert('mail must be a valid email');
      return;
    }
    props.login({
      mail,
      password,
    });
    setSubmited(true);
  };



  return (
    <div className={styles.continer}>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in </p>
                </div>
                <br />
                <div className="form-outline mb-4">
                  <input onChange={e => setMail(e.target.value)} value={mail} type="email" id="form3Example3" className="form-control form-control-lg"
                    placeholder="Enter a valid email address" />
                  {/* <label className="form-label" htmlFor="form3Example3">Email address</label> */}
                </div>

                <div className="form-outline mb-3">
                  <input onChange={e => setPassword(e.target.value)} value={password} type="password" id="form3Example4" className="form-control form-control-lg"
                    placeholder="Enter password" />
                  {/* <label className="form-label" htmlFor="form3Example4">Password</label> */}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href='#' onClick={() => navigate('/send-reset-password')} className="text-body">Forgot password?</a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button onClick={() => login()} type="button" className="btn btn-primary btn-lg"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a onClick={() => navigate('/sing-up')} href="#!"
                    className="link-danger">Register</a></p>
                </div>

              </form>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    userData: state.userData,
  }
}
export default connect(mapStateToProps, { login })(Login);