import react, { useState } from "react"
import { arrayMoveImmutable } from "array-move"
function App() {
  const [studentCode, setStudentCode] = useState()
  const [name, setName] = useState()
  const [className, setClassName] = useState()
  const [mathScore, setMathScore] = useState()
  const [physicsScore, setPhysicsScore] = useState()
  const [chemistryScore, setChemistryScore] = useState()
  const [list, setList] = useState([])
  const [arrangeList, setArrangeList] = useState(list)
  
  //get value
  const getInputValue = () => {
    const x = Number(mathScore)
    const y = Number(physicsScore)
    const z = Number(chemistryScore)
    const averageScore = ((x + y + z) / 3).toFixed(2)
    const arr = [
      ...list,
      {
        studentCode,
        name,
        className,
        mathScore,
        physicsScore,
        chemistryScore,
        averageScore,
      },
    ];

    setList(arr)
    setArrangeList(arr)
    setStudentCode("")
    setName("")
    setClassName("")
    setMathScore("")
    setPhysicsScore("")
    setChemistryScore("")
  }

  //Queue
  const handleQueue = () => {
    if (list.length === 0) {
      alert("There's nothing left in this list")
    }
    setArrangeList(list.slice(1))
  }

  //Stack
  const handleStack = () => {
    if (list.length === 0) {
      alert("There's nothing left in this list")
    }
    setArrangeList(list.slice(0, -1))
  }

  //delete item in arr
  const deleteItem = (id) => {
    console.log(id);
    const arr = list.filter(item => item.id !== id);
    console.log("arr:", arr);
    setList(arr)
    setArrangeList(arr)
  }

  //edit select item value
  const editItem = (id) => {
    const x = Number(mathScore)
    const y = Number(physicsScore)
    const z = Number(chemistryScore)
    const averageScore = ((x + y + z) / 3).toFixed(2)
    const newArr = list.map((item) => {
      if (item.studentCode === id) {
        return {
          ...item,
          studentCode,
          name,
          className,
          mathScore,
          physicsScore,
          chemistryScore,
          averageScore
        }
      }
      return item
    })

    setList(newArr)
    setArrangeList(newArr)
    setStudentCode("")
    setName("")
    setClassName("")
    setMathScore("")
    setPhysicsScore("")
    setChemistryScore("")
  }

  const handleArrangeList = (value) => {
    switch (value) {
      case "normal":
        setArrangeList(list);
      break;

      case "increase":
        const asc = [...list].sort((a, b) => a.averageScore - b.averageScore);
        setArrangeList(asc);
      break;

      case "decrease":
        const desc = [...list].sort((a, b) => b.averageScore - a.averageScore);
        setArrangeList(desc);
      break;

      default:
        break;
    }
  }

  //move item up
  const handleMoveItemUp = (index) => {
    if (index === 0) {
      alert("Can't move this item!")
      return
    }
    const arr = arrangeList
    const newArr = arrayMoveImmutable(arr, index, index - 1)
    setArrangeList(newArr)
  }

  //move item down
  const handleMoveItemDown = (index) => {
    if (list.length - 1 === index) {
      alert("Can't move this item!")
      return
    }
    const arr = arrangeList
    const newArr = arrayMoveImmutable(arr, index, index + 1)
    setArrangeList(newArr)
  }

  return (
    <div className="App font-mono">
      <div className="flex justify-around w-screen">
        <div>
          <div className="form-control w-full max-w-xs">
            {/* Student Code */}
            <label className="label">
              <span className="label-text">Student Code</span>
            </label>
            <input
              value={studentCode}
              type="text"
              placeholder="Student Code"
              className="input input-bordered w-96 max-w-xs mb-5"
              onChange={(e) => setStudentCode(e.target.value)}
            />
            {studentCode === "" && (
              <label className="label">
                <span className="label-text text-red-500">Please Enter Student Code</span>
              </label>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            {/* Student Name */}
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              value={name}
              type="text"
              placeholder="Student Name"
              className="input input-bordered w-96 max-w-xs mb-5"
              onChange={(e) => setName(e.target.value)}
            />
            {name === "" && (
              <label className="label">
                <span className="label-text text-red-500">Please Enter Student Name</span>
              </label>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            {/* Class Name */}
            <label className="label">
              <span className="label-text">Class</span>
            </label>
            <input
              value={className}
              type="text"
              placeholder="Class"
              className="input input-bordered w-96 max-w-xs mb-5"
              onChange={(e) => setClassName(e.target.value)}
            />
            {className === "" && (
              <label className="label">
                <span className="label-text text-red-500">Please Enter Class Name</span>
              </label>
            )}
          </div>
        </div>
        <div>
          <div className="form-control w-full max-w-xs">
            {/* Math Score */}
            <label className="label">
              <span className="label-text">Math Score</span>
            </label>
            <input
              value={mathScore}
              type="text"
              placeholder="Math Score"
              className="input input-bordered w-96 max-w-xs mb-5"
              onChange={(e) => setMathScore(e.target.value)}
            />
            {mathScore === "" && (
              <label className="label">
                <span className="label-text text-red-500">Please Enter Math Score</span>
              </label>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            {/* Physics Score */}
            <label className="label">
              <span className="label-text">Physics Score</span>
            </label>
            <input
              value={physicsScore}
              type="text"
              placeholder="Physics Score"
              className="input input-bordered w-96 max-w-xs mb-5"
              onChange={(e) => setPhysicsScore(e.target.value)}
            />
            {physicsScore === "" && (
              <label className="label">
                <span className="label-text text-red-500">Please Enter Physics Score</span>
              </label>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            {/* Chemistry Score */}
            <label className="label">
              <span className="label-text">Chemistry Score</span>
            </label>
            <input
              value={chemistryScore}
              type="text"
              placeholder="Physics Score"
              className="input input-bordered w-96 max-w-xs mb-5"
              onChange={(e) => setChemistryScore(e.target.value)}
            />
            {chemistryScore === "" && (
              <label className="label">
                <span className="label-text text-red-500">Please Enter Chemistry Score</span>
              </label>
            )}
          </div>
        </div>
      </div>
      <button
        className="btn btn-outline w-64 flex mx-auto"
        onClick={() => getInputValue(mathScore, physicsScore, chemistryScore)}
      >
        ADD
      </button>
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
                {arrangeList?.map((item, i) => (
                  <tr key={i}>
                    <td>{item.studentCode}</td>
                    <td>{item.name}</td>
                    <td>{item.className}</td>
                    <td>{item.mathScore}</td>
                    <td>{item.physicsScore}</td>
                    <td>{item.chemistryScore}</td>
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
