import {Link} from 'react-router-dom'
import {IoHomeSharp} from 'react-icons/io5'
import {FaFireAlt} from 'react-icons/fa'
import {MdSaveAlt} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import './index.css'
const SideBar = () => {
  return (
    <div className="sidebar-box">
      <div className="trend-container">
        <FaFireAlt size={20} />
        <Link to="/trending">Trending</Link>
      </div>
      <div className="game-container">
        <SiYoutubegaming size={20} />
        <Link to="/Gaming">Gaming </Link>
      </div>
      <div className="saved-container">
        <MdSaveAlt size={20} />
        <Link to="/saved">saved </Link>
      </div>
      <div className="home-container">
        <IoHomeSharp size={20} />
        <Link to="/"> Home</Link>
      </div>
    </div>
  )
}
export default SideBar
