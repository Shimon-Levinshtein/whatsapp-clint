import React, { useEffect, } from 'react';
import "./Spinner.scss";
import { connect } from 'react-redux';
import { changeStutusPopupByType } from '../../../actions/popupsHeandler';

const Spinner = props => {



  return (
    <div className='Spinner-continer'>
      <div className="loader">Loading...</div>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    popupControler: state.popupControler,
  }
}
export default connect(mapStateToProps, { changeStutusPopupByType })(Spinner);