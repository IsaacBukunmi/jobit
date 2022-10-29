import React from 'react'
import { Delete, LocationOnOutlined, WorkOutline } from '@material-ui/icons'
import Logo from '../assets/images/volks-logo.jpg';
import { Edit} from '@mui/icons-material';
import { SecondaryButton } from './button';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { routes } from '../utils/routes';
import { generateRandomColors } from '../utils/helper';
import { useDispatch } from 'react-redux';
import { deleteJobApplication, setEditJob } from '../redux/job/jobSlice';

const theme = {
    pending: "bg-pending-transparent text-[rgb(193,151,2)]",
    interview:"bg-primary-transparent text-primary-color",
    declined:"bg-declined-transparent text-[rgb(253,61,61)]"
}



const JobCard = ({_id, position, company, jobLocation, jobType, createdAt, status,}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <div className='bg-white p-4 rounded'>
        <div className='flex justify-between'>
            <div className='flex items-center'>
                <div className={`bg-[#000] h-[72px] w-[72px] rounded-md text-white text-center mx-0 my-auto leading-[72px] text-5xl`}>
                    {/* <img className='w-full h-full rounded-md object-cover' src={Logo} alt="logo" /> */}
                    {company[0]}
                </div>
                <div className='ml-2'>
                    <p className='text-secondary-color font-bold'>{position}</p>
                    <p className='mb-0 text-gray-400'>{company}</p>
                    <div className={`${theme[status]} w-fit rounded-full py-1 px-4 text-center font-medium text-[14px]`}>
                        <p className='before:w-5 before:h-5 before:rounded-full before:bg-primary-color '>{status}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='py-4'>
            <div className='mb-2'>
            <p className='capitalize text-[15px] font-medium'><LocationOnOutlined className="text-gray-400 mr-2 relative -top-[2px]" />{jobLocation}</p> 
            </div>
            <div>
            <p className='capitalize text-[15px] font-medium'><WorkOutline className="text-gray-400 mr-2 relative -top-[2px]"/>{jobType.replace("-", " ")}</p>
            </div>
        </div>
        <div className='flex justify-between items-center'>
            <div>
                <p className='text-[15px] italic'>{moment(createdAt).format("MMM Do YYYY")}</p>
            </div>
            <div className='flex items-center gap-x-2'>
                <SecondaryButton className="text-[15px] text-[#fd9c00] font-medium" onClick={() => {
                    navigate(routes.ADD_JOB)
                    dispatch(setEditJob({
                        editJobId: _id,
                        position,
                        company,
                        jobLocation,
                        jobType,
                        status,
                      }))
                    }}>
                    Edit
                </SecondaryButton>
                <div className='h-[24px] w-[1px] bg-gray-400'></div>
                <SecondaryButton className="text-[15px] text-[#D11A2A] font-medium" onClick={() => dispatch(deleteJobApplication(_id))}>
                    Delete
                </SecondaryButton>
            </div>
        </div>
    </div>  
  )
}


export default JobCard