import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppRouters from './Router/AppRouters'
import NetworkStatusHandler from "./components/netWork/NetworkStatusHandler";
import NewOrderPopup from "./components/NewOrderPopup";
import SupportChatWidget from "./components/SupportChatWidget";

function App() {
  return (
    <div>
      <ToastContainer />
       <NetworkStatusHandler />
       <SupportChatWidget
        supportEmail="support@yourcompany.com"
        websocketUrl={null} // or "wss://your-server.com/socket"
      />
      <AppRouters />
    </div>
  );
 
}

export default App;
