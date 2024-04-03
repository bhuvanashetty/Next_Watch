import {Link} from 'react-router-dom'

import './index.css'
const GameItem = props => {
  const {video} = props
  const {id, title, thumbnailUrl, viewCount} = video
  return (
    <div className="GameItem-box">
      <Link to={`/Gaming/${id}`}>
        <img className="game-img" src={thumbnailUrl} alt="hskaka" />
      </Link>

      <p className="title">{title}</p>

      <p className="views"> {viewCount} world Publishing Data </p>
    </div>
  )
}
export default GameItem
