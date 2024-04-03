import React, {useContext} from 'react'
import {Link} from 'react-router-dom'

const VideoItem = ({video}) => {
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    name,
    profileImageUrl,
  } = video

  return (
    <>
      <li className="card">
        <Link to={`/trending/${id}`}>
          <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />
        </Link>
        <section className="Lower">
          <img src={profileImageUrl} alt="channel logo" className="clogo" />
          <div className="txt">
            <p className="title">{title}</p>
            <p className="name">{name}</p>
            <p className="views">
              {viewCount} views {publishedAt}
            </p>
          </div>
        </section>
      </li>
    </>
  )
}

export default VideoItem
