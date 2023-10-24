import { createRoot } from 'react-dom/client';
import App from './App';
import ContextProvider from './components/context/ContextProvider';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App/>
  </ContextProvider>
)
