import React from 'react';
import styles from "./WhatsappConnection.module.scss";
import { connect } from 'react-redux';
import { requestConnect } from '../../../actions/requestConnect';
import QRCode from "react-qr-code";
import { socket } from '../../../socket/socketConnection';


const WhatsappConnection = props => {
  const conectButton = () => {
    props.requestConnect({});
  };

  const openChannel = () => {
    console.log('openChannel!!!!');
    socket.emit("open_channel_whatsapp", {
      data: 'my-data-Shimon',
      id: 1
    });
  };

  return (
    <div className={styles.continer} id='customer-quote'>
      <div className={styles.title}>
        <h1>Whatsapp Connection</h1>
        <div className={styles.qrCode}>
          {props.qrCode}
          {props.qrCode && <QRCode value={props.qrCode} />}
        </div>
        <button onClick={() => conectButton()}> conect </button>
        <button onClick={() => openChannel()}> openChannel </button>
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    qrCode: state.qrCode
  }
}
export default connect(mapStateToProps, { requestConnect })(WhatsappConnection);