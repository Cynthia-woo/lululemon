import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reducers from "./reducers";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

const root = ReactDOM.createRoot(document.getElementById('root'));
const reduxStore = createStore(reducers, applyMiddleware(thunk))


root.render(
    <Provider store={reduxStore}>
        <App/>
    </Provider>
);

