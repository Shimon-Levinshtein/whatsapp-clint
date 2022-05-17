import React, { useState } from 'react';
import styles from "./PopupMobile.module.scss";
import { connect } from 'react-redux';
import { changeStutusPopupByType } from '../../../actions/popupsHeandler';


const PopupMobile = props => {



  return (
    <div className={styles.continer}>
      <div className="row justify-content-center">
        <div className="col-md-12 col-sm-12">
          <div className="card shadow-lg border-0 rounded-lg mt-5 mx-auto" style={{ width: '30rem' }}>
            <h3 className="card-header display-1 text-muted text-center">
              Hops, sorry ...
            </h3>
            <br />
            <span className="card-subtitle mb-2 text-muted text-center">
              This website only supports Desktop
            </span>

            {/* <div className="card-body mx-auto">
              <a type="button" onClick={() => props.changeStutusPopupByType({
                type: 'PopupMobile',
                yesOrNo: false,
                typeText: 'PopupMobileText',
                text: {
                  message: '',
                  status: '',
                },
              })}
                className="btn btn-sm btn-info text-white"> Ok </a> */}
          </div>
        </div>
      </div>
    </div>
    // </div >
  );
};


const mapStateToProps = state => {
  return {
  }
}
export default connect(mapStateToProps, { changeStutusPopupByType })(PopupMobile);