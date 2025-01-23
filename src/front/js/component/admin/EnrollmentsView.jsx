import React, { useState, useEffect, useContext } from "react"
import { Plus, Edit, Trash, X } from "lucide-react"
import { Context } from "../../store/appContext"
//import DatePicker from "react-datepicker" //Removed as per update 1
//import "react-datepicker/dist/react-datepicker.css" //Removed as per update 1

const EnrollmentsView = () => {
  const { store, actions } = useContext(Context)
  const [newEnrollment, setNewEnrollment] = useState({ studentName: "", className: "", enrollmentDate: new Date() })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEnrollment, setEditingEnrollment] = useState(null)

  useEffect(() => {
    actions.fetchEnrollments()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (editingEnrollment) {
      setEditingEnrollment({ ...editingEnrollment, [name]: value })
    } else {
      setNewEnrollment({ ...newEnrollment, [name]: value })
    }
  }

  //const handleDateChange = (date) => { //Removed as per update 2 and 4
  //  if (editingEnrollment) {
  //    setEditingEnrollment({ ...editingEnrollment, enrollmentDate: date })
  //  } else {
  //    setNewEnrollment({ ...newEnrollment, enrollmentDate: date })
  //  }
  //} //Removed as per update 2 and 4

  const handleAddEnrollment = (e) => {
    e.preventDefault()
    actions.addEnrollment(newEnrollment)
    setNewEnrollment({ studentName: "", className: "", enrollmentDate: new Date() })
  }

  const handleEditEnrollment = (enrollment) => {
    setEditingEnrollment({ ...enrollment, enrollmentDate: new Date(enrollment.enrollmentDate) })
    setIsModalOpen(true)
  }

  const handleUpdateEnrollment = (e) => {
    e.preventDefault()
    actions.updateEnrollment(editingEnrollment.id, editingEnrollment)
    setIsModalOpen(false)
    setEditingEnrollment(null)
  }

  const handleDeleteEnrollment = (id) => {
    actions.deleteEnrollment(id)
  }

  return (
    <div>
      <h1 className="tw-text-3xl tw-font-semibold tw-mb-6">Gestión de Inscripciones</h1>
      <div className="tw-mb-6">
        <form onSubmit={handleAddEnrollment} className="tw-flex tw-space-x-4">
          <input
            type="text"
            name="studentName"
            value={newEnrollment.studentName}
            onChange={handleInputChange}
            placeholder="Nombre del estudiante"
            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <input
            type="text"
            name="className"
            value={newEnrollment.className}
            onChange={handleInputChange}
            placeholder="Nombre de la clase"
            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <input
            type="date"
            name="enrollmentDate"
            value={newEnrollment.enrollmentDate.toISOString().substring(0, 10)}
            onChange={handleInputChange}
            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <button
            type="submit"
            className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-flex tw-items-center"
          >
            <Plus className="tw-w-5 tw-h-5 tw-mr-2" />
            Agregar Inscripción
          </button>
        </form>
      </div>
      <table className="tw-w-full tw-bg-white tw-shadow-md tw-rounded-lg">
        <thead className="tw-bg-gray-100">
          <tr>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Estudiante
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Clase
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Fecha de Inscripción
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="tw-divide-y tw-divide-gray-200">
          {store.enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{enrollment.studentName}</td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{enrollment.className}</td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                {new Date(enrollment.enrollmentDate).toLocaleDateString()}
              </td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                <button
                  className="tw-text-blue-600 hover:tw-text-blue-900 tw-mr-3"
                  onClick={() => handleEditEnrollment(enrollment)}
                >
                  <Edit className="tw-w-5 tw-h-5" />
                </button>
                <button
                  className="tw-text-red-600 hover:tw-text-red-900"
                  onClick={() => handleDeleteEnrollment(enrollment.id)}
                >
                  <Trash className="tw-w-5 tw-h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-bg-gray-600 tw-bg-opacity-50 tw-overflow-y-auto tw-h-full tw-w-full tw-flex tw-items-center tw-justify-center">
          <div className="tw-bg-white tw-p-8 tw-rounded-md tw-shadow-lg tw-w-1/2">
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
              <h3 className="tw-text-xl tw-font-semibold">Editar Inscripción</h3>
              <button onClick={() => setIsModalOpen(false)} className="tw-text-gray-500 hover:tw-text-gray-700">
                <X className="tw-w-6 tw-h-6" />
              </button>
            </div>
            <form onSubmit={handleUpdateEnrollment} className="tw-space-y-4">
              <div>
                <label htmlFor="studentName" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Nombre del estudiante
                </label>
                <input
                  type="text"
                  name="studentName"
                  id="studentName"
                  value={editingEnrollment.studentName}
                  onChange={handleInputChange}
                  className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="className" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Nombre de la clase
                </label>
                <input
                  type="text"
                  name="className"
                  id="className"
                  value={editingEnrollment.className}
                  onChange={handleInputChange}
                  className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="enrollmentDate" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Fecha de inscripción
                </label>
                <input
                  type="date"
                  name="enrollmentDate"
                  id="enrollmentDate"
                  value={editingEnrollment.enrollmentDate.toISOString().substring(0, 10)}
                  onChange={handleInputChange}
                  className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
                  required
                />
              </div>
              <div className="tw-flex tw-justify-end tw-space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="tw-bg-gray-200 tw-text-gray-700 tw-px-4 tw-py-2 tw-rounded-md hover:tw-bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md hover:tw-bg-blue-600"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default EnrollmentsView

