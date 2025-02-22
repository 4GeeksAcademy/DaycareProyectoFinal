import React, { useContext, useState, useEffect } from 'react';
import { Plus, Edit, Trash, X } from 'lucide-react';
import { Context } from '../../store/appContext';
import Swal from "sweetalert2";

const ClassesView = () => {
  const { store, actions } = useContext(Context);
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [newClass, setNewClass] = useState({
    teacher_id: 0,
    name: '',
    description: '',
    capacity: '',
    price: '',
    age: '',
    time: '',
    image: ''
  });

  useEffect(() => {
    actions.fetchClasses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingClass) {
      setEditingClass({ ...editingClass, [name]: value });
    } else {
      setNewClass({ ...newClass, [name]: value });
    }
  };

  const handleImageChange = async (e) => {
    const result = await actions.uploadToCloudinary(e.target.files[0]);
    if (result.success) {
      setNewClass({ ...newClass, image: result.url });
    }
  };

  const handleImageEditChange = async (e) => {
    const result = await actions.uploadToCloudinary(e.target.files[0]);
    if (result.success) {
      setEditingClass((prevState) => {
        const updatedClass = {
          ...prevState,
          image: result.url,
        };
        return updatedClass;
      });
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();


    if (newClass.teacher_id === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, selecciona un profesor.',
      });
      return;
    }

    const confirmSubmit = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this class?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add!",
      cancelButtonText: "No, cancel",
    });

    if (!confirmSubmit.isConfirmed) {
      return;
    }

    try {
      const result = await actions.addClass(
        newClass.teacher_id,
        newClass.name,
        newClass.description,
        newClass.capacity,
        newClass.price,
        newClass.age,
        newClass.time,
        newClass.image
      );

      if (result) {
        Swal.fire({
          icon: "success",
          title: "Class Added",
          text: "A new class has been added!",
        });
        actions.fetchClasses();
        setNewClass({
          teacher_id: 0,
          name: '',
          description: '',
          capacity: '',
          price: '',
          age: '',
          time: '',
          image: ''
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `There was an error: ${result.error}`,
        });
      }
    } catch (error) {
      console.error("Error in handleAddClass:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "There was an error submitting the form. Please try again.",
      });
    }
  };

  const handleEditClass = (classes) => {
    setEditingClass(classes);
    setIsModalOpen(true);
  };

  const handleUpdateClass = async (e) => {
    e.preventDefault();
    await actions.updateClass(editingClass.id, editingClass);
    setIsModalOpen(false);
    setEditingClass(null);
  };

  const handleDeleteClass = async (id) => {
    const confirmDelete = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmDelete.isConfirmed) {
      try {
        const result = await actions.deleteClass(id);

        if (result) {
          Swal.fire({
            icon: 'success',
            title: 'Clase eliminada',
            text: 'La clase ha sido eliminada con éxito.',
          });
          actions.fetchClasses();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al eliminar la clase.',
          });
        }
      } catch (error) {
        console.error("Error en handleDeleteClass:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al intentar eliminar la clase. Intenta nuevamente.',
        });
      }
    }
  };

  const getTeachers = async () => {
    await actions.fetchTeachersClasses();
    setTeachers(store.teachersClasses);
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <div className="tw-p-4">
      <h2 className="tw-text-2xl tw-font-semibold tw-mb-6">Class Management</h2>
      <div className="tw-mb-6">
        <form onSubmit={handleAddClass} className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-6">
          <div>
            <div className='tw-flex-1'>
              <label htmlFor="teacher_id" className='tw-block tw-mb-2'>Teacher</label>
              <select
                name="teacher_id"
                onChange={handleInputChange}
                value={newClass.teacher_id}
                className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
              >
                <option value={0} disabled>Select an Teacher</option>
                {teachers.map(item => (
                  <option key={`teacher-${item.username}`} value={item.id}>{item.username}</option>
                ))}
              </select>
            </div>
            <div className='tw-flex-1'>
              <label htmlFor="name" className='tw-block tw-mb-2'>Class name</label>
              <input
                type="text"
                name="name"
                value={newClass.name}
                onChange={handleInputChange}
                placeholder="Name of the class"
                className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                required
              />
            </div>
            <div className='tw-flex-1'>
              <label htmlFor="description" className='tw-block tw-mb-2'>Description</label>
              <input
                type="text"
                name="description"
                value={newClass.description}
                onChange={handleInputChange}
                placeholder="Description of the class"
                className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                required
              />
            </div>
            <div className='tw-flex-1'>
              <label htmlFor="capacity" className='tw-block tw-mb-2'>Capacity</label>
              <input
                type="number"
                name="capacity"
                value={newClass.capacity}
                onChange={handleInputChange}
                placeholder="Capacity"
                className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                required
              />
            </div>
          </div>

          <div>
            <div className='tw-flex-1'>
              <label htmlFor="price" className='tw-block tw-mb-2'>Price</label>
              <input
                type="number"
                name="price"
                value={newClass.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                required
              />
            </div>

            <div className='tw-flex-1'>
              <label htmlFor="age" className='tw-block tw-mb-2'>Age Range</label>
              <input
                type="text"
                name="age"
                value={newClass.age}
                onChange={handleInputChange}
                placeholder="Age Range"
                className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                required
              />
            </div>

            <div className='tw-flex-1'>
              <label htmlFor="time" className='tw-block tw-mb-2'>Time</label>
              <input
                type="text"
                name="time"
                value={newClass.time}
                onChange={handleInputChange}
                placeholder="8-10 AM"
                className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                required
              />
            </div>

            <div className='tw-flex-1'>
              <label htmlFor="image" className='tw-block tw-mb-2'>Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                required
              />
            </div>
          </div>

          <div className='tw-flex'>
            <button
              type="submit"
              className="tw-col-span-2 sm:tw-col-span-1 tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-flex tw-items-center tw-justify-center"
            >
              <Plus className="tw-w-5 tw-h-5 tw-mr-2" />
              Add Class
            </button>
          </div>
        </form>
      </div>
      <div className="tw-overflow-x-auto">
        <table className="tw-w-full tw-bg-white tw-shadow-md tw-rounded-lg">
          <thead className="tw-bg-gray-100">
            <tr>
              <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Teacher</th>
              <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Name</th>
              <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Description</th>
              <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Capacity</th>
              <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Price</th>
              <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Age</th>
              <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Schedule</th>
              <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Image</th>
              <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="tw-divide-y tw-divide-gray-200">
            {store.classes.map((classItem) => {
              // Buscar el maestro correspondiente a este teacher_id
              const teacher = teachers.find((teacher) => teacher.id === classItem.teacher_id);

              return (
                <tr key={classItem.id}>
                 
                  <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{teacher ? teacher.username : "Unknown"}</td>
                  <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{classItem.name}</td>
                  <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{classItem.description}</td>
                  <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{classItem.capacity}</td>
                  <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{classItem.price}</td>
                  <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{classItem.age}</td>
                  <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">{classItem.time}</td>
                  <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                    {classItem.image ? (
                      <img src={classItem.image} alt="Class" className="tw-w-16 tw-h-16 tw-object-cover" />
                    ) : (
                      "No image"
                    )}
                  </td>
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
              );
            })}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-bg-gray-600 tw-bg-opacity-50 tw-overflow-y-auto tw-h-full tw-w-full tw-flex tw-items-center tw-justify-center">
          <div className="tw-bg-white tw-p-8 tw-rounded-md tw-shadow-lg tw-w-full md:tw-w-1/2 lg:tw-w-1/3">
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
              <h3 className="tw-text-xl tw-font-semibold">Edit Class</h3>
              <button onClick={() => setIsModalOpen(false)} className="tw-text-gray-500 hover:tw-text-gray-700">
                <X className="tw-w-6 tw-h-6" />
              </button>
            </div>
            <form onSubmit={handleUpdateClass} className="tw-space-y-4">
              <div className='tw-flex-1'>
                <label htmlFor="teacher_id" className='tw-block tw-mb-2'>Teacher ID</label>
                <select
                  name="teacher_id"
                  onChange={handleInputChange}
                  value={editingClass.teacher_id}
                  className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                >
                  <option value={0} disabled>Select an option</option>
                  {teachers.map(item => (
                    <option key={`teacher-${item.id}`} value={item.id}>{item.username}</option>
                  ))}
                </select>
              </div>
              <div className='tw-flex-1'>
                <label htmlFor="name" className='tw-block tw-mb-2'>Name of the class</label>
                <input
                  type="text"
                  name="name"
                  value={editingClass.name}
                  onChange={handleInputChange}
                  placeholder="Name of the class"
                  className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                  required
                />
              </div>
              <div className='tw-flex-1'>
                <label htmlFor="description" className='tw-block tw-mb-2'>Description</label>
                <input
                  type="text"
                  name="description"
                  value={editingClass.description}
                  onChange={handleInputChange}
                  placeholder="Description of the class"
                  className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                  required
                />
              </div>
              <div className='tw-flex-1'>
                <label htmlFor="Capacity" className='tw-block tw-mb-2'>Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={editingClass.capacity}
                  onChange={handleInputChange}
                  placeholder="Capacity"
                  className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                  required
                />
              </div>
              <div className='tw-flex-1'>
                <label htmlFor="Price" className='tw-block tw-mb-2'>Price</label>
                <input
                  type="number"
                  name="price"
                  value={editingClass.price}
                  onChange={handleInputChange}
                  placeholder="price"
                  className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                  required
                />
              </div>
              <div className='tw-flex-1'>
                <label htmlFor="Age" className='tw-block tw-mb-2'>Age Range</label>
                <input
                  type="text"
                  name="age"
                  value={editingClass.age}
                  onChange={handleInputChange}
                  placeholder="Age Range"
                  className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                  required
                />
              </div>
              <div className='tw-flex-1'>
                <label htmlFor="time" className='tw-block tw-mb-2'>Schedule</label>
                <input
                  type="text"
                  name="time"
                  value={editingClass.time}
                  onChange={handleInputChange}
                  placeholder="Schedule"
                  className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                  required
                />
              </div>
              {editingClass.image && (
                <div className="tw-mb-4">
                  <h4 className="tw-text-sm">Current Image:</h4>
                  <img src={editingClass.image} alt="Imagen del Evento" className="tw-w-32 tw-h-32 tw-object-cover tw-rounded-md" />
                </div>
              )}

              <div className='tw-flex-1'>
                <label htmlFor="image" className='tw-block tw-mb-2'>Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageEditChange}
                  className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                />
              </div>

              <div className="tw-flex tw-justify-end tw-space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="tw-bg-gray-200 tw-text-gray-700 tw-px-4 tw-py-2 tw-rounded-md hover:tw-bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md hover:tw-bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassesView;