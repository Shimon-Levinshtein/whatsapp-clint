import React, { useEffect } from 'react';
import styles from "./WhatsappConnection.module.scss";
import { connect } from 'react-redux';
import { changekeyQrData, changeQrCode, changeStatusConection, whatsappDisconnected } from '../../actions/changeQrCode';
import QRCode from "react-qr-code";
import { socket } from '../../socket/socketConnection';
import { updateContacts } from '../../actions/whatsappData';
import { menu, settings } from './svgs';
import Spinner from '../templates/Spinner/Spinner';
import { Link, useNavigate } from 'react-router-dom';


const WhatsappConnection = props => {
  let navigate = useNavigate();

  useEffect(() => {
    if (props.userData.signIn && props.userData.userId) {

      socket.emit(`open_channel_whatsapp`, {
        data: 'my-data-Shimon',
        _id: props.userData.userId
      });

      socket.emit(`check_whatsapp_connection_status_id:${props.userData.userId}`, {});

      socket.on(`new_qr_for_connectin_id:${props.userData.userId}`, data => {
        console.log('new_qr_for_connectin_id:');
        props.changeQrCode(data.qrCode);
      });

      socket.on(`on_whatsapp_connected_id:${props.userData.userId}`, data => {
        console.log('on_whatsapp_connected_id:');
        props.changeStatusConection(true);
        props.changeQrCode('');
        props.updateContacts(data);
        navigate('/');
      });

      socket.on(`on_whatsapp_disconnected_id:${props.userData.userId}`, data => {
        props.changeQrCode('');
        props.changeStatusConection(false);
        props.whatsappDisconnected();
        console.log('on_whatsapp_disconnected_id:');
      });
      socket.on(`res_whatsapp_connection_status_id:${props.userData.userId}`, data => {
        if (data.status) {
          props.changeStatusConection(true);
          props.changeQrCode('');
          navigate('/');
        }
        console.log('res_whatsapp_connection_status_id:');
      });

    }
  }, [props.userData.userId]);

const requestQrCodeButton = () => {
  socket.emit(`request_qr_code_id:${props.userData.userId}`, {});
  props.changekeyQrData({
    key: 'requestQrCode', 
    value: false,
  })
}
  return (
    <div className={styles.continer} id='customer-quote'>
      <div className={styles.br_top}>
        <div className={styles.br_top_content}>
          <div className={styles.title_top}>
            WHATSAAP WEB ROBOT
          </div>

          <div className={styles.img_continer}>
            <img src={require('../../assets/images/whatsappRobot.png')} alt="whatsapp" />
          </div>
        </div>
      </div>
      <div className={styles.qr_box}>
        <div className={styles.title}>
          <h1>Whatsapp Connection</h1>
        </div>
        <div className={styles.qrCode_content}>
          <div className={styles.qrCode_explanation}>
            <div className={styles.landing_title}>
              To use WhatsApp web robot on your computer:
            </div>
            <div className={styles.landing_text}>
              1. Open WhatsApp on your phone
            </div>
            <div className={styles.landing_text}>
              2. Tap <b>Menu </b> {menu()} or <b>Settings </b> {settings()} and select <b>Linked Devices</b>
            </div>
            <div className={styles.landing_text}>
              3. Tap on  <b>Link a Device </b>
            </div>
            <div className={styles.landing_text}>
              4. Point your phone to this screen to capture the code
            </div>

          </div>
          <div className={styles.qrCode}>
            <QRCode value={props.qrCode.qrCode} />
            {!props.qrCode.qrCode && <div className={styles.spinner}>
              <Spinner />
            </div>}
            {props.qrCode.requestQrCode && <div className={styles.requestQrCode_box}>
              <div onClick={() => requestQrCodeButton()} className={styles.requestQrCode_button}>
                Try again
              </div>
            </div>}
          </div>

        </div>
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    qrCode: state.qrCode,
    userData: state.userData
  }
}
export default connect(mapStateToProps, {
  changeQrCode,
  updateContacts,
  changeStatusConection,
  whatsappDisconnected,
  changekeyQrData,
})(WhatsappConnection);