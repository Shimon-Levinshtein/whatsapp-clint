import React, { useEffect,  } from 'react';
import "./Loading.scss";
import { connect } from 'react-redux';
import { changeStutusPopupByType } from '../../../actions/popupsHeandler';

const Loading = props => {

  useEffect(() => {
    let $ = (e) => document.querySelector(e);
    let dots = $(".dots");
    function animate(element, className) {
      element.classList.add(className);
      setTimeout(() => {
        element.classList.remove(className);
        setTimeout(() => {
          animate(element, className);
        }, 500);
      }, 2500);
    }
    animate(dots, "dots--animate");
    
  }, []);

  return (
    <div className='Loading-continer'>
      <h1>Loading
        <div className="dots"><span className="dot z"></span><span className="dot f"></span><span className="dot s"></span><span className="dot t"><span className="dot l"></span></span></div>
      </h1>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    popupControler: state.popupControler,
  }
}
export default connect(mapStateToProps, { changeStutusPopupByType })(Loading);