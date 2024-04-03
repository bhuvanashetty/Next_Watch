import {useState, useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {useParams} from 'react-router-dom'
import React from 'react'
import ReactPlayer from 'react-player'
import SideBar from '../SideBar'
import Header from '../Header'
import ThemeContext from '../changeTheme'
import './index.css'
const apiVariables = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
}
const SingleItemHome = () => {
  const {id} = useParams()
  const {addVideo} = useContext(ThemeContext)
  const tapSaved = () => {
    addVideo(apiDetails.responseData)
  }
  const [apiDetails, setApidetails] = useState({
    apiStatus: apiVariables.initial,
    responseData: null,
    errorMsg: null,
  })

  const homeVideos = async () => {
    try {
      setApidetails({
        apiStatus: apiVariables.in_progress,
        responseData: null,
        errorMsg: null,
      })
      const apiUrl = `https://apis.ccbp.in/videos/${id}`
      const jwtToken = Cookies.get('jwt_token')
      options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok) {
        const formatedData = {
          id: data.id,
          title: data.title,
          videoUrl: data.video_url,
          thumbnailUrl: data.thumbnail_url,
          channelName: data.channel.name,
          profileImage: data.channel.profile_image_url,
          viewCount: data.view_count,
          publishedAt: data.published_at,
          description: data.description,
        }
        setApidetails(prevApidetails => ({
          ...prevApidetails,
          apiStatus: apiVariables.success,
          responseData: formatedData,
        }))
      } else {
        setApidetails(prevApidetails => ({
          ...prevApidetails,
          apiStatus: apiVariables.failure,
          errorMsg: data.error_Msg,
        }))
      }
    } catch (error) {
      setApidetails(prevApidetails => ({
        ...prevApidetails,
        apiStatus: apiVariables.failure,
        responseData: null,
        errorMsg: 'an error occured while fetching ',
      }))
    }
  }
  useEffect(() => {
    homeVideos()
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
    const {
      description,
      publishedAt,
      viedoTitle,
      videoUrl,
      thumbnailUrl,
      channelName,
      profileImage,
      viewCount,
    } = responseData
    return (
      <div className="gamezone">
        <button className="saved-button" style={{zIndex: 1000}}>
          Saved
        </button>
        <ReactPlayer url={videoUrl} />
        <p>{viedoTitle}</p>
        <p>{viewCount}</p>
        <p className="P">{publishedAt}</p>
        <img className="image" src={profileImage} alt="sghs" />
        <p className="channel">{channelName}</p>
        <button
          className="saved-button"
          onClick={tapSaved}
          style={{zIndex: 1000}}
        >
          Saved
        </button>
        <p>{description}</p>
      </div>
    )
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
    <div className="item-home">
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
export default SingleItemHome
