import './index.css'
import {useState, useEffect} from 'react'
import TrendList from '../TrendList'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SideBar from '../SideBar'
import Header from '../Header'
const apiVariables = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}
const Trending = () => {
  // const [trendVideo, setTrendVideo] = useState([])

  const [apiDetails, setApidetails] = useState({
    apiStatus: apiVariables.initial,
    responseData: null,
    errorMsg: null,
  })

  // feteching trending data
  const fetchTrend = async () => {
    try {
      setApidetails({
        apiStatus: apiVariables.in_progress,
        responseData: null,
        errorMsg: null,
      })
      const jwtToken = Cookies.get('jwt_token')

      const apiUrl = 'https://apis.ccbp.in/videos/trending'
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok) {
        const formattedData = data.videos.map(eachTrend => ({
          id: eachTrend.id,
          title: eachTrend.title,
          thumbnailUrl: eachTrend.thumbnail_url,
          viewCount: eachTrend.view_count,
          publishedAt: eachTrend.published_at,
          name: eachTrend.channel.name,
          profileImageUrl: eachTrend.channel.profile_image_url,
        }))
        // setTrendVideo(formattedData)
        setApidetails(prevApidetails => ({
          ...prevApidetails,
          apiStatus: apiVariables.success,
          responseData: formattedData,
        }))
      } else {
        setApidetails(prevApidetails => ({
          ...prevApidetails,
          apiStatus: apiVariables.failure,
          errorMsg: data.error_msg,
        }))
      }
    } catch (error) {
      setApidetails(prevApidetails => ({
        ...prevApidetails,
        apiStatus: apiVariables.failure,
        errorMsg: 'error occured while fetching data',
      }))
    }
  }
  //use effect
  useEffect(() => {
    fetchTrend()
  }, [])
  // loader view
  const renderLoadingView = () => (
    <div>
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )
  //failure renderview
  const renderFailureView = () => (
    <div className="failureView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="failureimg"
      />
      <h1 className="failuretext">Oops! Something Went Wrong</h1>
      <p className="failuredescription">
        We are having some trouble processing your request. Please try again.
      </p>
      <button className="retybtn">Retry</button>
    </div>
  )
  //success renderview
  const renderSuccessView = () => {
    const {responseData} = apiDetails
    return <TrendList showVideo={responseData} />
  }
  const renderAllView = () => {
    const {apiStatus} = apiDetails
    switch (apiStatus) {
      case apiVariables.success:
        return renderSuccessView()
      case apiVariables.failure:
        return renderFailureView()
      case apiVariables.in_progress:
        return renderLoadingView()
      default:
        return null
    }
  }
  return (
    <div className="Trending-box">
      <div className="header">
        <Header />
      </div>
      <div className="SideBar">
        <SideBar />
      </div>

      {renderAllView()}
    </div>
  )
}

export default Trending
