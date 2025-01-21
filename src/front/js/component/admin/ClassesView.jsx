import React, { useState, useEffect, useContext } from "react"
import { Plus, Edit, Trash, X } from "lucide-react"
import { Context } from "../../store/appContext"

const ClassesView = () => {
  const { store, actions } = useContext(Context)
  const [newClass, setNewClass] = useState({ name: "", teacher: "", capacity: "", schedule: "" })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClass, setEditingClass] = useState(null)

  useEffect(() => {
    actions.fetchClasses()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (editingClass) {
      setEditingClass({ ...editingClass, [name]: value })
    } else {
      setNewClass({ ...newClass, [name]: value })
    }
  }

  const handleAddClass = (e) => {
    e.preventDefault()
    actions.addClass(newClass)
    setNewClass({ name: "", teacher: "", capacity: "", schedule: "" })
  }

  const handleEditClass = (classItem) => {
    setEditingClass(classItem)
    setIsModalOpen(true)
  }

  const handleUpdateClass = (e) => {
    e.preventDefault()
    actions.updateClass(editingClass.id, editingClass)
    setIsModalOpen(false)
    setEditingClass(null)
  }

  const handleDeleteClass = (id) => {
    actions.deleteClass(id)
  }

  return (
    <div>
      <h1 className="tw-text-3xl tw-font-semibold tw-mb-6">Gestión de Clases</h1>
      <div className="tw-mb-6">
        <form onSubmit={handleAddClass} className="tw-flex tw-space-x-4">
          <input
            type="text"
            name="name"
            value={newClass.name}
            onChange={handleInputChange}
            placeholder="Nombre de la clase"
            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <input
            type="text"
            name="teacher"
            value={newClass.teacher}
            onChange={handleInputChange}
            placeholder="Profesor"
            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <input
            type="number"
            name="capacity"
            value={newClass.capacity}
            onChange={handleInputChange}
            placeholder="Capacidad"
            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <input
            type="text"
            name="schedule"
            value={newClass.schedule}
            onChange={handleInputChange}
            placeholder="Horario"
            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <button
            type="submit"
            className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-flex tw-items-center"
          >
            <Plus className="tw-w-5 tw-h-5 tw-mr-2" />
            Agregar Clase
          </button>
        </form>
      </div>
      <table className="tw-w-full tw-bg-white tw-shadow-md tw-rounded-lg">
        <thead className="tw-bg-gray-100">
          <tr>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Nombre
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Profesor
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Capacidad
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Horario
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="tw-divide-y tw-divide-gray-200">
          {store.classes.map((classItem) => (
            <tr key={classItem.id}>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{classItem.name}</td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{classItem.teacher}</td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{classItem.capacity}</td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{classItem.schedule}</td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                <button
                  className="tw-text-blue-600 hover:tw-text-blue-900 tw-mr-3"
                  onClick={() => handleEditClass(classItem)}
                >
                  <Edit className="tw-w-5 tw-h-5" />
                </button>
                <button
                  className="tw-text-red-600 hover:tw-text-red-900"
                  onClick={() => handleDeleteClass(classItem.id)}
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
              <h3 className="tw-text-xl tw-font-semibold">Editar Clase</h3>
              <button onClick={() => setIsModalOpen(false)} className="tw-text-gray-500 hover:tw-text-gray-700">
                <X className="tw-w-6 tw-h-6" />
              </button>
            </div>
            <form onSubmit={handleUpdateClass} className="tw-space-y-4">
              <div>
                <label htmlFor="name" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Nombre de la clase
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editingClass.name}
                  onChange={handleInputChange}
                  className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="teacher" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Profesor
                </label>
                <input
                  type="text"
                  name="teacher"
                  id="teacher"
                  value={editingClass.teacher}
                  onChange={handleInputChange}
                  className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="capacity" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Capacidad
                </label>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  value={editingClass.capacity}
                  onChange={handleInputChange}
                  className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="schedule" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Horario
                </label>
                <input
                  type="text"
                  name="schedule"
                  id="schedule"
                  value={editingClass.schedule}
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

export default ClassesView

