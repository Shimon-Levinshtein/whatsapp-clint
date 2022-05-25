import React, { useEffect, useState } from 'react';
import styles from "./UserEvents.module.scss";
import { connect } from 'react-redux';
import { getUserEvents } from '../../actions/events';
import SingleEvent from './SingleEvent/SingleEvent';


const UserEvents = props => {

  const [data, setData] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const userEvents = [...props.userEvents];
    userEvents.reverse();
    setData(userEvents);
  }, [props.userEvents]);

  return (
    <div className={styles.continer}>
      <div className={styles.list_box}>
        {data.map((event, index) => <SingleEvent key={index} {...event} />)}
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    userEvents: state.userEvents
  }
}
export default connect(mapStateToProps, { getUserEvents })(UserEvents);