import React, { useEffect, useState } from 'react';
import styles from "./DisplayChats.module.scss";
import { connect } from 'react-redux';
import { documentSvg, imageSvg, multiVcardSvg, pttSvg, stickerSvg, userImgSvg, videoSvg, vRedetOneSvg, vRedetSvg } from '../../svgs';
import moment from 'moment';
import Loading from '../../../../assets/images/Loading.gif';


const DisplayChats = props => {

  const data = props.data;
  const dataBefore = props.dataBefore;
  const dataAfter = props.dataAfter;
  const today = new Date();

  const rulStyle = {
    backgroundColor: data.fromMe ? '#d9fdd3' : 'white',
    marginBottom: data.fromMe !== dataAfter.fromMe || new Date(data.date).toDateString() !== new Date(dataAfter.date).toDateString() ? '12px' : '2px',
  }
  const peakStyle = {
    display: data.fromMe !== dataBefore.fromMe ? 'block' : 'none',
    borderTopColor: data.fromMe ? '#d9fdd3' : 'white',
    right: data.fromMe ? '-8px' : 'auto',
    left: !data.fromMe ? '-8px' : 'auto',
  }

  const switchMessage = () => {

    switch (data.type) {
      case 'chat':
        return (
          <div className={styles.chat_box} style={rulStyle} onClick={() => console.log(data)}>
            <div className={styles.chat_peak} style={peakStyle} />
            <div dir='auto' className={styles.chat_text}>
              {data.body}
            </div>
            <div className={styles.chat_date}>
              <div className={styles.date_text}>
                {data.displayDate}
              </div>
              <div className={styles.icon_v} style={data?.ack >= 3 ? { color: '#53bdeb' } : {}}>
                {data?.fromMe && data?.ack >= 2 ? vRedetSvg() : ''}
                {data?.fromMe && data?.ack === 1 ? vRedetOneSvg() : ''}
              </div>
            </div>
          </div>
        )
      case 'document':
        return (
          <div className={styles.image_box} style={rulStyle} onClick={() => console.log(data)}>
            <div className={styles.chat_peak} style={peakStyle} />
            <div className={styles.chat_img}>
              PDF
              {/* {data.media ? 
              <img src={`data:${data.media.mimetype};base64, ${data.media.data}`} />:
              <img src={Loading} />
              } */}
            </div>
            <div className={styles.chat_date}>
              <div className={styles.date_text}>
                {data.displayDate}
              </div>
              <div className={styles.icon_v} style={data?.ack >= 3 ? { color: '#53bdeb' } : {}}>
                {data?.fromMe && data?.ack >= 2 ? vRedetSvg() : ''}
                {data?.fromMe && data?.ack === 1 ? vRedetOneSvg() : ''}
              </div>
            </div>
          </div>
        )
      case 'image':
        return (
          <div className={styles.image_box} style={rulStyle} onClick={() => console.log(data)}>
            <div className={styles.chat_peak} style={peakStyle} />
            <div className={styles.chat_img}>
              {data.media ? 
              <img src={`data:${data.media.mimetype};base64, ${data.media.data}`} />:
              <img src={Loading} />
              }
            </div>
            <div className={styles.chat_date}>
              <div className={styles.date_text}>
                {data.displayDate}
              </div>
              <div className={styles.icon_v} style={data?.ack >= 3 ? { color: '#53bdeb' } : {}}>
                {data?.fromMe && data?.ack >= 2 ? vRedetSvg() : ''}
                {data?.fromMe && data?.ack === 1 ? vRedetOneSvg() : ''}
              </div>
            </div>
          </div>
        )
      case 'ptt':
        break;
      case 'video':
        break;
      case 'sticker':
        break;
      case 'multi_vcard':
        break;
      default:
        break;
    }
  }

  return (
    <>
      {new Date(data.date).toDateString() !== new Date(dataBefore.date).toDateString() &&
        <div className={styles.date_change}>
          {/* if (today.toDateString() === date.toDateString()) {
            displayDate = moment(date).format('h:mm a');
          } */}
          {today.toDateString() === data.date.toDateString() ?
            'TODAY' :
            moment(data.date).format('DD/MM/YYYY')}
        </div>
      }
      <div className={styles.continer} style={data.fromMe ? { marginLeft: 'auto', marginRight: '0px' } : {}}>
        {switchMessage()}
      </div>
    </>
  );
};


const mapStateToProps = state => {
  return {
  }
}
export default connect(mapStateToProps, {})(DisplayChats);