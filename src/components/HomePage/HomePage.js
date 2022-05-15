import React, { useEffect } from 'react';
import styles from "./HomePage.module.scss";
import { connect } from 'react-redux';
import { changeQrCode } from '../../actions/changeQrCode';
import { updateContacts } from '../../actions/whatsappData';
import { Link } from 'react-router-dom';


const HomePage = props => {


  return (
    <div className={styles.continer} id='customer-quote'>
      <Link to="/sing-up">Sing up</Link>
      <Link to="/login">Login</Link>
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