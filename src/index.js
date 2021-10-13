import React from 'react'
import ReactDOM from 'react-dom'

import { Logo } from './components/logo'

function App() {
  return (
    <div>
      <Logo width="80" height="80" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
