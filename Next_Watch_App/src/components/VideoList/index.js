import React, {useContext} from 'react'
import VideoItem from '../VideoItem'
import './index.css'

const VideoList = ({showVideos, onRetry}) => {
  const lengthVid = showVideos.length

  const onClickRetry = () => {
    onRetry()
  }

  return (
    <>
      {lengthVid > 0 ? (
        <ul className="allVideoList">
          {showVideos.map(eachVideo => (
            <VideoItem video={eachVideo} key={eachVideo.id} />
          ))}
        </ul>
      ) : (
        <div className="home-box">
          <div className="notVideoImg" style={{color: noteColor}}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />

            <h1 className="failuretext">No Search results found</h1>
            <p className="failuredescription">
              Try different keywords or remove search filter.
            </p>
            <button className="retybtn" onClick={onClickRetry}>
              Retry
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default VideoList
