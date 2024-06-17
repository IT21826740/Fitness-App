import { useState, useEffect } from 'react';
import Layout from '../Layout';
import moment from 'moment';
import { IoMan } from "react-icons/io5";
import { IoMdClock } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { TiArrowRepeat } from "react-icons/ti";
import { GiStrongMan } from "react-icons/gi";
import { BiDotsHorizontalRounded } from "react-icons/bi";


function WorkoutList() {

    const [workouts, setWorkouts] = useState([]);
    const [selectedPart, setSelectedPart] = useState('');
    const [showDescriptionIndex, setShowDescriptionIndex] = useState(-1);
    const [showFlipText, setShowFlipText] = useState(false);


    useEffect(() => {
        fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
        try {
            const response = await fetch('http://localhost:8080/workout/getworkout');
            const data = await response.json();
            const formatWorkouts = data.map(workout => ({
                ...workout,
                timestamp: moment(workout.timestamp).toISOString()

            }));
            setWorkouts(formatWorkouts);
        } catch (error) {
            console.error('Error fetching workouts:', error);
        }
    };

    const handleFilterChange = (event) => {
        setSelectedPart(event.target.value.toLowerCase());
    };

    const toggleDescription = (index) => {
        setShowDescriptionIndex(showDescriptionIndex === index ? -1 : index);
        setShowFlipText(showDescriptionIndex !== index);
    };

    const toggleBackText = () => {
        setShowFlipText(false);
        setShowDescriptionIndex(-1);
    };


    const filteredWorkouts = selectedPart
        ? workouts.filter(workout => workout.part.toLowerCase() === selectedPart)
        : workouts;
    

    return (

        <Layout>
            <div>
                <div className='flex h-12 mt-1 rounded-lg relative' style={{ backgroundColor: 'white' }}>
                    <div className="flex items-center mx-auto">
                        <span className="mr-2 ">Filter</span>
                        <select className="border p-1 rounded-md" onClick={handleFilterChange} >
                            <option value="">All</option>
                            <option value="Abs"> Abs</option>
                            <option value="Chest">Chest</option>
                            <option value="Calves<">Calves</option>
                            <option value="Triceps">Triceps</option>
                            <option value="Shoulders">Shoulders</option>
                            <option value="Biceps">Biceps</option>
                            <option value="Back">Back</option>
                            <option value="Forearms">Forearms</option>
                            <option value="Legs">Legs</option>
                            <option value="Traps">Traps</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-wrap rounded-md mt-6 ml-0.5 p-1 " style={{ backgroundColor: 'white' }}>
                    {filteredWorkouts.map((workout, index) => (
                        <div key={index} className="relative w-1/3 p-4 shadow-md rounded-xl">

                            <h1 className='mt-0 pt-0 mb-2 italic ' style={{ fontSize: '10px' }}> @{workout.username} </h1>

                            <div className="flex items-center mb-2">
                                <IoMan size={20} className="mr-2 text-blue-900" />
                                <h1 className='font-semibold'>{workout.name.toUpperCase()}</h1>
                            </div>
                            <div className="flex items-center mb-2">
                                <GiStrongMan size={20} className="mr-2 text-blue-800" />
                                <h2 className='font-montserrat'>{workout.part}</h2>
                            </div>
                            <div className="flex items-center mb-2">
                                <CgGym size={20} className="mr-2 text-black" />
                                <h3 >{workout.rept} </h3>
                            </div>
                            <div className="flex items-center mb-2">
                                <IoMdClock size={20} className="mr-2 text-green-800" />
                                <p>{workout.intervalTime}<span className="italic">s rest</span></p>
                            </div>
                            <div className="flex items-center mb-2">
                                <TiArrowRepeat size={20} className="mr-2 text-brown-600" />
                                <p>{workout.st} <span className="italic">sets</span></p>
                            </div>
                            {!showFlipText && (
                                <BiDotsHorizontalRounded className="ml-2 text-green-900 cursor-pointer" size={20} onClick={() => toggleDescription(index)} />
                            )}
                            {showDescriptionIndex === index && (
                                <div className="absolute top-0 left-0 w-full h-full bg-white flex ">
                                    <p className="text-gray-700 mt-4 ml-4">{workout.description}</p>
                                    {showFlipText && (
                                        <p className="text-blue-600 cursor-pointer text-sm mt-auto mr-4 mb-2" onClick={toggleBackText}>Back</p>
                                    )}
                                </div>
                            )}
                            <div className="absolute bottom-0 right-0 text-xs text-gray-600 mr-2" style={{ fontSize: '8px' }}>{new Date(workout.timestamp).toLocaleString([], {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            })}</div>
                        </div>
                    ))}
                </div>

            </div>

        </Layout>

    )
}

export default WorkoutList;
