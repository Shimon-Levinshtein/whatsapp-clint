import React, { useState } from 'react';
import styles from "./ErrorMessage.module.scss";
import { connect } from 'react-redux';
import { changeStutusPopupByType } from '../../../actions/popupsHeandler';


const ErrorMessage = props => {



  return (
    <div className={styles.continer}>
      <div className="row justify-content-center">
        <div className="col-md-12 col-sm-12">
          <div className="card shadow-lg border-0 rounded-lg mt-5 mx-auto" style={{ width: '30rem' }}>
            <h3 className="card-header display-1 text-muted text-center">
              {props.popupControler.ErrorMessageText.status}
            </h3>
            <br />
            <span className="card-subtitle mb-2 text-muted text-center">
              {props.popupControler.ErrorMessageText.message}
            </span>

            <div className="card-body mx-auto">
              <a type="button" onClick={() => props.changeStutusPopupByType({
                type: 'ErrorMessage',
                yesOrNo: false,
                typeText: 'ErrorMessageText',
                text: {
                  message: '',
                  status: '',
                },
              })}
                className="btn btn-sm btn-info text-white"> Ok </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    popupControler: state.popupControler,
  }
}
export default connect(mapStateToProps, { changeStutusPopupByType })(ErrorMessage);