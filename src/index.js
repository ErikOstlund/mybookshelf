import { loadDevTools } from './dev-tools/load'
import './bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import { Profiler } from 'components/profiler'
import { AppProviders } from 'context'
import { App } from './app'

loadDevTools(() => {
  ReactDOM.render(
    <Profiler id="App Root" phases={['mount']}>
      <AppProviders>
        <App />
      </AppProviders>
    </Profiler>,
    document.getElementById('root')
  )
})
