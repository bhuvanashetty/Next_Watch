import SideBar from '../SideBar'
import Header from '../Header'
import './index.css'
import {Link} from 'react-router-dom'
const TrendItem = props => {
  const {video} = props
  const {id, title, thumbnailUrl, viewCount, name, publishedAt} = video
  return (
    <div>
      <div className="trend-render">
        <div className="image-two">
          <Link to={`/trending/${id}`}>
            <img className="trend-img" src={thumbnailUrl} alt="kaka" />
          </Link>
        </div>
        <div className="trend-data">
          <p className="T"> {title}</p>
          <p className="N"> {name}</p>
          <p className="views-publish">
            {viewCount} {publishedAt}{' '}
          </p>
        </div>
      </div>
    </div>
  )
}
export default TrendItem
