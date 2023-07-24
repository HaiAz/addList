import React, { useState, createContext, useContext } from "react"

export const appContext = createContext()

function AppProvider({ children }) {
  const [list, setList] = useState([])

  const get = () => list
  const set = (value) => setList(value)

  return <appContext.Provider value={{ get, set }}>{children}</appContext.Provider>
}

export const useAppContext = () => {
  const { get, set } = useContext(appContext)
  return {
    get,
    set,
  }
}

export default AppProvider
