import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'; 
import LatestJobsCards from './LatestJobsCards';
import axios from 'axios';
import { JOB_API_END_POINT } from '../utils/constant';
import { setAllJobs } from '../redux/jobSlice';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    // console.log(allJobs)
    const dispatch = useDispatch()

    const fetchAllJobs = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true});
            // console.log(res)
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs));
                // console.log(res.data.jobs)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchAllJobs()
    },[])

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobsCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs