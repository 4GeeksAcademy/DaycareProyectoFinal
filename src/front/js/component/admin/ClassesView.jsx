import React, { useState, useEffect, useContext } from "react"
import { Context } from "../../store/appContext"
import { Plus, Edit, Trash } from "lucide-react"


const ClassesView = () => {
  const { store,actions } = useContext(Context)
  const [newClass, setNewClass] = useState({
    title: "",
    price: "",
    description: "",
    age: "",
    time: "",
    capacity: "",
    image: null,
  })
  

  useEffect(() => {
    actions.fetchClasses()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === "days") {
      const selectedDays = Array.from(e.target.selectedOptions, (option) => option.value)
      setNewClass((prev) => ({ ...prev, [name]: selectedDays }))
    } else {
      setNewClass((prev) => ({ ...prev, [name]: value }))
    }
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewClass((prev) => ({ ...prev, image: file }));
    }
  };
  const handleAddClass = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    console.log("Datos de newClass antes de crear formData:", newClass);

    for (const key in newClass) {
      if (newClass[key]) {
        if (key === "image" && newClass[key]) {
          console.log(`Agregando archivo al formData: ${newClass[key].name}`);
          formData.append(key, newClass[key], newClass[key].name);
        } else {
          console.log(`Agregando campo ${key}: ${newClass[key]}`);
          formData.append(key, newClass[key]);
        }
      } else {
        console.log(`Campo ${key} no tiene valor.`);
      }
    }
  
   
    console.log("Datos en formData:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    
    try {
      await actions.addClass(formData);
      console.log("Clase añadida correctamente");
  
      setNewClass({ title: "", price: "", description: "", age: "", time: "", capacity: "", image: null });
    } catch (error) {
      console.error("Error al añadir la clase:", error);
    }
  };
  
  
  

  const handleUpdateClass = async (id, updatedClass) => {
    const formData = new FormData()
    for (const key in updatedClass) {
      formData.append(key, updatedClass[key])
    }
    await actions.updateClass(id, formData)
  }

  const handleDeleteClass = async (id) => {
    await actions.deleteClass(id)
  }

  return (
    <div className="tw-container tw-mx-auto tw-px-4 tw-py-8">
      <h2 className="tw-text-2xl tw-font-semibold tw-mb-6">Gestión de Clases</h2>
      <div className="tw-mb-6">
        <form onSubmit={handleAddClass} className="tw-space-y-4">
          <input
            type="text"
            name="title"
            value={newClass.title}
            onChange={handleInputChange}
            placeholder="Class Title"
            className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <input
            type="number"
            name="price"
            value={newClass.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <textarea
            name="description"
            value={newClass.description}
            onChange={handleInputChange}
            placeholder="Class Description"
            className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          ></textarea>
          <input
            type="text"
            name="age"
            value={newClass.age}
            onChange={handleInputChange}
            placeholder="Age Range (e.g., 2-4 Years)"
            className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <input
            type="text"
            name="time"
            value={newClass.time}
            onChange={handleInputChange}
            placeholder="Class Time (e.g., 8-10 am)"
            className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <input
            type="text"
            name="capacity"
            value={newClass.capacity}
            onChange={handleInputChange}
            placeholder="Capacity (e.g., 30 Kids)"
            className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
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
      <div className="tw-grid tw-grid-cols-1 tw-md:grid-cols-2 tw-lg:grid-cols-3 tw-gap-4">
        {store.classes.map((classItem) => (
          <div key={classItem.id} className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6">
            <h3 className="tw-text-lg tw-font-semibold tw-mb-2">{classItem.title}</h3>
            <img
              src={classItem.image || "/placeholder.svg"}
              alt={classItem.title}
              className="tw-w-full tw-h-48 tw-object-cover tw-mb-4 tw-rounded-md"
            />
            <p className="tw-text-gray-600 tw-mb-1">Price: ${classItem.price}</p>
            <p className="tw-text-gray-600 tw-mb-1">Age: {classItem.age}</p>
            <p className="tw-text-gray-600 tw-mb-1">Time: {classItem.time}</p>
            <p className="tw-text-gray-600 tw-mb-1">Capacity: {classItem.capacity}</p>
            <p className="tw-text-gray-600 tw-mb-4">{classItem.description}</p>
            <div className="tw-flex tw-justify-end">
              <button
                onClick={() => handleUpdateClass(classItem.id, { ...classItem, title: "Updated Title" })}
                className="tw-text-blue-600 hover:tw-text-blue-900 tw-mr-2"
              >
                <Edit className="tw-w-5 tw-h-5" />
              </button>
              <button onClick={() => handleDeleteClass(classItem.id)} className="tw-text-red-600 hover:tw-text-red-900">
                <Trash className="tw-w-5 tw-h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClassesView