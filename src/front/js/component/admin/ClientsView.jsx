import React, { useState, useEffect, useContext } from "react"
import { Plus, Search, Edit, Trash, X } from "lucide-react"
import { Context } from "../../store/appContext"

const ClientsView = () => {
  const { store, actions } = useContext(Context)
  const [newClient, setNewClient] = useState({ name: "", email: "", phone: "", status: "Activo" })
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState(null)

  useEffect(() => {
    actions.fetchClients()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (editingClient) {
      setEditingClient({ ...editingClient, [name]: value })
    } else {
      setNewClient({ ...newClient, [name]: value })
    }
  }

  const handleAddClient = async (e) => {
    e.preventDefault()
    await actions.addClient(newClient)
    setNewClient({ name: "", email: "", phone: "", status: "Activo" })
  }

  const handleEditClient = (client) => {
    setEditingClient(client)
    setIsModalOpen(true)
  }

  const handleUpdateClient = async (e) => {
    e.preventDefault()
    await actions.updateClient(editingClient.id, editingClient)
    setIsModalOpen(false)
    setEditingClient(null)
  }

  const handleDeleteClient = async (id) => {
    await actions.deleteClient(id)
  }

  const filteredClients = store.clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm),
  )

  return (
    <div className="tw-relative">
      <h2 className="tw-text-2xl tw-font-semibold tw-mb-6">Gestión de Clientes</h2>
      <div className="tw-mb-6">
        <form onSubmit={handleAddClient} className="tw-flex tw-space-x-4">
          <input
            type="text"
            name="name"
            value={newClient.name}
            onChange={handleInputChange}
            placeholder="Nombre"
            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <input
            type="email"
            name="email"
            value={newClient.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <input
            type="tel"
            name="phone"
            value={newClient.phone}
            onChange={handleInputChange}
            placeholder="Teléfono"
            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <select
            name="status"
            value={newClient.status}
            onChange={handleInputChange}
            className="tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          <button
            type="submit"
            className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-flex tw-items-center"
          >
            <Plus className="tw-w-5 tw-h-5 tw-mr-2" />
            Agregar Cliente
          </button>
        </form>
      </div>
      <div className="tw-mb-6">
        <div className="tw-relative">
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-pl-10 tw-pr-4 tw-py-2"
          />
          <Search className="tw-absolute tw-left-3 tw-top-2.5 tw-text-gray-400" />
        </div>
      </div>
      <table className="tw-w-full tw-bg-white tw-shadow-md tw-rounded-lg">
        <thead className="tw-bg-gray-100">
          <tr>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              ID
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Nombre
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Email
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Teléfono
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Estado
            </th>
            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="tw-divide-y tw-divide-gray-200">
          {filteredClients.map((client) => (
            <tr key={client.id}>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{client.id}</td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{client.name}</td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{client.email}</td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{client.phone}</td>
              <td className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
                {client.status === "Activo" ? (
                  <span className="tw-inline-flex tw-items-center tw-justify-center tw-py-1 tw-px-2 tw-rounded-full tw-text-xs tw-font-semibold tw-bg-green-100 tw-text-green-800">
                    Activo
                  </span>
                ) : (
                  <span className="tw-inline-flex tw-items-center tw-justify-center tw-py-1 tw-px-2 tw-rounded-full tw-text-xs tw-font-semibold tw-bg-red-100 tw-text-red-800">
                    Inactivo
                  </span>
                )}
              </td>
              <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                <button
                  className="tw-text-blue-600 hover:tw-text-blue-900 tw-mr-3"
                  onClick={() => handleEditClient(client)}
                >
                  <Edit className="tw-w-5 tw-h-5" />
                </button>
                <button className="tw-text-red-600 hover:tw-text-red-900" onClick={() => handleDeleteClient(client.id)}>
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
              <h3 className="tw-text-xl tw-font-semibold">Editar Cliente</h3>
              <button onClick={() => setIsModalOpen(false)} className="tw-text-gray-500 hover:tw-text-gray-700">
                <X className="tw-w-6 tw-h-6" />
              </button>
            </div>
            <form onSubmit={handleUpdateClient} className="tw-space-y-4">
              <div>
                <label htmlFor="name" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editingClient.name}
                  onChange={handleInputChange}
                  className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={editingClient.email}
                  onChange={handleInputChange}
                  className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={editingClient.phone}
                  onChange={handleInputChange}
                  className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="status" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                  Estado
                </label>
                <select
                  name="status"
                  id="status"
                  value={editingClient.status}
                  onChange={handleInputChange}
                  className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-ring-indigo-500 focus:tw-border-indigo-500"
                  required
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
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

export default ClientsView

