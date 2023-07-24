import React, { Children, useState, createContext, useContext } from "react"

export const AppContext = createContext()

function AppProvider({ children }) {
  const [list, setList] = useState([])

  const getListStudent = () => list
  const setListStudent = (value) => setList(value)

  return (
    <AppContext.Provider value={{ getListStudent, setListStudent }}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => {
  const { getListStudent, setListStudent } = useContext(AppContext)
  return {
    getListStudent,
    setListStudent,
  }
}

export default AppProvider
