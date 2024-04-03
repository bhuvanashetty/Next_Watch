import React from 'react'

const ThemeContext = React.createContext({
  theme: false,
  changeTheme: () => {},
  savedVideos: [],
  addVideo: () => {},
})
export default ThemeContext
