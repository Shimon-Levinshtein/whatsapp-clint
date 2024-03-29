import React, { useEffect, useState } from 'react';
import styles from "./DisplayChats.module.scss";
import { connect } from 'react-redux';
import { documentSvg, imageSvg, multiVcardSvg, pttSvg, stickerSvg, userImgSvg, videoSvg, vRedetOneSvg, vRedetSvg } from '../../svgs';
import moment from 'moment';
import Loading from '../../../../assets/images/Loading.gif';
import { GrDocumentDownload } from "react-icons/gr";


const DisplayChats = props => {

  const data = props.data;
  const dataBefore = props.dataBefore;
  const dataAfter = props.dataAfter;
  const today = new Date();
  const clientInfo = props.clientInfo;

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


  const downloadDocument = () => {
    // window.open(`data:${data.media.mimetype};base64, ${data.media.data}`);
    let fetchData = `data:${data.media.mimetype};base64, ${data.media.data}`;
    let a = document.createElement("a");
    a.href = fetchData;
    a.download = data.body;
    a.click();
  };

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
          <div className={styles.document_box} style={rulStyle} onClick={() => console.log(data)}>
            <div className={styles.chat_peak} style={peakStyle} />
            <div className={styles.chat_document} onClick={() => downloadDocument()}>
              <GrDocumentDownload />
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
      case 'image':
        return (
          <div className={styles.image_box} style={rulStyle} onClick={() => console.log(data)}>
            <div className={styles.chat_peak} style={peakStyle} />
            <div className={styles.chat_img}>
              {data.media && data.media !== 'x' ?
                <img src={`data:${data.media.mimetype};base64, ${data.media.data}`} /> :
                data.media !== 'x' ? <img src={Loading} /> : 'Photo Unavailable'
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
        return (
          <div className={styles.ptt_box} style={rulStyle} onClick={() => console.log(data)}>
            <div className={styles.chat_peak} style={peakStyle} />
            <div className={styles.audio_box}>
              <div className={styles.audio_img}>
                <img src={clientInfo?.imageUrl} />
              </div>
              <div className={styles.audio}>
                {data.media && data.media !== 'x' ?
                  <audio controls>
                    <source src={`data:${data.media.mimetype};base64, ${data.media.data}`} type={data.media.mimetype} />
                    <source src="horse.mp3" type="audio/mpeg" />
                  </audio>
                  :
                  data.media !== 'x' ? <img src={Loading} /> : 'Audio Unavailable'
                }
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
            </div>
          </div>
        )
      case 'video':
        return (
          <div className={styles.video_box} style={rulStyle} onClick={() => console.log(data)}>
            <div className={styles.chat_peak} style={peakStyle} />
            <div className={styles.chat_video}>
              {data.media && data.media !== 'x' ?
                <video controls>
                <source src={`data:${data.media.mimetype};base64, ${data.media.data}`} type={data.media.mimetype} />
              </video> :
                data.media !== 'x' ? <img src={Loading} /> : 'Video Unavailable'
              }
            </div>
            <div className={styles.chat_date}>
              <div className={styles.vidio_text}>
                {data.displayDate}
              </div>
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
      case 'sticker':

      case 'multi_vcard':

      default:
        return (
          <div className={styles.chat_box} style={rulStyle} onClick={() => console.log(data)}>
            <div className={styles.chat_peak} style={peakStyle} />
            <div dir='auto' className={styles.chat_text}>
              {data.type}
              xxxxxxxxxxx
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
    clientInfo: state.whatsappData.clientInfo
  }
}
export default connect(mapStateToProps, {})(DisplayChats);