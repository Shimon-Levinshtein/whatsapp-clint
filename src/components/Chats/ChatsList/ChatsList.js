import React, { useEffect, useState } from 'react';
import styles from "./ChatsList.module.scss";
import { connect } from 'react-redux';
import { documentSvg, imageSvg, userImgSvg, vRedetSvg } from './svgs';
import moment from 'moment';


const ChatsList = props => {

  console.log(props.chatsData);
  const chatsData = props.chatsData.chats;
  const today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);


  const calculateSeconds = seconds => {
    const secondsResult = +seconds % 60;
    let minutesResult = Math.floor(+seconds / 60);
    let hoursResult = 0;
    let ziroToMinutes = '';
    if (minutesResult > 59) {

      console.log(minutesResult / 60);
      hoursResult = Math.floor(minutesResult / 60);
      minutesResult = minutesResult % 60;
      if (minutesResult < 10) {
        ziroToMinutes = '0';
        if (minutesResult === 0) {
          ziroToMinutes = '00:';
        }
      }
    }
    return `${((hoursResult > 0) ? hoursResult + ":" : "")}${ziroToMinutes}${((minutesResult > 0) ? minutesResult + ":" : "")}${(secondsResult > 9 || secondsResult == 0) ? secondsResult : '0' + secondsResult}
    `;
  };

  console.log(calculateSeconds(3600));

  return (
    <div className={styles.continer}>

      {chatsData
        .sort(({ timestamp: a }, { timestamp: b }) => b - a)
        .map(item => {
          const date = new Date();
          date.setTime(item.timestamp + '000');
          let displayDate = moment(date).format('DD/MM/YYYY');
          if (today.toDateString() === date.toDateString()) {
            displayDate = moment(date).format('h:mm a');
          }
          if (date.toDateString() === yesterday.toDateString()) {
            displayDate = 'yesterday';
          }
          return { ...item, displayDate: displayDate }
        })
        .map((chat, index) => (
          <div kye={index} className={styles.chat_item_box} onClick={() => console.log(chat)}>
            <div className={styles.chat_item_list_img}>
              {chat.imgUrl ? <img src={chat.imgUrl} /> :
                userImgSvg()}
            </div>
            <div className={styles.item_right}>
              <div className={styles.box}>
                <div className={styles.top}>
                  <div className={styles.name}>
                    <span dir="auto">
                      {chat.name}
                    </span>
                  </div>
                  <div className={styles.date}>
                    {chat.displayDate}
                  </div>
                </div>
                <div className={styles.buttom}>
                  <div className={styles.icon_v} style={chat.chats[chat.chats.length - 1]?.ack === 3 ? { color: '#53bdeb' } : {}}>
                    {chat.chats[chat.chats.length - 1]?.fromMe ? vRedetSvg() : ''}
                  </div>
                  {chat.chats[chat.chats.length - 1]?.type === 'document' ? documentSvg() : ''}
                  {chat.chats[chat.chats.length - 1]?.type === 'image' ? imageSvg() : ''}
                  <div className={styles.nessage}>
                    <span dir="auto">
                      {chat.chats.length ? chat.chats[chat.chats.length - 1]?.body : ''}
                      {chat.chats[chat.chats.length - 1]?.type === 'image' && !chat.chats[chat.chats.length - 1]?.body ? 'Photo' : ''}
                    </span>
                  </div>

                </div>
              </div>
              <hr />
            </div>
          </div>

        ))}

    </div>
  );
};


const mapStateToProps = state => {
  return {
    chatsData: state.chatsData
  }
}
export default connect(mapStateToProps, {})(ChatsList);