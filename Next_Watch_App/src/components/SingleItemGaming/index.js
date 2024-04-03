import {useState, useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {useParams} from 'react-router-dom'
import React from 'react'
import ThemeContext from '../changeTheme'
import ReactPlayer from 'react-player'
import SideBar from '../SideBar'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const SingleItemGaming = () => {
  const {id} = useParams()
  const {addVideo} = useContext(ThemeContext)
  const tapSaved = () => {
    addVideo(apiDetails.responseData)
  }
  const Apiurl = `https://apis.ccbp.in/videos/${id}`
  const [apiDetails, setApiDetails] = useState({
    apiStatus: apiStatusConstants.initial,
    responseData: null,
    errorMsg: null,
  })
  useEffect(() => {
    const gettingViedos = async () => {
      setApiDetails({
        apiStatus: apiStatusConstants.inProgress,
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
      const response = await fetch(Apiurl, options)
      const fetcheddata = await response.json()

      const data = fetcheddata.video_details
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
        setApiDetails(prevApiDetails => ({
          ...prevApiDetails,
          apiStatus: apiStatusConstants.success,
          responseData: formatedData,
        }))
      } else {
        setApiDetails(prevApiDetails => ({
          ...prevApiDetails,
          apiStatus: apiStatusConstants.failure,
          errorMsg: fetcheddata.message,
        }))
      }
    }
    gettingViedos()
  }, [])
  const successView = () => {
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
  const failureView = () => {
    return (
      <div>
        <SideBar />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="no viedos"
        />
      </div>
    )
  }
  const renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="Rings" color="#ffffff" height={80} width={80} />
    </div>
  )
  const renderView = () => {
    // const {apiStatus} = apiDetails
    switch (apiDetails.apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return successView()
      case apiStatusConstants.failure:
        return failureView()
      default:
        return null
    }
  }
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="SideBar">
        <SideBar />
      </div>
      {renderView()}
    </div>
  )
}
export default SingleItemGaming
