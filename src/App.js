import { useState } from "react"
import { arrayMoveImmutable } from "array-move"
import { Formik, Form, Field, useFormik } from "formik"
import * as yup from "yup"

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

  const formik = useFormik({
    initialValues: {
      studentCode: "",
      studentName: "",
      className: "",
      math: "",
      physics: "",
      chemistry: "",
    },

    validationSchema: yup.object().shape({
      studentCode: yup
        .number()
        .min(6, "Student code must be 6 characters!")
        .max(6, "Student code must be 6 characters!")
        .required("Please enter student code!"),
      studentName: yup.string().min(6).max(50, "Too long!").required("Please enter student name!"),
      className: yup.string().min(3).max(50).required("Please enter class!"),
      math: yup.number().required("Math score required!"),
      physics: yup.number().required("Math physics required!"),
      chemistry: yup.number().required("Chemistry score required!"),
    }),

    onSubmit: (values) => {
      console.log("123123")
      console.log("values: ", values)
    },
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

  //delete item in arr
  const deleteItem = (id) => {
    console.log(id)
    const arr = list.filter((item) => item.id !== id)
    console.log("arr:", arr)
    setList(arr)
  }

  //edit select item value
  const editItem = (id) => {
    const x = Number(studentInfo.math)
    const y = Number(studentInfo.physics)
    const z = Number(studentInfo.chemistry)
    const averageScore = ((x + y + z) / 3).toFixed(2)
    const newArr = list.map((item) => {
      if (item.studentCode === id) {
        return {
          ...item,
          studentCode: studentInfo.studentCode,
          studentName: studentInfo.studentName,
          className: studentInfo.className,
          math: studentInfo.math,
          physics: studentInfo.physics,
          chemistry: studentInfo.chemistry,
          averageScore: averageScore,
        }
      }
      return item
    })

    setList(newArr)
  }

  const handleArrangeList = (value) => {
    switch (value) {
      case "normal":
        const normal = [...list].sort((a, b) => a.timestamp - b.timestamp)
        setList(normal)
        break

      case "increase":
        const incs = [...list].sort((a, b) => a.averageScore - b.averageScore)
        setList(incs)
        break

      case "decrease":
        const desc = [...list].sort((a, b) => b.averageScore - a.averageScore)
        setList(desc)
        break

      default:
        break
    }
  }

  //move item up
  const handleMoveItemUp = (index) => {
    if (index === 0) {
      alert("Can't move this item!")
      return
    }
    const newArr = arrayMoveImmutable(list, index, index - 1)
    setList(newArr)
  }

  //move item down
  const handleMoveItemDown = (index) => {
    if (list.length - 1 === index) {
      alert("Can't move this item!")
      return
    }
    const newArr = arrayMoveImmutable(list, index, index + 1)
    setList(newArr)
  }

  return (
    <div className="App font-mono">
      {/* Form input */}
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-around w-screen">
          <div>
            {/* Student Code */}
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor="studentCode">
                Student Code
              </label>
              <input
                id="studentCode"
                name="studentCode"
                value={formik.values.studentCode}
                onChange={formik.handleChange}
                type="text"
                placeholder="Student Code"
                className="input input-bordered w-96 max-w-xs mb-5"
              />
            </div>

            {/* Student Name */}
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor="studentName">
                Name
              </label>
              <input
                id="studentName"
                name="studentName"
                value={formik.values.studentName}
                onChange={formik.handleChange}
                type="text"
                placeholder="Student Name"
                className="input input-bordered w-96 max-w-xs mb-5"
              />
            </div>

            {/* Class Name */}
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor="className">
                Class
              </label>
              <input
                id="className"
                name="className"
                value={formik.values.className}
                onChange={formik.handleChange}
                type="text"
                placeholder="Class"
                className="input input-bordered w-96 max-w-xs mb-5"
              />
            </div>
          </div>
          <div>
            {/* Math Score */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Math Score</span>
              </label>
              <input
                name="math"
                value={formik.values.math}
                onChange={formik.handleChange}
                type="text"
                placeholder="Math Score"
                className="input input-bordered w-96 max-w-xs mb-5"
              />
            </div>

            {/* Physics Score */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Physics Score</span>
              </label>
              <input
                name="physics"
                value={formik.values.physics}
                onChange={formik.handleChange}
                type="text"
                placeholder="Physics Score"
                className="input input-bordered w-96 max-w-xs mb-5"
              />
            </div>

            {/* Chemistry Score */}
            <div className="form-control w-full max-w-xs">
              <label className="label">Chemistry Score</label>
              <input
                name="chemistry"
                value={formik.values.chemistry}
                onChange={formik.handleChange}
                type="text"
                placeholder="Physics Score"
                className="input input-bordered w-96 max-w-xs mb-5"
              />
            </div>
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-outline w-64 flex mx-auto"
          id="Add"
          name="Add"
          value="Add"
        />
      </form>

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

      {!!list?.length && (
        <div className="text-center mt-5 uppercase font-bold">
          <p className="text-2xl">list Element</p>

          <select
            className="select select-bordered w-full max-w-xs mt-5"
            defaultValue={"normal"}
            onChange={(e) => handleArrangeList(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="increase">Increase</option>
            <option value="decrease">Decrease</option>
          </select>

          <div className="overflow-x-auto">
            <table className="table text-center mx-auto mt-5">
              <thead className="">
                <tr className="font-bold text-red-400">
                  <th>Student Code</th>
                  <th>Name</th>
                  <th>Class Name</th>
                  <th>Math Score</th>
                  <th>Physics Score</th>
                  <th>Chemistry Score</th>
                  <th>Average Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {list?.map((item, i) => (
                  <tr key={i}>
                    <td>{item.studentCode}</td>
                    <td>{item.studentName}</td>
                    <td>{item.className}</td>
                    <td>{item.math}</td>
                    <td>{item.physics}</td>
                    <td>{item.chemistry}</td>
                    <td>{item.averageScore}</td>
                    <td>
                      <button
                        className="btn btn-outline btn-success mr-5 w-24"
                        onClick={() => editItem(item.studentCode)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline btn-warning mr-5 w-24"
                        onClick={() => deleteItem(item.studentCode)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline btn-info mr-5 w-24"
                        onClick={() => handleMoveItemUp(i)}
                      >
                        Up
                      </button>
                      <button
                        className="btn btn-outline btn-warning w-24"
                        onClick={() => handleMoveItemDown(i)}
                      >
                        Down
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
