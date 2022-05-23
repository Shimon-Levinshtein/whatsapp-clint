import React, { useState } from 'react';
import styles from "./CreateEvent.module.scss";
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { dataSceens } from './dataCreateVents';
import ItemScreen from './components/ItemScreen/ItemScreen';
import TemplateCreateAllEvents from './components/TemplateCreateAllEvents/TemplateCreateAllEvents';


const CreateEvent = props => {

  const [screenOpen, setScreenOpen] = useState('eventByDate');


  return (
    <>
      <Routes>
        <Route exact path="/" element={
          <div className={styles.continer} >
            <div className={styles.left_continer} >
              <div className={styles.box_tabs}>
                <h1>List Event</h1>
                <div onClick={() => setScreenOpen('eventByDate')} className={styles.left_tab} >
                  Event by date
                </div>
                <div onClick={() => setScreenOpen('replyMessagesReceived')} className={styles.left_tab} >
                  Reply to messages received
                </div>
              </div>
              <hr />
            </div>
            <div className={styles.right_continer} >
              <div className={styles.event_box} >
                {dataSceens[screenOpen].map((item, index) => (
                  <ItemScreen key={index} group={screenOpen} indexId={index} title={item.title} description={item.description} path={item.path} />
                ))}
              </div>
            </div>
          </div>
        } />
        <Route path="event-template/:group/:indexId" element={<TemplateCreateAllEvents />} />
      </Routes>
    </>
  );
};


const mapStateToProps = state => {
  return {
    userData: state.userData
  }
}
export default connect(mapStateToProps, {})(CreateEvent);