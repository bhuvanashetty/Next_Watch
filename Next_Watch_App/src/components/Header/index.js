import './index.css'
import {IoMdMoon} from 'react-icons/io'
import ThemeContext from '../changeTheme'
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = () => {
  const {theme, changeTheme} = useContext(ThemeContext)
  const color = theme ? 'black' : 'white'
  const bgColor = theme ? 'white' : 'black'
  const change = () => {
    changeTheme()
  }
  const navigate = useNavigate()
  const loggingout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }
  return (
    <div className="nav-bar" style={{color: color, backgroundColor: bgColor}}>
      <img
        className="nxtwatch-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
      />
      <div className="moon-icon">
        <IoMdMoon size={65} onClick={change} />
      </div>
      <img
        className="prof"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
        alt=" profile"
      />

      <button className="logout-btn" onClick={loggingout}>
        Logout
      </button>
    </div>
  )
}
export default Header
