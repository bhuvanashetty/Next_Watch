import SideBar from '../SideBar'
import Header from '../Header'
import React, {useContext} from 'react'
import ThemeContext from '../changeTheme'
import SingleItemTrending from '../SingleItemTrending'
import VideoItem from '../VideoItem'
import './index.css'

const ItemSaved = () => {
  // const addVideo = () => {}
  const {isDarkTheme, savedVideos} = useContext(ThemeContext)
  const list = savedVideos.length
  return (
    <div className="saved-game">
      <SideBar />
      {list > 0 ? (
        <div className="l">
          {savedVideos.map(eachVideos => (
            <VideoItem id={eachVideos.id} video={eachVideos} />
          ))}
        </div>
      ) : (
        <div className="l">
          <img
            className="error-image"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <h3>No saved videos found</h3>
          <p>You can save your videos while watching them</p>
        </div>
      )}
    </div>
  )
}
export default ItemSaved
