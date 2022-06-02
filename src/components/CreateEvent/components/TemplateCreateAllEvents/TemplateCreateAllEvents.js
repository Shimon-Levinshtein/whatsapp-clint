import React, { useEffect, useState } from 'react';
import styles from "./TemplateCreateAllEvents.module.scss";
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { dataSceens } from '../../dataCreateVents';
import GetDate from './components/GetDate/GetDate';
import GetTime from './components/GetTime/GetTime';
import SelectContacts from './components/SelectContacts/SelectContacts';
import DisplayContacts from './components/DisplayContacts/DisplayContacts';
import SelectGroup from './components/SelectGroup/SelectGroup';
import { createEventByType, editEventById } from '../../../../actions/events';

const displayDisplaybyType = {
  date: false,
  time: false,
  contacts: false,
  group: false,
  message: false,
  dayInMonths: false,
}

const TemplateCreateAllEvents = props => {

  const location = useLocation();
  const navigate = useNavigate();
  const pathStatus = location.pathname.split('/')[1];
  const { group, indexId } = useParams();
  let data = {};
  if (pathStatus === 'create-event') {
    data = dataSceens[group][indexId];
  };

  if (pathStatus === 'edit-event') {
    dataSceens[group].forEach(item => {
      if (item.type === indexId) {
        data = item;
      };
    });
  };

  const [isEdite, setIsEdite] = useState(false);

  const [displaybyType, setDisplaybyType] = useState(displayDisplaybyType);
  const [openContacts, setOpenContacts] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);


  const [eventName, setEventName] = useState('');
  const [message, setMessage] = useState('');
  const [dayInMonths, setDayInMonths] = useState(1);
  const [date, setDate] = useState(new Date());
  const [contactsList, setContactsList] = useState([]);
  const [groupList, setGroupList] = useState([]);



  useEffect(() => {
    if (pathStatus === 'edit-event') {
      if (location.state) {
        if (location.state.eventName) setEventName(location.state.eventName);
        if (location.state.message) setMessage(location.state.message);
        if (location.state.dayInMonths) setDayInMonths(location.state.dayInMonths);
        if (location.state.date) setDate(new Date(location.state.date));
        if (location.state.contactsList) setContactsList(location.state.contactsList);
        if (location.state.groupList) setGroupList(location.state.groupList);
      }
    };
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
    if (displaybyType.dayInMonths) eventData.dayInMonths = dayInMonths;
    props.createEventByType({
      group: group,
      eventTitle: data.title,
      eventDescription: data.description,
      type: data.type,
      eventName: eventName,
      ...eventData
    }, navigate);
  };

  const saveChangesEvent = () => {

    const eventData = {};
    if (displaybyType.date || displaybyType.time) eventData.date = date;
    if (displaybyType.contacts) eventData.contactsList = contactsList;
    if (displaybyType.group) eventData.groupList = groupList;
    if (displaybyType.message) eventData.message = message;
    if (displaybyType.dayInMonths) eventData.dayInMonths = dayInMonths;
    props.editEventById({
      _id: location.state._id,
      group: group,
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
          {displaybyType.dayInMonths && <div className={styles.input_continer}>
            <label>Day in the months</label>
            <select value={dayInMonths} onChange={(e) => setDayInMonths(e.target.value)}>
              {new Array(28).fill(0).map((item, index) => (
                <option key={index} >{index + 1}</option>
              ))}
            </select>
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
          {pathStatus === 'create-event' && <div onClick={() => saveEvent()} className={styles.inputs_box_right_bottom}>
            CREATE NEW EVENT
          </div>}
          {pathStatus === 'edit-event' && <div onClick={() => saveChangesEvent()} className={styles.inputs_box_right_bottom}>
            SAVE CHANGES EVENT
          </div>}
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, { createEventByType, editEventById })(TemplateCreateAllEvents);