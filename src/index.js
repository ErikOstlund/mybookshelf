import '@reach/dialog/styles.css'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { Modal, ModalContents, ModalOpenButton } from './components/modal'
import { Logo } from './components/logo'

// Login/Register Form: will refactor later!
function LoginForm({ onSubmit, submitButton }) {
  function handleSubmit(event) {
    event.preventDefault()
    const { username, password } = event.target.elements

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <div>{React.cloneElement(submitButton, { type: 'submit' })}</div>
    </form>
  )
}

function App() {
  function login(formData) {
    console.log('login: ', formData)
  }

  function register(formData) {
    console.log('register: ', formData)
  }

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>My Bookshelf</h1>

      <div>
        <Modal>
          <ModalOpenButton>
            <button>Login</button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm onSubmit={login} submitButton={<button>Login</button>} />
          </ModalContents>
        </Modal>

        <Modal>
          <ModalOpenButton>
            <button>Register</button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              onSubmit={register}
              submitButton={<button>Register</button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
