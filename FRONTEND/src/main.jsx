import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd'; // Importa ConfigProvider de Ant Design
import es_ES from 'antd/lib/locale/es_ES'; // Importa el locale en español
import 'moment/locale/es'; // Configura moment en español
import 'antd/dist/reset.css'; // Importa los estilos de Ant Design
import App from './App';
import './styles/index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envuelve tu aplicación con ConfigProvider */}
    <ConfigProvider locale={es_ES}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);