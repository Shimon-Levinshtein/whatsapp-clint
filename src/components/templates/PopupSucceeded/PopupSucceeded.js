import React, { useState } from 'react';
// import styles from "./PopupSucceeded.module.scss";
import "./PopupSucceeded.scss";
import { connect } from 'react-redux';
import { changeStutusPopupByType } from '../../../actions/popupsHeandler';
import { BsCheck2 } from "react-icons/bs";


const PopupSucceeded = props => {



  return (
    <div className="PopupSucceeded_continer">
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header">
              <div className="icon-box">
                <i className="material-icons"> <BsCheck2 /></i>
              </div>
              <h4 className="modal-title w-100">{props.popupControler.PopupSucceededData.title}</h4>
              <i className="bi bi-check2"></i>
            </div>
            <div className="modal-body">
              <p className="text-center">{props.popupControler.PopupSucceededData.message}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success btn-block" onClick={() => props.changeStutusPopupByType({
                type: 'PopupSucceeded',
                yesOrNo: false,
                typeText: 'PopupSucceededData',
                text: {
                  title: '',
                  message: '',
                  buttonText: '',
                },
              })} >{props.popupControler.PopupSucceededData.buttonText}</button>
            </div>
          </div>
        </div>
    </div >
  );
};


const mapStateToProps = state => {
  return {
    popupControler: state.popupControler,
  }
}
export default connect(mapStateToProps, { changeStutusPopupByType })(PopupSucceeded);