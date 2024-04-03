import GameItem from '../GameItem'
import './index.css'
import {SiYoutubegaming} from 'react-icons/si'
const GameList = props => {
  const {showGames} = props

  return (
    <div className="game-box">
      <div className="game-icon">
        <SiYoutubegaming size={50} color="red" />
        <h1 className="gaming"> Gaming </h1>
      </div>
      <ul className="list-two">
        {showGames.map(eachVideo => (
          <GameItem video={eachVideo} key={eachVideo.id} />
        ))}
      </ul>
    </div>
  )
}
export default GameList
