import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { BookOpen } from 'lucide-react';
import book from "../../img/books.png";
import littleexplorers from "../../img/little-explorers.jpg";
import dancing from "../../img/dancing.jpg";
import Scientists from "../../img/LittleScientist.jpg";
import kids4C from "../../img/kids4C.png";

export const Programs = () => {
    const { store, actions } = useContext(Context);
    const [visiblePrograms, setVisiblePrograms] = useState(8);

    [store.programs.length];

    const handleShowMore = () => {
        setVisiblePrograms((prev) => prev + 4);
    };
    const allPrograms = [
        {
            id: 1,
            title: "Little Explorers ",
            price: "25",
            description: "A hands-on program featuring activities like building with blocks, painting, sensory games (sand, water), and group play.",
            age: "3-5 Years",
            time: "8-10 am",
            capacity: "15 Kids",
            image: littleexplorers,
        },
        {
            id: 2,
            title: "Learning with Rhythm",
            price: "25",
            description: "Musical activities such as singing, playing basic instruments (maracas, tambourines), and learning rhythms through body games.",
            age: "3-4 Years",
            time: "9-11 am",
            capacity: "15 Kids",
            image: dancing,
        },
        {
            id: 3,
            title: "Little Scientists",
            price: "35",
            description: "Stimulate curiosity and critical thinking through basic science experiments and activities through playing with diferent elements.",
            age: "3-5 Years",
            time: "8-10 am",
            capacity: "10 Kids",
            image: Scientists,
        }
    ];

    return (
        <div className="tw-container tw-mx-auto tw-px-4 tw-text-center tw-mb-12">
            {/* Título principal */}
            <div className="tw-relative tw-inline-block tw-py-4">
                <h2
                    className="tw-text-4xl tw-font-extrabold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-[#9C29B2] tw-to-[#FFC909]"
                    style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                    <br />
                    Our Programs
                </h2>
                {/* Línea decorativa debajo del título */}
                <div className="tw-absolute tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-mt-2 tw-h-1 tw-w-3/4 tw-bg-gradient-to-r tw-from-[#FFC909] tw-to-[#9C29B2] tw-rounded-full"></div>
            </div>

            {/* Descripción debajo del título */}
            <h3 className="tw-text-lg tw-mt-4 tw-text-[#555] tw-italic tw-opacity-90">
                "Discover the programs designed to enhance your child's development and learning"
            </h3>

            {/* Tarjetas de Programas */}
            <div className="tw-container tw-mx-auto tw-px-4 tw-mt-8">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
                    {allPrograms.slice(0, visiblePrograms).map((programItem) => (
                        <div
                            key={programItem.id}
                            className="tw-bg-white tw-rounded-3xl tw-overflow-hidden tw-shadow-lg tw-border tw-border-[#9C29B2]"
                        >
                            {/* Imagen del Programa */}
                            <div className="tw-aspect-w-16 tw-aspect-h-9">
                                <img
                                    src={programItem.image || kids1C}
                                    alt={programItem.title}
                                    className="tw-w-full tw-h-full tw-object-cover"
                                />
                            </div>

                            {/* Contenido del Programa */}
                            <div className="tw-p-6">
                                {/* Título del Programa */}
                                <h3
                                    className="tw-text-2xl tw-font-extrabold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-[#9C29B2] tw-to-[#FFC909] tw-mb-3"
                                    style={{ fontFamily: "'Fredoka', sans-serif" }}
                                >
                                    {programItem.title}
                                </h3>

                                {/* Descripción */}
                                <p className="tw-text-sm tw-mb-4 tw-text-[#555] tw-opacity-90 tw-text-left">
                                    <span className="tw-font-bold tw-text-[#9C29B2]">Description:</span>{' '}
                                    {programItem.description}
                                </p>

                                {/* Etiquetas */}
                                <div className="tw-flex tw-justify-between tw-items-center tw-gap-4 tw-my-5">
                                    {/* Etiqueta de Edad */}
                                    <div className="tw-flex tw-items-center tw-bg-gradient-to-r tw-from-[#FFC909] tw-to-[#FFE57A] tw-px-3 tw-py-2 tw-rounded-lg tw-shadow-md">
                                        <span className="tw-text-[#9C29B2] tw-font-bold tw-mr-2">
                                            <i className="fas fa-baby tw-mr-1"></i> Age:
                                        </span>
                                        <span className="tw-text-sm tw-text-[#555] tw-font-bold">{programItem.age}</span>
                                    </div>

                                    {/* Etiqueta de Tiempo */}
                                    <div className="tw-flex tw-items-center tw-bg-gradient-to-r tw-from-[#FFC909] tw-to-[#FFE57A] tw-px-3 tw-py-2 tw-rounded-lg tw-shadow-md">
                                        <span className="tw-text-[#9C29B2] tw-font-bold tw-mr-2">
                                            <i className="fas fa-clock tw-mr-1"></i> Time:
                                        </span>
                                        <span className="tw-text-sm tw-text-[#555] tw-font-bold">{programItem.time}</span>
                                    </div>

                                    {/* Etiqueta de Capacidad */}
                                    <div className="tw-flex tw-items-center tw-bg-gradient-to-r tw-from-[#FFC909] tw-to-[#FFE57A] tw-px-3 tw-py-2 tw-rounded-lg tw-shadow-md">
                                        <span className="tw-text-[#9C29B2] tw-font-bold tw-mr-2">
                                            <i className="fas fa-users tw-mr-1"></i> Capacity:
                                        </span>
                                        <span className="tw-text-sm tw-text-[#555] tw-font-bold">{programItem.capacity}</span>
                                    </div>
                                </div>

                                {/* Botón */}
                                <button className="tw-w-full tw-py-2 tw-border tw-border-[#FFC909] tw-rounded-full tw-bg-[#FFC909] tw-text-[#9C29B2] tw-font-bold hover:tw-bg-[#FFE57A] tw-transition-colors">
                                    Read more
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botón para ver más programas */}
                {visiblePrograms < allPrograms.length && (
                    <div className="tw-text-center tw-mt-8">
                        <button
                            onClick={handleShowMore}
                            className="tw-bg-[#9C29B2] tw-text-white tw-px-8 tw-py-3 tw-rounded-full hover:tw-bg-[#FFC909] hover:tw-text-[#9C29B2] tw-transition-colors"
                        >
                            More Programs
                        </button>
                    </div>
                )}

                <div className="tw-text-center tw-mt-12">
                    <button
                        className="tw-bg-[#9C29B2] tw-text-white tw-px-12 tw-py-4 tw-rounded-full tw-text-lg tw-font-bold hover:tw-bg-[#7A1D8D] tw-transition-colors"
                    >
                        Discover All Programs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Programs;