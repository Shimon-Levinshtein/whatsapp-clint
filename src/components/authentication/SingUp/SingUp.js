import React, { useEffect, useState } from 'react';
import styles from "./SingUp.module.scss";
import { connect } from 'react-redux';
import { singUp } from '../../../actions/authentication';
import { useNavigate } from 'react-router-dom';


const SingUp = props => {

  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [lestName, setLestName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [submited, setSubmited] = useState(false);
  useEffect(() => {
    if (props.userData.signIn && submited) {
      navigate('/');
      setSubmited(false);
    }
  }, [props.userData.signIn]);

  const singUp = () => {
    if (password !== passwordConfirm) {
      alert('password and password confirm not match');
      return;
    }
    if (password.length < 6) {
      alert('password must be at least 6 characters');
      return;
    }
    if (!mail.includes('@')) {
      alert('mail must be a valid email');
      return;
    }
    if (!name || !lestName) {
      alert('name and last name must be filled');
      return;
    }

    props.singUp({
      name,
      lestName,
      mail,
      password,
      phone: '0000000000',
      token: '',
    });
    setSubmited(true);
  };




  return (
    <div className={styles.continer}>
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up!!!!</p>

                      <form className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input onChange={e => setName(e.target.value)} value={name} type="text" id="form3Example1c" className="form-control" />
                            <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input onChange={e => setLestName(e.target.value)} value={lestName} type="text" id="form3Example1c" className="form-control" />
                            <label className="form-label" htmlFor="form3Example1c">Your Lest Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input onChange={e => setMail(e.target.value)} value={mail} type="email" id="form3Example3c" className="form-control" />
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input onChange={e => setPassword(e.target.value)} value={password} type="password" id="form3Example4c" className="form-control" />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input onChange={e => setPasswordConfirm(e.target.value)} value={passwordConfirm} type="password" id="form3Example4cd" className="form-control" />
                            <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                          </div>
                        </div>

                        {/* <div className="form-check d-flex justify-content-center mb-5">
                          <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                          <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div> */}

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button onClick={() => singUp()} type="button" className="btn btn-primary btn-lg">Register</button>
                        </div>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Already registered? <a onClick={() => navigate('/login')} href="#!"
                          className="link-danger">Login</a></p>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample image" />

                    </div>
                  </div>
                </div>
              </div>
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
export default connect(mapStateToProps, { singUp })(SingUp);