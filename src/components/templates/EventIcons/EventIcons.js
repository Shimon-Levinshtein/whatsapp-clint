import React from 'react';
import { connect } from 'react-redux';
import { ImCalendar } from "react-icons/im";
import { ImQuestion } from "react-icons/im";


const EventIcons = props => {

  const getIcon = (icon) => {
    switch (icon) {
      case "messageByDate":
        return <ImCalendar />;
      default:
        return <ImQuestion />;
    }
  };


  return getIcon(props.icon);
   
};


const mapStateToProps = state => {
  return {
    popupControler: state.popupControler,
  }
}
export default connect(mapStateToProps, {})(EventIcons);