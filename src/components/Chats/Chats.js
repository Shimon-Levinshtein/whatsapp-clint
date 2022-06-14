import React, { useEffect, useState } from 'react';
import styles from "./Chats.module.scss";
import { connect } from 'react-redux';


const Chats = props => {

console.log(props.chatsData);
  return (
    <div className={styles.continer}>
      ******** Chats ******************
    </div>
  );
};


const mapStateToProps = state => {
  return {
    chatsData: state.chatsData
  }
}
export default connect(mapStateToProps, {  })(Chats);