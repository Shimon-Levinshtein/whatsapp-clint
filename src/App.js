import './App.css';
import SingUp from './components/authentication/SingUp/SingUp';
import WhatsappConnection from './components/WhatsappConnection/WhatsappConnection';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ErrorMessage from './components/templates/ErrorMessage/ErrorMessage';
import { connect } from 'react-redux';
import Login from './components/authentication/Login/Login';
import { useEffect } from 'react';
import Loading from './components/templates/Loading/Loading';
import { loginRefresh } from './actions/authentication';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import PopupMobile from './components/templates/PopupMobile/PopupMobile';
import { changeStutusPopupByType } from './actions/popupsHeandler';
import PopupMessage from './components/templates/PopupMessage/PopupMessage';
import SendResetPassword from './components/authentication/SendResetPassword/SendResetPassword';
import ChangePassword from './components/authentication/ChangePassword/ChangePassword';


const App = props => {
  
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const mail = localStorage.getItem('userEmail');
    if (token && mail) {
      props.loginRefresh({ token, mail }, navigate);
    } else {
      if (location.pathname.split('/')[1] !== 'change-password') {
        navigate('/login');
        props.changeStutusPopupByType({ type: "Loading", yesOrNo: false });
      } else {
        props.changeStutusPopupByType({ type: "Loading", yesOrNo: false });
      } 
    };
  }, []);

  useEffect(() => {
    if (!props.qrCode.whatsappConnected && props.userData.userId) {
      navigate('/whatsapp-connection');
    };
    // if (!props.userData.userId || !props.userData.signIn) {
    //   navigate('/login');
    // };
  }, [navigate, props.userData.userId, props.qrCode.whatsappConnected]);

  


  return (
    <div className="App">
      {props.popupControler.ErrorMessage && <ErrorMessage />}
      {props.popupControler.Loading && <Loading />}
      {props.popupControler.PopupMessage && <PopupMessage />}
      <div className="isMobile">
        <PopupMobile />
      </div>
      {props.userData.signIn && <Footer />}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/sing-up" element={<SingUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/send-reset-password" element={<SendResetPassword />} />
        {/* <Route path="/change-password" element={<ChangePassword />}/> */}
        <Route path="/change-password/:mail/:resetToken" element={<ChangePassword />}/>
        <Route path="/whatsapp-connection" element={<WhatsappConnection />} />
        <Route path="*" element={<div>Hops ... Page not found</div>} />
      </Routes>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    popupControler: state.popupControler,
    qrCode: state.qrCode,
    userData: state.userData
  }
}
export default connect(mapStateToProps, { loginRefresh, changeStutusPopupByType })(App);
