import React from 'react';
import styles from "./SingleEvent.module.scss";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import EventIcons from '../../templates/EventIcons/EventIcons';
import { deleteEvent } from '../../../actions/events';


const SingleEvent = props => {
  
  const deleteEvent = () => {
    props.deleteEvent(props._id);
  };

  return (
    <div className={styles.continer}>
      <div className={styles.box}>
        <div className={styles.left}>
          <EventIcons icon={props.type} />
          <div className={styles.left_box_text}>
            <h3>{props.data.eventName}</h3>
            {props.data.eventTitle && <p><b>Event type: </b>{props.data.eventTitle}</p>}
            {props.data.eventDescription && <p><b>Event Description: </b>{props.data.eventDescription}</p>}
            {props.data.message && <p><b>Message: </b>{props.data.message}</p>}
            {props.data.date && <p><b>Date: </b>{moment(props.data.date).format('D/M/Y h:mm:ss')}</p>}
            {props.data.contactsList?.length > 0 && <p><b>Contacts: </b>{props.data.contactsList.length}</p>}
            {props.data.groupList?.length > 0 && <p><b>Groups: </b>{props.data.groupList.length}</p>}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.edit_button} >Edit</div>
          <Link to={`/edit-event/event-template/${'eventByDate'}/${'messageByDate'}`}>Create this Event</Link>
          <div onClick={() => deleteEvent()} className={styles.delete_button} >delete</div>
        </div>
      </div>
      <hr />
    </div>
  );
};


const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, { deleteEvent })(SingleEvent);