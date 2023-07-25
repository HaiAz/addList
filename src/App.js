import { useEffect, useState } from "react"
import { Formik, Form, Field } from "formik"
import * as yup from "yup"
import { arrayMoveImmutable } from "array-move"
import { Input } from "postcss"

function App() {
  const [list, setList] = useState([])
  const [editStudent, setEditStudent] = useState()

  //input schema
  const InputSchema = yup.object().shape({
    studentCode: yup.string().min(6).max(6).required("Please enter student code!"),
    studentName: yup.string().min(6).max(50).required("Please enter student name!"),
    className: yup.string().max(50).required("Please enter class!"),
    math: yup.number().required("Math score required!"),
    physics: yup.number().required("Math physics required!"),
    chemistry: yup.number().required("Chemistry score required!"),
  })

  //initial value
  const InputFormInitialValue = {
    studentCode: "",
    studentName: "",
    className: "",
    math: "",
    physics: "",
    chemistry: "",
  }
  //submit
  const handleSubmit = (values, { resetForm }) => {
    const a = Number(values.math)
    const b = Number(values.physics)
    const c = Number(values.chemistry)
    const averageScore = ((a + b + c) / 3).toFixed(2)
    setList([...list, { ...values, averageScore }])
    resetForm()
  }

  //edit select item value
  const editItem = (id) => {
    const studentInfo = list.find((item) => item.studentCode === id)
    if (studentInfo) {
      //destructuring
      const { studentCode, studentName, className, math, physics, chemistry } = studentInfo

      //set value to input
      InputFormInitialValue.studentCode = studentCode
      InputFormInitialValue.studentName = studentName
      InputFormInitialValue.className = className
      InputFormInitialValue.math = math
      InputFormInitialValue.physics = physics
      InputFormInitialValue.chemistry = chemistry
    }
  }

  useEffect(() => {
    console.log("hehe")
  }, [InputFormInitialValue])

  //delete item in arr
  const deleteItem = (id) => {
    const arr = list.filter((item) => item.studentCode !== id)
    setList(arr)
  }

  //get input value and set value to student info
  const handleChange = (e) => {
    // const { name, value } = e.target
    // setStudentInfo((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }))
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
      <Formik
        enableReinitialize={true}
        initialValues={InputFormInitialValue}
        validationSchema={InputSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values }) => (
          <Form className="flex flex-col">
            <div className="flex justify-around">
              <div>
                <div className="flex flex-col">
                  <label className="label" htmlFor="studentCode">
                    Student Code
                  </label>
                  <Field
                    value={values.studentCode}
                    name="studentCode"
                    placeholder="Student Code"
                    className="input input-bordered w-96 max-w-xs mb-5"
                  />
                  {errors.studentCode && touched.studentCode ? (
                    <label className="label text-red-500 text-sm">{errors.studentCode}</label>
                  ) : null}
                </div>

                <div className="flex flex-col">
                  <label className="label" htmlFor="studentName">
                    Student Name
                  </label>
                  <Field
                    value={values.studentName}
                    name="studentName"
                    placeholder="Student Name"
                    className="input input-bordered w-96 max-w-xs mb-5"
                  />
                  {errors.studentName && touched.studentName ? (
                    <label className="label text-red-500 text-sm">{errors.studentName}</label>
                  ) : null}
                </div>

                <div className="flex flex-col">
                  <label className="label" htmlFor="className">
                    Class
                  </label>
                  <Field
                    value={values.className}
                    name="className"
                    placeholder="Class"
                    className="input input-bordered w-96 max-w-xs mb-5"
                  />
                  {errors.className && touched.className ? (
                    <label className="label text-red-500 text-sm">{errors.className}</label>
                  ) : null}
                </div>
              </div>

              <div>
                <div className="flex flex-col">
                  <label className="label" htmlFor="math">
                    Math Score
                  </label>
                  <Field
                    value={values.math}
                    name="math"
                    placeholder="Math Score"
                    className="input input-bordered w-96 max-w-xs mb-5"
                  />
                  {errors.math && touched.math ? (
                    <label className="label text-red-500 text-sm">{errors.math}</label>
                  ) : null}
                </div>

                <div className="flex flex-col">
                  <label className="label" htmlFor="physics">
                    Physics Score
                  </label>
                  <Field
                    value={values.physics}
                    name="physics"
                    placeholder="Physics Score"
                    className="input input-bordered w-96 max-w-xs mb-5"
                  />
                  {errors.physics && touched.physics ? (
                    <label className="label text-red-500 text-sm">{errors.physics}</label>
                  ) : null}
                </div>

                <div className="flex flex-col">
                  <label className="label" htmlFor="chemistry">
                    Chemistry Score
                  </label>
                  <Field
                    value={values.chemistry}
                    name="chemistry"
                    placeholder="Chemistry Score"
                    className="input input-bordered w-96 max-w-xs mb-5"
                  />
                  {errors.chemistry && touched.chemistry ? (
                    <label className="label text-red-500 text-sm">{errors.chemistry}</label>
                  ) : null}
                </div>
              </div>
            </div>
            <button type="submit" className="w-[20%] mx-auto btn btn-outline btn-accent">
              Add
            </button>
          </Form>
        )}
      </Formik>

      {/* S and Q */}
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

      {/* List */}
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
