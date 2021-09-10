import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import store from './store'

import App from './App'

import { ConfigProvider } from 'antd'
import locale from 'antd/lib/locale/ru_RU'
import 'moment/locale/ru'

import './styles/index.sass'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ConfigProvider locale={locale}>
          <App />
        </ConfigProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)