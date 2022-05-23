import React, { useEffect } from 'react';
import styles from "./ItemScreen.module.scss";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const ItemScreen = props => {

  return (
    <div className={styles.continer}>
      <div className={styles.box}>
        <div className={styles.left}>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <div className={styles.right}>
          <Link to={`/create-event/event-template/${props.group}/${props.indexId}`}>Create this Event</Link>
        </div>
      </div>
      <hr />
    </div>
  );
};


const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, {})(ItemScreen);