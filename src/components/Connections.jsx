import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL+"/user/connections", {
                withCredentials: true,
            });
            dispatch(addConnections(res?.data?.data));
        }catch(err){

        }
    };

    useEffect(()=>{
        fetchConnections();
    }, []);
  if(!connections) return;
  
  if(connections.length === 0) return <h1>No Connection Found</h1>;
  return (
    <div className='text-center my-10'>
        <h1 className='text-bold text-4xl'>Connections</h1>
        {connections.map((connection) => {
            const {firstName, lastName, photoUrl, age, gender, about}=connection;
            return (
                <div className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
                    <div>
                        <img className='w-28 h-20 rounded-full' src={photoUrl} alt="photo" />
                    </div>
                    <div className='text-left'>
                        <h2 className='mx-10'>{firstName+ " " + lastName}</h2>
                        {age && gender && <p className='mx-10'>{age +", " + gender}</p>}
                        <p className='mx-10'>{about}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Connections