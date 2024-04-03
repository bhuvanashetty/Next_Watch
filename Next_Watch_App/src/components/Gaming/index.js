import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import GameList from '../GameList'
import Loader from 'react-loader-spinner'
import SideBar from '../SideBar'
import Header from '../Header'
import './index.css'
const apiVariables = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

const Gaming = () => {
  const [apiDetails, setApidetails] = useState({
    apiStatus: apiVariables.initial,
    responseData: [],
    errorMsg: null,
  })
  const fetchGaming = async () => {
    try {
      setApidetails({
        apiStatus: apiVariables.in_progress,
        responseData: null,
        errorMsg: null,
      })

      const jwtToken = Cookies.get('jwt_token')
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const apiUrl = 'https://apis.ccbp.in/videos/gaming'
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok) {
        const formattedData = data.videos.map(eachTrend => ({
          id: eachTrend.id,
          title: eachTrend.title,
          thumbnailUrl: eachTrend.thumbnail_url,
          viewCount: eachTrend.view_count,
        }))

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
    } catch (errror) {
      setApidetails(prevApidetails => ({
        ...prevApidetails,
        apiStatus: apiVariables.failure,
        responseData: null,
        errorMsg: 'an error occured while fetching data',
      }))
    }
  }
  useEffect(() => {
    fetchGaming()
  }, [])

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
    return <GameList showGames={responseData} />
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
    <div className="box-one">
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
export default Gaming
