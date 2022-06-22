import React from 'react';
import styles from "./ChatsList.module.scss";
import { connect } from 'react-redux';
import { documentSvg, imageSvg, multiVcardSvg, pttSvg, stickerSvg, userImgSvg, videoSvg, vRedetOneSvg, vRedetSvg } from '../svgs';
import moment from 'moment';
import { addToFocusChats } from '../../../actions/chatsData';
import { socket } from '../../../socket/socketConnection';


const ChatsList = props => {

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
      hoursResult = Math.floor(minutesResult / 60);
      minutesResult = minutesResult % 60;
    }
    if (minutesResult < 10) {
      ziroToMinutes = '0';
      if (minutesResult === 0) {
        ziroToMinutes = '00:';
      }
    }
    return `${((hoursResult > 0) ? hoursResult + ":" : "")}${ziroToMinutes}${((minutesResult > 0) ? minutesResult + ":" : "")}${(secondsResult > 9 || secondsResult == 0) ? secondsResult : '0' + secondsResult}
    `;
  };

  const onClickChat = data => {
    console.log(data);
    socket.emit(`get_chats_by_chatId_id:${props.userId}`, data.id._serialized);

    props.addToFocusChats(data);
  };

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
          <div key={index} className={styles.chat_item_box} onClick={() => onClickChat(chat)}>
            <div className={styles.chat_item_list_img}>
              {chat.imageUrl ? <img src={chat.imageUrl} /> :
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
                  <div className={styles.icon_v} style={chat.chats[chat.chats.length - 1]?.ack >= 3 ? { color: '#53bdeb' } : {}}>
                    {chat.chats[chat.chats.length - 1]?.fromMe && chat.chats[chat.chats.length - 1]?.ack >= 2 ? vRedetSvg() : ''}
                    {chat.chats[chat.chats.length - 1]?.fromMe && chat.chats[chat.chats.length - 1]?.ack === 1 ? vRedetOneSvg() : ''}
                  </div>
                  {chat.chats[chat.chats.length - 1]?.type === 'document' ? documentSvg() : ''}
                  {chat.chats[chat.chats.length - 1]?.type === 'image' ? imageSvg() : ''}
                  {chat.chats[chat.chats.length - 1]?.type === 'ptt' ? pttSvg() : ''}
                  {chat.chats[chat.chats.length - 1]?.type === 'video' ? videoSvg() : ''}
                  {chat.chats[chat.chats.length - 1]?.type === 'sticker' ? stickerSvg() : ''}
                  {chat.chats[chat.chats.length - 1]?.type === 'multi_vcard' ? multiVcardSvg() : ''}
                  <div className={styles.nessage}>
                    <span dir="auto">
                      {chat.chats[chat.chats.length - 1]?.type === 'ptt' ? calculateSeconds(chat.chats[chat.chats.length - 1]?.duration) : ''}
                      {chat.chats.length ? chat.chats[chat.chats.length - 1]?.body : ''}
                      {chat.chats[chat.chats.length - 1]?.type === 'image' && !chat.chats[chat.chats.length - 1]?.body ? 'Photo' : ''}
                      {chat.chats[chat.chats.length - 1]?.type === 'video' && !chat.chats[chat.chats.length - 1]?.body ? 'Video' : ''}
                      {chat.chats[chat.chats.length - 1]?.type === 'sticker' && !chat.chats[chat.chats.length - 1]?.body ? 'Sticker' : ''}
                      {chat.chats[chat.chats.length - 1]?.type === 'multi_vcard' && !chat.chats[chat.chats.length - 1]?.body ?
                        chat.chats[chat.chats.length - 1]?._data.vcardList[0]?.displayName
                        : ''}
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
    chatsData: state.chatsData,
    userId: state.userData.userId,

  }
}
export default connect(mapStateToProps, { addToFocusChats })(ChatsList);