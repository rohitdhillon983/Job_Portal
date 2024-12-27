import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 relative rounded-lg shadow-xl bg-white dark:bg-[#222] border border-gray-100 dark:border-gray-600 dark:shadow-[#222] cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>

            <div className='w-16 absolute top-8 right-8'>
                <img src={job?.company.logo} alt="" />
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold dark:border-[#555]'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold dark:border-[#555]'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold dark:border-[#555]'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards