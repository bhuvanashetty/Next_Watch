import TrendItem from '../TrendItem'
import {FaFireAlt} from 'react-icons/fa'
import './index.css'
const TrendList = props => {
  const {showVideo} = props

  return (
    <div className="trend-box">
      <div className="trend-icon">
        <FaFireAlt size={50} color="red" />
        <h1 className="trending"> Trending</h1>
      </div>
      <ul>
        {showVideo.map(eachVideo => (
          <TrendItem video={eachVideo} key={eachVideo.id} />
        ))}
      </ul>
    </div>
  )
}
export default TrendList
