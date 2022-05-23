import React, { useState } from 'react';
import styles from "./GetDate.module.scss";
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const GetDate = ({ value, setDate }) => {
  // const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={styles.continer}>
      <div className={styles.continer_input}>
        <label>Date</label>
        <DatePicker
          selected={value}
          minDate={new Date()}
          onChange={(date) => setDate(date)} />
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, {})(GetDate);