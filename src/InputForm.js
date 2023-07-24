import React from "react"
import { Formik, Form, Field, useFormik } from "formik"
import * as yup from "yup"

function InputForm() {
  const InputSchema = yup.object().shape({
    studentCode: yup.string().min(6).max(6).required("Please enter student code!"),
    studentName: yup.string().min(6).max(50).required("Please enter student name!"),
    className: yup.string().max(50).required("Please enter class!"),
    math: yup.number().required("Math score required!"),
    physics: yup.number().required("Math physics required!"),
    chemistry: yup.number().required("Chemistry score required!"),
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
      studentCode: yup.string().min(6).max(6).required("Please enter student code!"),
      studentName: yup.string().min(6).max(50).required("Please enter student name!"),
      className: yup.string().max(50).required("Please enter class!"),
      math: yup.number().required("Math score required!"),
      physics: yup.number().required("Math physics required!"),
      chemistry: yup.number().required("Chemistry score required!"),
    }),

    onSubmit: (values) => {
      console.log("123123")
      console.log("values: ", values)
    },
  })
  return (
    <div>
      <Formik
        initialValues={{
          studentCode: "",
          studentName: "",
          className: "",
          math: "",
          physics: "",
          chemistry: "",
        }}
        validationSchema={InputSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values)
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col">
            <div className="flex justify-around">
              <div>
                <div className="flex flex-col">
                  <label className="label" htmlFor="studentCode">
                    Student Code
                  </label>
                  <Field
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
    </div>
  )
}

export default InputForm
