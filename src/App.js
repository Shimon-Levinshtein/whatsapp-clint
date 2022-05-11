import './App.css';
import SingUp from './components/authentication/SingUp/SingUp';
import WhatsappConnection from './components/WhatsappConnection/WhatsappConnection';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {

  return (
    <div className="App">
jdfkdjdjkjdd

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

export default App;
