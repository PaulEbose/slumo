import { createElement, StrictMode } from 'react'
import { render } from 'react-dom'
import App from './App'
import './index.css'
import 'semantic-ui-css/semantic.min.css'

const Root = createElement(StrictMode, null, createElement(App))

render(Root, document.getElementById('root'))
