import React, { useState,useContext, useEffect } from "react"
import { Calendar, Clock } from "lucide-react"
import { Context } from "../../store/appContext"
import { Actions } from "@cloudinary/url-gen/index"

const TeacherSchedule = () => {
  const{store,actions}=useContext(Context)
  // const [schedule, setSchedule] = useState([
  //   { id: 1, day: "Lunes", time: "09:00 - 10:30", class: "Clase de Arte" },
  //   { id: 2, day: "Martes", time: "11:00 - 12:30", class: "Clase de Música" },
  //   { id: 3, day: "Miércoles", time: "09:00 - 10:30", class: "Clase de Arte" },
  //   { id: 4, day: "Jueves", time: "11:00 - 12:30", class: "Clase de Música" },
  //   { id: 5, day: "Viernes", time: "14:00 - 15:30", class: "Clase de Baile" },
  // ])

  // const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

  useEffect(()=>{
    actions.GetSchedules()
  },[])

  return (
    <div>
      <h3 className="tw-text-xl tw-font-semibold tw-mb-6">Mi Horario</h3>
      <div className="tw-grid tw-grid-cols-5 tw-gap-4">
        {store.schedules.map((schedule)=>(
          <div key={schedule.id} className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-4">
            <h4 className="tw-text-lg tw-font-semibold tw-mb-2">{schedule.dayOfWeek}</h4>
                <div  className="tw-mb-2 tw-p-2 tw-bg-gray-100 tw-rounded">
                  <div className="tw-flex tw-items-center tw-mb-1">
                    <Clock className="tw-w-4 tw-h-4 tw-mr-2 tw-text-gray-600" />
                    <span className="tw-text-sm tw-text-gray-600">{schedule.startTime} - ${schedule.endTime}</span>
                  </div>
                  <p className="tw-font-medium">{schedule.class}</p>
                </div>
          </div>
          ))}
      </div>
    </div>
  )
}

export default TeacherSchedule

