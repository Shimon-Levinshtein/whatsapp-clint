import React, { useEffect } from 'react';
import styles from "./WhatsappConnection.module.scss";
import { connect } from 'react-redux';
import { changeQrCode } from '../../actions/changeQrCode';
import QRCode from "react-qr-code";
import { socket } from '../../socket/socketConnection';
import { updateContacts } from '../../actions/whatsappData';


const WhatsappConnection = props => {
  

  useEffect(() => {
    if (props.userData.signIn && props.userData.userId) {
     
    }
    socket.emit(`open_channel_whatsapp_id:${props.userData.userId}`, {
      data: 'my-data-Shimon',
      _id: props.userData.userId
    });
    socket.on(`new_qr_for_connectin_id:${props.userData.userId}`, data => {
      console.log('new_qr_for_connectin_id:');
      props.changeQrCode(data.qrCode);
    });
    socket.on(`on_whatsapp_connected_id:${props.userData.userId}`, data => {
      console.log('on_whatsapp_connected_id:');
      props.updateContacts(data);
    });
    socket.on(`on_whatsapp_disconnected_id:${props.userData.userId}`, data => {
      console.log('on_whatsapp_disconnected_id:');
      console.log(data);
    });
  }, [props.userData.userId]);

  // const openChannel = () => {
  //   console.log('openChannel!!!!');
  //   socket.emit("open_channel_whatsapp", {
  //     data: 'my-data-Shimon',
  //     id: 1
  //   });
  // };

  return (
    <div className={styles.continer} id='customer-quote'>
      <div className={styles.title}>
        <h1>Whatsapp Connection</h1>
        <div className={styles.qrCode}>
          {props.qrCode}
          {props.qrCode && <QRCode value={props.qrCode} />}
        </div>
        {/* <button onClick={() => conectButton()}> conect </button>
        <button onClick={() => openChannel()}> openChannel </button> */}
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
export default connect(mapStateToProps, { changeQrCode, updateContacts })(WhatsappConnection);