import React, { useEffect, useState } from 'react';
import styles from "./CreateComingMessage.module.scss";
import { connect } from 'react-redux';
import ButtonClose from '../../../../../../templates/ButtonClose/ButtonClose';



const CreateComingMessage = ({
  replyToInComingMessage,
  setReplyToInComingMessage,
  setIsCreateOpen,
  isEdit,
  setIsEdit,
  editData,
}) => {

  const [typeCondition, setTypeCondition] = useState('all');
  const [isComingMessage, setIsComingMessage] = useState('');
  const [sendMessage, setSendMessage] = useState('');
  const [isBetweenTime, setIsBetweenTime] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [arrTimes, setArrTimes] = useState([]);
  const [arrTimesUTC, setArrTimesUTC] = useState([]);
  

  useEffect(() => {
    if (isEdit) {
      console.log(editData);
      console.log(editData.arrTimesUTC[0]);
      console.log(new Date(editData.arrTimesUTC[0].startTime));

      setTypeCondition(editData.typeCondition);
      setIsComingMessage(editData.isComingMessage);
      setSendMessage(editData.sendMessage);
      setIsBetweenTime(editData.isBetweenTime);
      setArrTimes(editData.arrTimes);
      setArrTimesUTC(editData.arrTimesUTC);
    }
  }, [isEdit, editData]);
  const onChangeTypeCondition = (e) => {
    // console.log(e.target.selectedIndex);
    // console.log(e.target[e.target.selectedIndex].text);
    setTypeCondition(e.target.value);
  };

  const saveTime = () => {
    if (!startTime || !endTime) alert('Please enter time');
    if (startTime && endTime) {
      let start = new Date();
      let end = new Date();
      start.setHours(startTime.split(':')[0]);
      start.setMinutes(startTime.split(':')[1]);
      start.setSeconds('0');
      end.setHours(endTime.split(':')[0]);
      end.setMinutes(endTime.split(':')[1]);
      end.setSeconds('0');
      setArrTimes([...arrTimes, { 
        startTime: startTime, 
        endTime: endTime, 
      }]);
      setArrTimesUTC([...arrTimesUTC, { 
        startTime: start, 
        endTime: end, 
      }]);
      setStartTime('');
      setEndTime('');
    }
  };

  const deleteTime = (index) => {
    const newArr = [...arrTimes];
    const newArrTimesUTC = [...arrTimesUTC];
    newArr.splice(index, 1);
    newArrTimesUTC.splice(index, 1);
    setArrTimes(newArr);
    setArrTimesUTC(newArrTimesUTC);
  };

  const createComingMessage = () => {
    if (typeCondition !== 'all' && !isComingMessage) return alert('Please enter message');
    if (!sendMessage) return alert('Please enter message');
    if (isBetweenTime && !arrTimes.length) return alert('Please enter time');
    const newReplyToInComingMessage = [...replyToInComingMessage];
    if (isEdit) {
      newReplyToInComingMessage[editData.index] = {
        typeCondition,
        isComingMessage,
        sendMessage,
        isBetweenTime,
        arrTimes: isBetweenTime ? arrTimes : [],
        arrTimesUTC: isBetweenTime ? arrTimesUTC : [],
      };
      setIsEdit(false);
    } else {
      newReplyToInComingMessage.push({
        typeCondition,
        isComingMessage,
        sendMessage,
        isBetweenTime,
        arrTimes: isBetweenTime ? arrTimes : [],
        arrTimesUTC: isBetweenTime ? arrTimesUTC : [],
      });
    }
    setReplyToInComingMessage(newReplyToInComingMessage);
    setIsCreateOpen(false);
  };


  return (
    <div className={styles.continer}>
      <div className={styles.box}>
        <ButtonClose close={setIsCreateOpen} />
        <div className={styles.insid_box}>
          <div className={styles.condition_box}>
            <label>Type of conditioning Reply To In Coming Message.</label>
            <select value={typeCondition} className={styles.select} onChange={onChangeTypeCondition}>
              <option value='all' >All messages</option>
              <option value='containing'>Contains text</option>
              <option value='exact'>Exact text</option>
            </select>

          </div>
          {typeCondition === 'containing' || typeCondition === 'exact' ?
            <div className={styles.input_box}>
              <label>On Coming Message.</label>
              <input value={isComingMessage} onChange={e => setIsComingMessage(e.target.value)} type="text" placeholder="Enter text" />
            </div> : ''}
          <div className={styles.input_box}>
            <label>Send Message.</label>
            <input value={sendMessage} onChange={e => setSendMessage(e.target.value)} type="text" placeholder="Enter text" />
          </div>
          <div className={styles.time_box}>
            <input type='checkbox' checked={isBetweenTime} onChange={() => setIsBetweenTime(!isBetweenTime)} />
            <p>Send message between times</p>
          </div>
          {isBetweenTime &&
            arrTimes.map((item, index) => (
              <div key={index} className={styles.list_time_box}>
                <div className={styles.time_item_start}>
                  Start time: {item.startTime} End time: {item.endTime}
                </div>
                <div className={styles.but_delete} onClick={() => deleteTime(index)}>Delete</div>
              </div>
            ))
          }
          {isBetweenTime &&
            <div className={styles.add_time_box}>
              <p>Between</p>
              <input value={startTime} type="time" onChange={e => setStartTime(e.target.value)}></input>
              <p>and</p>
              <input value={endTime} type="time" onChange={e => setEndTime(e.target.value)}></input>
              <div className={styles.but_save} onClick={() => saveTime()}>Save</div>
            </div>
          }
          <br />
          <br />
          <div className='mt-green-button' onClick={() => createComingMessage()}>{isEdit ? 'Save Changes' : 'Create'}</div>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, {})(CreateComingMessage);