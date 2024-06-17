import   { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import { IoMan } from "react-icons/io5";
import { IoMdClock } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { TiArrowRepeat } from "react-icons/ti";
import { GiStrongMan } from "react-icons/gi";

import { toast, ToastContainer } from 'react-toastify';
import { FaDumbbell } from "react-icons/fa";
import axios from 'axios';
import moment from 'moment';

 



const Workout = () => {
    const [workouts, setWorkouts] = useState([]);
    const [selectedPart, setSelectedPart] = useState("");
    const [showPostCard, setShowPostCard] = useState(false);
    const [authId, setAuthId] = useState('');
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setAuthId(userData.userId);
        }
    }, []);

    useEffect(() => {
        fetchWorkouts();
    }, [selectedPart, authId]);

    const fetchWorkouts = async () => {
 
        try { //get workouts
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

    const deleteWorkout = async (id) => {

        try {
            await axios.delete(`http://localhost:8080/workout/deleteworkout/${id}`);

            console.log("Successfully deleted");
            fetchWorkouts();
            toast.success("Workout deleted successfully!", {
                position: "top-center",
                autoClose: 3000,
                closeButton: true,
              });
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    const handleFilterChange = (event) => {
        setSelectedPart(event.target.value.toLowerCase());
    };

    const handleEditWorkout = (workout) => {
        setSelectedWorkout(workout);
        setEditMode(true);
    };

    const handleSaveEdit = async () => {
        try {
            
            const updatedWorkout = { ...selectedWorkout };
            if (!updatedWorkout.description) {
                delete updatedWorkout.description;
            }

            await axios.put(`http://localhost:8080/workout/updateworkout/${selectedWorkout.id}`, updatedWorkout);
            console.log("Successfully updated");
            setSelectedWorkout(null);
            setEditMode(false);
            toast.success("Workout updated successfully!", {
                position: "top-center",
                autoClose: 3000,
                closeButton: true,
              });
            fetchWorkouts();
           
        } catch (error) {
            console.error('Error updating workout:', error);
        }
    };


    const filteredWorkouts = selectedPart
        ? workouts.filter(workout => workout.part.toLowerCase() === selectedPart)
        :workouts.filter(workout => workout.authId === authId);


    return (
        <div>
            <ToastContainer/>
            <div className='flex h-12 mt-1 rounded-lg relative' style={{ backgroundColor: 'white' }}>
                <div className="flex items-center mx-auto">
                    <span className="mr-2 ">Filter</span>
                    <select className="border p-1 rounded-md" onChange={handleFilterChange}>
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
                <div className='mt-2 mr-2 '>
                    <button className='bg-green-300 hover:bg-green-500 py-1 px-4 rounded-lg '>
                        <Link to={"/addworkout"} className="flex items-center">Add<FaDumbbell /></Link>
                    </button>
                    
                </div>
            </div>
            <div className="flex flex-wrap rounded-md mt-6 ml-0.5 p-1 " style={{ backgroundColor: 'white' }}>
                {filteredWorkouts.map((workout, id) => (
                    <div key={id} className="relative w-1/3 p-4 shadow-md rounded-xl">
                        <div className="absolute top-0 right-0 text-xs text-gray-600 mr-2" style={{ fontSize: '8px' }}>
                            {new Date(workout.timestamp).toLocaleString([], {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            })}
                        </div>

                        <div className="flex items-center mb-2 mt-3">
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
                        <div className="absolute bottom-0 right-0 flex gap-2">
                            <AiOutlineEdit size={20} className="cursor-pointer text-blue-500 mr-1 mb-2" onClick={() => handleEditWorkout(workout)} />
                            <AiFillDelete size={20} className="cursor-pointer text-red-500 mr-2 mb-2" onClick={() => deleteWorkout(workout.id)} />
                        </div>
                    </div>
                ))}
            </div>
            {editMode && selectedWorkout && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <h1 className="text-xl font-thin font- mb-4">Edit Workout</h1>
                        <form className="w-full md:w-96">
                            <div className="mb-4">
                                <label htmlFor="name" className="block font-medium italic mb-1">Workout Name</label>
                                <input id="name" type="text" className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400" value={selectedWorkout.name} onChange={(e) => setSelectedWorkout({ ...selectedWorkout, name: e.target.value })} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="part" className="block font-medium italic mb-1">Target Muscle</label>
                                <input id="part" type="text" className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400" value={selectedWorkout.part} onChange={(e) => setSelectedWorkout({ ...selectedWorkout, part: e.target.value })} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="rept" className="block font-medium italic mb-1">Repetitions</label>
                                <input id="rept" type="number" className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400" value={selectedWorkout.rept} onChange={(e) => setSelectedWorkout({ ...selectedWorkout, rept: e.target.value })} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="intervalTime" className="block font-medium italic mb-1">Interval Time</label>
                                <input id="intervalTime" type="number" className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400" value={selectedWorkout.intervalTime} onChange={(e) => setSelectedWorkout({ ...selectedWorkout, intervalTime: e.target.value })} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="st" className="block font-medium italic mb-1">Number of Sets</label>
                                <input id="st" type="number" className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400" value={selectedWorkout.st} onChange={(e) => setSelectedWorkout({ ...selectedWorkout, st: e.target.value })} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block font-medium italic mb-1">Description</label>
                                <textarea id="description" className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400" value={selectedWorkout.description} onChange={(e) => setSelectedWorkout({ ...selectedWorkout, description: e.target.value })} />
                            </div>
                            <button type="button" className="bg-green-300 text-white py-2 px-4 rounded-md hover:bg-green-600" onClick={handleSaveEdit}>Save</button>
                            <button type="button" className="bg-blue-300 text-gray-700 py-2 px-4 rounded-md ml-2 hover:bg-blue-500" onClick={() => setEditMode(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
            {showPostCard && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <h1 className="text-xl font-thin font- mb-4">Share an update</h1>
                        <form className="w-full md:w-96">
                            <div className="mb-4">
                                <label htmlFor="postContent" className="block font-medium italic mb-1">Write something:</label>
                                <textarea id="postContent" className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400" rows="4"></textarea>
                            </div>
                            <button type="submit" className="bg-green-300 text-white py-2 px-4 rounded-md hover:bg-green-600">Send</button>
                            <button onClick={() => setShowPostCard(false)} className="bg-blue-300 text-gray-700 py-2 px-4 rounded-md ml-2 hover:bg-blue-500">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Workout;
