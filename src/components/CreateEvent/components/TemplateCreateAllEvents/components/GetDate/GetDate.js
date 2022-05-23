import React, { useState } from 'react';
import styles from "./GetDate.module.scss";
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const GetDate = props => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={styles.continer}>

      <div className={styles.continer_input}>
      </div>
      <div className={styles.continer_input}>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, {})(GetDate);