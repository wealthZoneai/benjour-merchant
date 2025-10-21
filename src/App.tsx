import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppRouters from './Router/AppRouters'

function App() {
  return (
    <div>
      <ToastContainer />
      <AppRouters />
    </div>
  );
}

export default App;
