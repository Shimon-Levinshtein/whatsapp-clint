import React, { useState } from 'react';
import styles from "./GetTime.module.scss";
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

const GetTime = ({ value, setTime }) => {

  // const [value, onChange] = useState(new Date());
  const onChangeTime = (date) => {
    const newTime = new Date(value);
    newTime.setHours(date.getHours());
    newTime.setMinutes(date.getMinutes());
    newTime.setSeconds(0);
    setTime(newTime);
  };

  return (
    <div className={styles.continer}>
      <div className={styles.continer_input}>
        <label>Time</label>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticTimePicker
            displayStaticWrapperAs="mobile"
            value={value}
            onChange={(newValue) => onChangeTime(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, {})(GetTime);