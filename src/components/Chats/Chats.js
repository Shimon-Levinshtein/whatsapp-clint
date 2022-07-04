import React, { useEffect, useState } from 'react';
import styles from "./Chats.module.scss";
import { connect } from 'react-redux';
import ChatsList from './ChatsList/ChatsList';
import ChatsScreen from './ChatsScreen/ChatsScreen';


const Chats = props => {

  const clientInfo = props.clientInfo;
console.log(clientInfo);
  return (
    <div className={styles.continer}>
      <div className={styles.left}>
        <div className={styles.box_user_profile}>
          <img src={clientInfo?.imageUrl} />
          <div className={styles.profile_text}>
          {clientInfo?.pushname}
          </div>
        </div>
        <ChatsList />
      </div>
      <div className={styles.right}>
        <ChatsScreen />
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    clientInfo: state.whatsappData.clientInfo
  }
}
export default connect(mapStateToProps, {})(Chats);