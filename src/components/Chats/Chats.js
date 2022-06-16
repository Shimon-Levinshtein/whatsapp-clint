import React, { useEffect, useState } from 'react';
import styles from "./Chats.module.scss";
import { connect } from 'react-redux';
import ChatsList from './ChatsList/ChatsList';
import ChatsScreen from './ChatsScreen/ChatsScreen';


const Chats = props => {

  const chatsData = props.chatsData.chats;

 
  return (
    <div className={styles.continer}>
      <div className={styles.left}>
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
    chatsData: state.chatsData
  }
}
export default connect(mapStateToProps, {})(Chats);