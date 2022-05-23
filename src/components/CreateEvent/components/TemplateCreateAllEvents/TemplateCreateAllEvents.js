import React, { useEffect, useState } from 'react';
import styles from "./TemplateCreateAllEvents.module.scss";
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dataSceens } from '../../dataCreateVents';
import GetDate from './components/GetDate/GetDate';


const TemplateCreateAllEvents = props => {

  const { group, indexId } = useParams();
  const data = dataSceens[group][indexId];
  
  const [message, setMessage] = useState('');
  
  const [date, setDate] = useState(new Date());
  const onChangeDate = thisDate => {
    setDate(thisDate);
  };
  console.log(date);

  return (
    <div className={styles.continer}>
      <div className={styles.top_title_continer}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
        <GetDate selectedDate={date} onChange={onChangeDate}/>
    </div>
  );
};


const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, {})(TemplateCreateAllEvents);