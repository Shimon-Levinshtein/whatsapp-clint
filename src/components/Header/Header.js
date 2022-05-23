import React, { useEffect, useState } from 'react';
import styles from "./Header.module.scss";
import { connect } from 'react-redux';
import { logOut } from '../../actions/authentication';
import { socket } from '../../socket/socketConnection';
import { changeStutusPopupByType } from '../../actions/popupsHeandler';
import { NavLink, useNavigate } from 'react-router-dom';


const Header = props => {

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
    <div className={styles.continer} >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {props.qrCode.whatsappConnected && <NavLink className={e => "navbar-brand " + (e.isActive ? styles.active_top_tab : "")} to="/my-events">My Events</NavLink>}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            {props.qrCode.whatsappConnected && <ul className={`navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll ${styles.ul_style}`}>
              <li className="nav-item">
                <NavLink className={e => "nav-link " + (e.isActive ? styles.active_top_tab : "")} to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={e => "nav-link " + (e.isActive ? styles.active_top_tab : "")} to="/create-event">Create event</NavLink>
                {/* <a className="nav-link" >Create event</a> */}
              </li>
            </ul>}
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
    qrCode: state.qrCode,
    userData: state.userData
  }
}
export default connect(mapStateToProps, { logOut, changeStutusPopupByType })(Header);