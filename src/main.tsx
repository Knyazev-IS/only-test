import ReactDOM from 'react-dom/client';
import { App } from './pages/App/App';
import { ReactNode } from 'react';
import './common/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render((<App />) as ReactNode);
