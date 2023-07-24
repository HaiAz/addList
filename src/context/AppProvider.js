import React, { useState, createContext, useContext } from "react"

export const AppContext = createContext()

function AppProvider({ children }) {
  const [list, setList] = useState([])

  return <AppContext.Provider value={{ list, setList }}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const { list, setList } = useContext(AppContext)
  return {
    list,
    setList,
  }
}

export default AppProvider
