import './App.css';
import SingUp from './components/authentication/SingUp/SingUp';
import WhatsappConnection from './components/WhatsappConnection/WhatsappConnection';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ErrorMessage from './components/templates/ErrorMessage/ErrorMessage';
import { connect } from 'react-redux';


const App = props => {

  return (
    <div className="App">
      {props.popupControler.ErrorMessage && <ErrorMessage />}
      <BrowserRouter>
        <Link to="/sing-up">Sing up</Link>
        <Link to="/whatsapp-connection">Whatsapp Connection</Link>
        <Routes>
          <Route path="sing-up" element={<SingUp />} />
          <Route path="whatsapp-connection" element={<WhatsappConnection />} />
          <Route path="*" element={<div>Hops ... Page not found</div>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}


const mapStateToProps = state => {
  return {
    popupControler: state.popupControler,
  }
}
export default connect(mapStateToProps, {  })(App);
