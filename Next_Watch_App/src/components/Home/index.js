import './index.css'
import {useState, useEffect, useContext} from 'react'
import Header from '../Header'
import VideoList from '../VideoList'
import Loader from 'react-loader-spinner'
import SideBar from '../SideBar'
import ThemeContext from '../changeTheme'
import {IoSearchSharp} from 'react-icons/io5'

const apiVariables = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const [video, setVideo] = useState([])
  const [apiDetails, setApidetails] = useState({
    apiStatus: apiVariables.initial,
    responseData: null,
    errorMsg: null,
  })
  const [searchInput, setSearchinput] = useState('')

  const [remove, setRemove] = useState(true)
  const theme = useContext(ThemeContext)
  //fetching data scenarios
  const fetchVideo = async () => {
    try {
      setApidetails({
        apiStatus: apiVariables.inProgress,
        responseData: null,
        errorMsg: null,
      })
      //get jwttoken and pass it hrough req

      const jwtToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9.nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y'
      const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      const response = await fetch(apiUrl, options)
      const data = await response.json()

      if (response.ok) {
        const formattedData = data.videos.map(eachVideo => ({
          id: eachVideo.id,
          title: eachVideo.title,
          thumbnailUrl: eachVideo.thumbnail_url,
          viewCount: eachVideo.view_count,
          publishedAt: eachVideo.published_at,
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        }))

        setVideo(formattedData)
        setApidetails(prevApidetails => ({
          ...prevApidetails,
          apiStatus: apiVariables.success,
          responseData: formattedData,
        }))
      } else {
        setApidetails(prevApiDetails => ({
          ...prevApiDetails,
          apiStatus: apiVariables.failure,
          errorMsg: data.error_msg,
        }))
      }
    } catch (error) {
      setApidetails(prevApiDetails => ({
        ...prevApiDetails,
        apiStatus: apiVariables.failure,
        errorMsg: 'an error occured while fetching videos',
      }))
    }
  }
  useEffect(() => {
    fetchVideo()
  }, [searchInput])

  // loader view
  const renderLoadingView = () => (
    <div>
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  //failure renderview

  const renderFailureView = () => (
    <div className="failureView">
      {theme ? (
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          className="failureimg"
        />
      ) : (
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
          className="failureimg"
        />
      )}
      <h1 className="failuretext">Oops! Something Went Wrong</h1>
      <p className="failuredescription">
        We are having some trouble processing your request. Please try again.
      </p>
      <button className="retybtn">Retry</button>
    </div>
  )
  // success renderview

  const renderSuccessView = () => (
    <VideoList showVideos={video} onRetry={onRetry} />
  )

  //remove component
  const removeComponent = () => {
    setRemove(prevState => !prevState)
  }
  //search input

  const changeOfInput = event => {
    setSearchinput(event.target.value)
  }
  const getSearch = () => {
    fetchVideo()
  }

  const renderAllView = () => {
    const {apiStatus} = apiDetails
    switch (apiStatus) {
      case apiVariables.success:
        return renderSuccessView()
      case apiVariables.failure:
        return renderFailureView()
      case apiVariables.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }
  const onRetry = () => {
    setSearchinput('')
    setVideo()
  }
  return (
    <div>
      <Header />
      <SideBar />
      {remove ? (
        <div className="div-delete">
          <img
            className="banner-image"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
          />
          <p className="remove-btn" onClick={removeComponent}>
            {' '}
            X
          </p>

          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          />
          <p className="text-one" Buy Nxt Watch premium prepaid plans with></p>
          <p className="text-two"> UPI</p>
          <button className="get-button">Get it now</button>
        </div>
      ) : (
        <div></div>
      )}
      <div className="search-box">
        <input
          type="search"
          htmlFor="search-bar"
          onChange={changeOfInput}
          placeholder="search"
        />
        <button id="search-bar" onClick={getSearch}>
          <IoSearchSharp />
        </button>
      </div>
      {renderAllView()}
    </div>
  )
}

export default Home
