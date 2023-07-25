import React, { useState } from "react"
import { arrayMoveImmutable } from "array-move"
import { useAppContext } from "./context/AppProvider"
import InputForm from "./InputForm"
function List() {
  const { list, setList } = useAppContext()
  const [studentInfo, setStudentInfo] = useState()

  //delete item in arr
  const deleteItem = (id) => {
    console.log(id)
    const arr = list.filter((item) => item.id !== id)
    console.log("arr:", arr)
    setList(arr)
  }

  //edit select item value
  const editItem = (id) => {
    const findInfo = list.find((item) => item.studentCode === id)
    setStudentInfo(findInfo)
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
    <div>
      <InputForm />
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

export default List
