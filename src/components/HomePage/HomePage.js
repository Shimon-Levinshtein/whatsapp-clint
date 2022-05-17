import React, { useEffect } from 'react';
import styles from "./HomePage.module.scss";
import { connect } from 'react-redux';
import { changeQrCode } from '../../actions/changeQrCode';
import { updateContacts } from '../../actions/whatsappData';
import { Link, useNavigate } from 'react-router-dom';


const HomePage = props => {
  let navigate = useNavigate();


  return (
    <div className={styles.continer} id='customer-quote'>
      <h1> Home Page</h1>
      <Link to="/sing-up">Sing up</Link>
      <br/>
      <Link to="/login">Login</Link>
      <br/>
      <Link to="/whatsapp-connection">Whatsapp Connection</Link>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    qrCode: state.qrCode,
    userData: state.userData
  }
}
export default connect(mapStateToProps, { changeQrCode, updateContacts })(HomePage);