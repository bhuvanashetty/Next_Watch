import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import './App.css'
import {useContext, useState} from 'react'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import ThemeContext from './components/changeTheme'
import ProtectedRoute from './components/ProtectedRoute'
import SingleItemGaming from './components/SingleItemGaming'
import SingleItemTrending from './components/SingleItemTrending'
import SingleItemHome from './components/SingleItemHome'
import ItemSaved from './components/savedVideos'
const App = () => {
  const [theme, setTheme] = useState(false)
  const [savedVideos, setSavedVideos] = useState([])

  const changeTheme = () => {
    setTheme(prevState => !prevState)
  }

  const addVideo = video => {
    const index = savedVideos.findIndex(eachVideo => eachVideo.id === video.id)
    if (index === -1) setSavedVideos([...savedVideos, video])
    else {
      const updatedSavedVideos = savedVideos.filter(
        eachVideo => eachVideo.id !== video.id,
      )
      setSavedVideos(updatedSavedVideos)
    }
  }

  return (
    <ThemeContext.Provider value={{theme, changeTheme, savedVideos, addVideo}}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/:id"
            element={
              <ProtectedRoute>
                <SingleItemHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trending"
            element={
              <ProtectedRoute>
                <Trending />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trending/:id"
            element={
              <ProtectedRoute>
                <SingleItemTrending />
              </ProtectedRoute>
            }
          />

          <Route
            path="/gaming"
            element={
              <ProtectedRoute>
                <Gaming />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Gaming/:id"
            element={
              <ProtectedRoute>
                <SingleItemGaming />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <ItemSaved />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}
export default App
