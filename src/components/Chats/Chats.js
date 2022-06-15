import React, { useEffect, useState } from 'react';
import styles from "./Chats.module.scss";
import { connect } from 'react-redux';
import ChatsList from './ChatsList/ChatsList';


const Chats = props => {

  console.log(props.chatsData);
  const chatsData = props.chatsData.chats;
  const date = new Date();

  date.setTime('1655022016'+'000');
  console.log(date);
  date.setTime('1655131854'+'000');
  console.log('---***');
  console.log(date);
 
  return (
    <div className={styles.continer}>
      <div className={styles.left}>
          <ChatsList />
      </div>
      <div className={styles.right}>
      {/* {date} */}
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