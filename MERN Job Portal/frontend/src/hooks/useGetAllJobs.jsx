import { setAllJobs } from '../redux/jobSlice'
import { JOB_API_END_POINT } from '../utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        console.log(searchedQuery)
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                // console.log(res)
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                    // console.log(res.data.jobs)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs