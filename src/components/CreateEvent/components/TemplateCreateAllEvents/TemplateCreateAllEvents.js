import React, { useEffect, useState } from 'react';
import styles from "./TemplateCreateAllEvents.module.scss";
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { dataSceens } from '../../dataCreateVents';
import GetDate from './components/GetDate/GetDate';
import GetTime from './components/GetTime/GetTime';
import SelectContacts from './components/SelectContacts/SelectContacts';
import DisplayContacts from './components/DisplayContacts/DisplayContacts';
import SelectGroup from './components/SelectGroup/SelectGroup';
import { createEventByType } from '../../../../actions/events';

const displayDisplaybyType = {
  date: false,
  time: false,
  contacts: false,
  group: false,
  message: false,
}

const TemplateCreateAllEvents = props => {
  const navigate = useNavigate();
  const { group, indexId } = useParams();
  const data = dataSceens[group][indexId];

  const [displaybyType, setDisplaybyType] = useState(displayDisplaybyType);
  const [openContacts, setOpenContacts] = useState(false);
  const [contactsList, setContactsList] = useState([]);

  const [openGroup, setOpenGroup] = useState(false);
  const [groupList, setGroupList] = useState([]);

  const [eventName, setEventName] = useState('');
  const [message, setMessage] = useState('');

  const [date, setDate] = useState(new Date());


  useEffect(() => {
    const newDisplaybyType = { ...displayDisplaybyType };
    data.data.forEach(item => {
      newDisplaybyType[item] = true;
    });
    setDisplaybyType(newDisplaybyType);
  }, [group, indexId]);

  const saveEvent = () => {
    const eventData = {};
    if (displaybyType.date || displaybyType.time) eventData.date = date;
    if (displaybyType.contacts) eventData.contactsList = contactsList;
    if (displaybyType.group) eventData.groupList = groupList;
    if (displaybyType.message) eventData.message = message;
    props.createEventByType({
      eventTitle: data.title,
      eventDescription: data.description,
      type: data.type,
      eventName: eventName,
      ...eventData 
    }, navigate);
  };

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
          {displaybyType.message && <div className={styles.input_continer}>
            <label>Message</label>
            <textarea type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>}
          {displaybyType.date && <GetDate value={date} setDate={setDate} />}
          {displaybyType.time && <GetTime value={date} setTime={setDate} />}
          
        </div>
        <div className={styles.hr} />
        <div className={styles.inputs_box_right}>
          <div className={styles.inputs_box_right_top}>
           {displaybyType.contacts && <div className={styles.contacts_box}>
              <div onClick={() => setOpenContacts(true)} className={styles.contacts_button}>
                Select Contacts
              </div>
              <div className={styles.contacts_list}>
                <DisplayContacts contactsList={contactsList} />
              </div>
              {openContacts && <SelectContacts setOpenContacts={setOpenContacts} contactsList={contactsList} setContactsList={setContactsList} />}
            </div>}
            <br />
            <br />
            {displaybyType.group && <div className={styles.contacts_box}>
              <div onClick={() => setOpenGroup(true)} className={styles.contacts_button}>
                Select Groups
              </div>
              <div className={styles.contacts_list}>
                <DisplayContacts contactsList={groupList} />
              </div>
              {openGroup && <SelectGroup setOpenGroup={setOpenGroup} groupList={groupList} setGroupList={setGroupList} />}
            </div>}
          </div>
          <div onClick={() => saveEvent()} className={styles.inputs_box_right_bottom}>
            CREATE
          </div>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, { createEventByType })(TemplateCreateAllEvents);