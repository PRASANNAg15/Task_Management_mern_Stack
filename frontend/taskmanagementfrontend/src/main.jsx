import { createRoot } from 'react-dom/client'
import './index.css'
import store from"./Redux/Store.jsx"
import AppRouter from './Router/AppRouter.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
    <Provider store={store}>
    <AppRouter/>
    </Provider>
    </BrowserRouter>
 
)
