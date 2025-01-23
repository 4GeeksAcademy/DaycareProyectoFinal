import React, { useState, useEffect, useContext } from "react"
import { Plus, Edit, Trash, X } from "lucide-react"
import { Context } from "../../store/appContext"
//import DatePicker from "react-datepicker" //Removed as per update 1
// import "react-datepicker/dist/react-datepicker.css"

const InventoryView = () => {
  const { store, actions } = useContext(Context)
  const [newItem, setNewItem] = useState({ name: "", quantity: "", category: "", lastUpdated: new Date() })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => {
    actions.fetchInventory()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (editingItem) {
      setEditingItem({ ...editingItem, [name]: value })
    } else {
      setNewItem({ ...newItem, [name]: value })
    }
  }

  const handleDateChange = (date) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, lastUpdated: date })
    } else {
      setNewItem({ ...newItem, lastUpdated: date })
    }
  }

  const handleAddItem = (e) => {
    e.preventDefault()
    actions.addInventoryItem(newItem)
    setNewItem({ name: "", quantity: "", category: "", lastUpdated: new Date() })
  }

  const handleEditItem = (item) => {
    setEditingItem({ ...item, lastUpdated: new Date(item.lastUpdated) })
    setIsModalOpen(true)
  }

  const handleUpdateItem = (e) => {
    e.preventDefault()
    actions.updateInventoryItem(editingItem.id, editingItem)
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const handleDeleteItem = (id) => {
    actions.deleteInventoryItem(id)
  }

  return (
    <div>
      <h1 className="tw-text-3xl tw-font-semibold tw-mb-6">Gestión de Inventario</h1>
      <div className="tw-mb-6">
        <form onSubmit={handleAddItem} className="tw-flex tw-space-x-4">
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            placeholder="Nombre del artículo"
            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <input
            type="number"
            name="quantity"
            value={newItem.quantity}
            onChange={handleInputChange}
            placeholder="Cantidad"
            className="tw-w-24 tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <input
            type="text"
            name="category"
            value={newItem.category}
            onChange={handleInputChange}
            placeholder="Categoría"
            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <input
            type="date"
            name="lastUpdated"
            value={newItem.lastUpdated.toISOString().slice(0, 10)} //Added to format date for input
            onChange={handleInputChange}
            className="tw-w-40 tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <button
            type="submit"
            className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-flex tw-items-center"
          >
            <Plus className="tw-w-5 tw-h-5 tw-mr-2" />
            Agregar Artículo
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
              Cantidad
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Categoría
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Última Actualización
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="tw-divide-y tw-divide-gray-200">
          {store.inventory.map((item) => (
            <tr key={item.id}>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{item.name}</td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{item.quantity}</td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{item.category}</td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                {new Date(item.lastUpdated).toLocaleDateString()}
              </td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                <button
                  className="tw-text-blue-600 hover:tw-text-blue-900 tw-mr-3"
                  onClick={() => handleEditItem(item)}
                >
                  <Edit className="tw-w-5 tw-h-5" />
                </button>
                <button className="tw-text-red-600 hover:tw-text-red-900" onClick={() => handleDeleteItem(item.id)}>
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
              <h3 className="tw-text-xl tw-font-semibold">Editar Artículo</h3>
              <button onClick={() => setIsModalOpen(false)} className="tw-text-gray-500 hover:tw-text-gray-700">
                <X className="tw-w-6 tw-h-6" />
              </button>
            </div>
            <form onSubmit={handleUpdateItem} className="tw-space-y-4">
              <div>
                <label htmlFor="name" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Nombre del artículo
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editingItem.name}
                  onChange={handleInputChange}
                  className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="quantity" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Cantidad
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={editingItem.quantity}
                  onChange={handleInputChange}
                  className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Categoría
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={editingItem.category}
                  onChange={handleInputChange}
                  className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastUpdated" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Última actualización
                </label>
                <input
                  type="date"
                  name="lastUpdated"
                  id="lastUpdated"
                  value={editingItem.lastUpdated.toISOString().slice(0, 10)} //Added to format date for input
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

export default InventoryView

