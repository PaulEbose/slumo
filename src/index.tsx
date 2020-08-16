import { createElement, StrictMode } from 'react'
import { render } from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import './index.css'

const Root = createElement(StrictMode, null, createElement(App))

render(Root, document.getElementById('root'))
