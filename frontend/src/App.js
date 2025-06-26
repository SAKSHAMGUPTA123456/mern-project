
import './input.css';
import './output.css';
import { Setup } from './setup';
import { Authprovider } from './auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
<Authprovider>
  <Setup/>
   <ToastContainer />
 </Authprovider>
    
  );
}

export default App;
