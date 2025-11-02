import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppRouters from './Router/AppRouters'
import NetworkStatusHandler from "./components/netWork/NetworkStatusHandler";
import NewOrderPopup from "./components/NewOrderPopup";

function App() {
  return (
    <div>
      <ToastContainer />
       <NetworkStatusHandler />
      <AppRouters />
    </div>
  );
 
}

export default App;
