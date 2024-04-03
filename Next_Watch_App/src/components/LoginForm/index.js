import {useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate, Navigate} from 'react-router-dom'
import './index.css'
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showerror, setShowerror] = useState(false)
  const [checklist, setChecklist] = useState(false)
  const navigate = useNavigate()
  const storePassword = event => {
    setPassword(event.target.value)
  }
  const storeUsername = event => {
    setUsername(event.target.value)
  }
  const checkTick = () => {
    setChecklist(prevState => !prevState)
  }
  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/')
  }
  const onSubmitFailure = error => {
    setError(error)
    setShowerror(true)
  }
  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    // making authentication req
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  if (Cookies.get('jwt_token')) {
    return <Navigate to="/" />
  }
  return (
    <div className="container">
      <div className="website">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />

        <div className="login-form">
          <form className="box" onSubmit={onSubmitForm}>
            <label className="u" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className="name"
              onChange={storeUsername}
              placeHolder="USERNAME"
            />
            <label className="p" htmlFor="pass">
              password
            </label>
            <input
              type={checklist ? 'text' : 'password'}
              className="pass"
              onChange={storePassword}
              placeHolder="Password"
            />
            <div className="check-box">
              <input
                type="checkbox"
                id="check"
                onClick={checkTick}
                value={checklist}
              />
              <label htmlFor="check"> showPassword </label>
            </div>

            <button type="submit" className="btn">
              Login
            </button>
            {showerror && <p> {error}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
export default LoginForm
