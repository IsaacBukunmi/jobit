import React from 'react'
import moment from 'moment';
import Logo from "../assets/images/volks-logo.jpg"
import { Link } from 'react-router-dom';
import { routes } from '../utils/routes';
import { AccessTime, Public } from '@material-ui/icons';
import { generateRandomColors, getLocalTimeFormat } from '../utils/helper';

const ListingCard = ({item}) => {
  return (
    <Link 
        to={routes.LISTING_DETAILS.replace(":job_title", item?.title).replace(":company", item?.company?.display_name).replace(":id", item?.adref)} 
        state={{
            job_details:item
        }}
        className='bg-white flex flex-col md:flex-row  md:justify-between md:items-end p-4 rounded-md shadow-lg mb-6 cursor-pointer' 
        key={item?.job_id}>
        <div className='flex  gap-3 mb-2 md:mb-0'>
            {
                item?.thumbnail ?
                <div className='h-[90px] w-[90px] flex-shrink-0'>
                    <img className='w-full h-full object-cover rounded-md' src={item?.thumbnail} alt="" />
                </div> :
                <div className={`bg-[#000] h-[90px] w-[90px] flex-shrink-0 rounded-md text-white text-center mx-0 my-auto leading-[90px] text-5xl`}>
                    {item?.company?.display_name?.charAt(0)}
                </div>
            }
            <div className='self-start'>
                <small className='text-secondary-color font-bold text-xs'>{item?.company?.display_name}</small>
                <h2 className='text-secondary-color font-normal text-lg pb-2'>{item?.title}</h2>
                <p className='text-xs border border-secondary-color text-secondary-color font-medium w-fit rounded p-1'>{(item?.contract_time || item?.contract_type)?.replace("_", " ") || 'full time'}</p>
            </div>
        </div>
        <div className='flex gap-4 text-s text-[#B9BDCF]'>
            <p> <Public fontSize='small'/>{item?.location?.display_name}</p>
            <p> <AccessTime fontSize='small'/> {getLocalTimeFormat(item?.created) || "Few Days Ago"}</p>
        </div>
    </Link>
  )
}

export default ListingCard