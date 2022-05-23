import React, { useEffect, useState } from 'react';
import styles from "./TemplateCreateAllEvents.module.scss";
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dataSceens } from '../../dataCreateVents';
import GetDate from './components/GetDate/GetDate';
import GetTime from './components/GetTime/GetTime';
import SelectContacts from './components/SelectContacts/SelectContacts';


const TemplateCreateAllEvents = props => {

  const { group, indexId } = useParams();
  const data = dataSceens[group][indexId];
  const [openContacts, setOpenContacts] = useState(false);

  const [eventName, setEventName] = useState('');
  const [message, setMessage] = useState('');
  const [contactsList, setContactsList] = useState([]);

  const [date, setDate] = useState(new Date());

  console.log(contactsList);

  return (
    <div className={styles.continer}>
      <div className={styles.top_title_continer}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
      <div className={styles.inputs_box}>
        <div className={styles.inputs_box_left}>
          <div className={styles.input_continer}>
            <label>Event name</label>
            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </div>
          <div className={styles.input_continer}>
            <label>Message</label>
            <textarea type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <GetDate value={date} setDate={setDate} />
          <GetTime value={date} setTime={setDate} />
        </div>
        <div className={styles.hr} />
        <div className={styles.inputs_box_right}>
          <div className={styles.inputs_box_right_top}>
            <div className={styles.contacts_box}>
              <div onClick={() => setOpenContacts(true)} className={styles.contacts_button}>
                Select Contacts
              </div>
              <div className={styles.contacts_list}>
                Selectd Contacts list
              </div>
              {openContacts && <SelectContacts setOpenContacts={setOpenContacts} contactsList={contactsList} setContactsList={setContactsList} />}
            </div>
          </div>
          <div className={styles.inputs_box_right_bottom}>
            df
          </div>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, {})(TemplateCreateAllEvents);