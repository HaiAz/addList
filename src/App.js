import { useState } from "react"
import InputForm from "./InputForm"
import List from "./List"
function App() {
  const [list, setList] = useState([])
  const [studentInfo, setStudentInfo] = useState({
    studentCode: "",
    studentName: "",
    className: "",
    math: "",
    physics: "",
    chemistry: "",
  })

  //get input value and set value to student info
  const handleChange = (e) => {
    const { name, value } = e.target
    setStudentInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  //get student info and add to list
  const getInputValue = () => {
    const x = Number(studentInfo.math)
    const y = Number(studentInfo.physics)
    const z = Number(studentInfo.chemistry)
    const averageScore = ((x + y + z) / 3).toFixed(2)
    const timestamp = new Date().getTime()
    const arr = [...list, { ...studentInfo, averageScore, timestamp }]

    setList(arr)
    setStudentInfo({
      studentCode: "",
      studentName: "",
      className: "",
      math: "",
      physics: "",
      chemistry: "",
    })
  }

  //Queue
  const handleQueue = () => {
    if (list.length === 0) {
      alert("There's nothing left in this list")
    }
    setList(list.slice(1))
  }

  //Stack
  const handleStack = () => {
    if (list.length === 0) {
      alert("There's nothing left in this list")
    }
    setList(list.slice(0, -1))
  }

  return (
    <div className="App font-mono">
      {/* Form input */}
      <InputForm />

      <div className="flex justify-center mt-5">
        <div className="mr-40">
          <button className="btn btn-outline btn-primary" onClick={handleQueue}>
            Queue
          </button>
        </div>
        <div className="border-x border-black h-10"></div>
        <div className="ml-40">
          <button className="btn btn-outline btn-secondary" onClick={handleStack}>
            Stack
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
