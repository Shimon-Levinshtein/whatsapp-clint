import React, { useEffect, useRef, useState } from 'react';
import styles from "./ChatsScreen.module.scss";
import { connect } from 'react-redux';
import { documentSvg, imageSvg, multiVcardSvg, pttSvg, stickerSvg, userImgSvg, videoSvg, vRedetOneSvg, vRedetSvg } from '../svgs';
import moment from 'moment';
import DisplayChats from './DisplayChats/DisplayChats';
import { imgSvg } from './svgs';


const ChatsScreen = props => {

  const focusChats = props.focusChats;
  const focusChatsArr = props.focusChats?.chats
  ?.sort(({ timestamp: a }, { timestamp: b }) => a - b )
  .map(item => {
    const date = new Date();
    date.setTime(item.timestamp + '000');
    let displayDate = moment(date).format('DD/MM/YYYY');
    // if (today.toDateString() === date.toDateString()) {
    displayDate = moment(date).format('h:mm a');
    // }
    // if (date.toDateString() === yesterday.toDateString()) {
    //   displayDate = 'yesterday';
    // }
    return { ...item, displayDate: displayDate, date: date }
  });
  const scrollRef = useRef(null);

  const today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [focusChats]);
  return (
    <div className={styles.continer}>
      {!focusChats ?
        <div className={styles.empty_box}>
          {imgSvg()}
          <div className={styles.empty_box_text}>
            Welcome To WhatsApp Web Robot
          </div>
        </div>
        :
        <div ref={scrollRef} className={styles.box}>
          <header>
            <div className={styles.header_img}>
              {focusChats.imageUrl ? <img src={focusChats.imageUrl} /> :
                userImgSvg()}
            </div>
            <div className={styles.header_name}>
              <span dir="auto">
                {focusChats.name}
              </span>
            </div>
          </header>
          <div className={styles.message}>
            Use WhatsApp on your phone to see older chat messages.
          </div>
          {focusChatsArr.map((item, index) => (
            <DisplayChats
              key={index}
              data={item}
              dataBefore={index > 0 ? focusChatsArr[index - 1] : false}
              dataAfter={(index + 1) < focusChatsArr.length ? focusChatsArr[index + 1] : false}
            />
          ))}
          <footer>footer</footer>
        </div>
      }
    </div>
  );
};


const mapStateToProps = state => {
  return {
    focusChats: state.chatsData.focusChats
  }
}
export default connect(mapStateToProps, {})(ChatsScreen);