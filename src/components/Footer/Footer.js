import React, { useEffect, useState } from 'react';
import styles from "./Footer.module.scss";
import { connect } from 'react-redux';
import { logOut } from '../../actions/authentication';
import { socket } from '../../socket/socketConnection';
import { changeStutusPopupByType } from '../../actions/popupsHeandler';
import { useNavigate } from 'react-router-dom';


const Footer = props => {

  const navigate = useNavigate();

  const [srartInterval, setSrartInterval] = useState(false);
  
  useEffect(() => {
    if (props.userData.signIn && props.userData.userId) {
      if (!srartInterval) {
        setSrartInterval(true);
        setInterval(() => {
          socket.emit(`check_interval_whatsapp_connection_status_id:${props.userData.userId}`, {});
        }, 10000);
      }
    }
  }, [props.userData.userId]);

  useEffect(() => {
    socket.on(`res_interval_whatsapp_connection_status_id:${props.userData.userId}`, data => {
      console.log('Footer_whatsapp_connection_status: ' + data.status);
      // if (data.status) {
      //   props.changeStatusConection(true);
      //   props.changeQrCode('');
      //   navigate('/');
      // }
    });
    socket.on(`another_socket_we_enter_id:${props.userData.userId}`, data => {
      console.log(`another_socket_we_enter_id:`);
      props.changeStutusPopupByType({
        type: 'PopupMessage',
        yesOrNo: true,
        typeText: 'PopupMessageData',
        text: {
          title: 'LOGOUT',
          message: `Someone else has logged in, If it's not you, change your password from the Login page.`,
          buttonText: 'Ok',
        },
      });
      props.logOut(navigate);
    });
  }, []);



  return (
    <div className={styles.continer} id='customer-quote'>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">My Events</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className={`navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll ${styles.ul_style}`}>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Link
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                  <li><a className="dropdown-item">Action</a></li>
                  <li><a className="dropdown-item">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" tabIndex="-1" aria-disabled="true">Link</a>
              </li>
            </ul>
            <div className="d-flex">
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
              <button className="btn btn-outline-success" onClick={() => props.logOut(navigate)} >LOG OUT</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    // qrCode: state.qrCode,
    userData: state.userData
  }
}
export default connect(mapStateToProps, { logOut, changeStutusPopupByType })(Footer);