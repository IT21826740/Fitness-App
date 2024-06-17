import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import Card from "../Card";
import Avatar from "../avatar";
import axios from 'axios';
import Layout from '../Layout';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const AddWorkout = () => {
    const [workout, setWorkout] = useState({
        name: '',
        part: '',
        rept: 0,
        intervalTime: 0,
        st: 0,
        description: ''
    });
    const [showDescription, setShowDescription] = useState(false);
    const [errors, setErrors] = useState({
        rept: '',
        intervalTime: '',
        st: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'rept' || name === 'intervalTime' || name === 'st') {
            if (!/^\d*$/.test(value)) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: 'Please enter only numbers'
                }));
                return;
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: ''
                }));
            }
        }
        setWorkout(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    const handleAddWorkout = async () => { //add workout
        try {
            const userDataString = localStorage.getItem('userData');
            if (!userDataString) {
                console.error('User data not found in local storage');
                return;
            }
            const userData = JSON.parse(userDataString);
            const userId = userData.userId;
            const username = userData.username;
            const newWorkout = {
                ...workout,
                authId: userId,
                username: username,
                
                timestamp: moment().format()
            };


            await axios.post('http://localhost:8080/workout/add', newWorkout);
            // Reset workout details after successful post
            setWorkout({
                name: '',
                part: '',
                rept: 0,
                intervalTime: 0,
                st: 0,
                description: ''
            });
            setShowDescription(false);
            
            toast.success("Workout added successfully!", {
                position: "top-center",
                autoClose: 3000,
                closeButton: true
              })
        } catch (error) {
            console.error('Error posting workout:', error);
        }
    };


    return (
        <Layout>
            <Card>
                <ToastContainer/>
                <div className="flex gap-2 items-center">
                    <div>
                        <Avatar />
                    </div>
                    <div>
                        <h1 className="ml-2 text-sm">John Smith</h1>
                    </div>
                </div>
                <div className='mt-4 ml-12'>
                    <div className="flex flex-col w-full">
                        <div className='flex items-center'>
                            <h1 className="mr-2">Workout Name</h1>
                            <input
                                type="text"
                                name="name"
                                className="p-3 h-10 rounded focus:outline-none focus:border-transparent"
                                value={workout.name}
                                onChange={handleInputChange}

                            />
                        </div>
                        <div className='flex items-center mt-4 mb-2'>
                            <h1 className="mr-2">Target Muscle</h1>
                            <select
                                name="part"
                                className="p-1 h-8 rounded focus:outline-none focus:border-transparent"
                                value={workout.part}
                                onChange={handleInputChange}
                            >
                                <option value="">Select</option>
                                <option value="Abs"> Abs</option>
                                <option value="Chest">Chest</option>
                                <option value="Calves">Calves</option>
                                <option value="Abs">Abs</option>
                                <option value="Triceps">Triceps</option>
                                <option value="Shoulders">Shoulders</option>
                                <option value="Biceps">Biceps</option>
                                <option value="Back">Back</option>
                                <option value="Forearms">Forearms</option>
                                <option value="Legs">Legs</option>
                                <option value="Traps">Traps</option>
                            </select>
                        </div>
                        <div className='flex items-center'>
                            <h1 className="mr-2">Repetitions</h1>
                            <textarea
                                name="rept"
                                className="grow p-3 h-14 mt-2 focus:outline-none focus:border-transparent"
                                value={workout.rept}
                                onChange={handleInputChange}
                            />
                            {errors.rept && <p className="text-red-500">{errors.rept}</p>}
                        </div>
                        <div className='flex items-center'>
                            <h1 className="mr-2">Interval</h1>
                            <textarea
                                name="intervalTime"
                                className="grow p-3 h-14 mt-2 focus:outline-none focus:border-transparent"
                                value={workout.intervalTime}
                                onChange={handleInputChange}
                            />
                            {errors.intervalTime && <p className="text-red-500">{errors.intervalTime}</p>}
                        </div>
                        <div className='flex items-center'>
                            <h1 className="mr-2">Number of Sets</h1>
                            <textarea
                                name="st"
                                className="grow p-3 h-14 mt-2 focus:outline-none focus:border-transparent"
                                value={workout.st}
                                onChange={handleInputChange}
                            />
                            {errors.st && <p className="text-red-500">{errors.st}</p>}
                        </div>
                        <div className='flex items-center'>
                            {!showDescription && (
                                <IoIosAdd onClick={toggleDescription} className="ml-2 text-black cursor-pointer" size={20} />
                            )}
                        </div>
                        {showDescription && ( 
                            <div className='flex items-center'>
                                <h1 className="mr-2">Description</h1>
                                <textarea
                                    name="description"
                                    className="grow p-3 h-14 mt-2 focus:outline-none focus:border-transparent"
                                    value={workout.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="grow text-right">
                    <button className="bg-green-400 text-white px-6 py-1 rounded-md" onClick={handleAddWorkout}>
                       Add
                    </button>
                </div>
            </Card>
        </Layout>
    );
};

export default AddWorkout;
