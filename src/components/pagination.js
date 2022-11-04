import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../redux/job/allJobsSlice'

const buttonTheme = {
    unactive: "border-2 border-gray-500 h-[40px] w-[40px] rounded-md text-center font-medium leading-[40px] cursor-pointer text-gray-500 hover:border-primary-color hover:text-primary-color",
    active: "border-2 bg-primary-color border-primary-color h-[40px] w-[40px] rounded-md text-center font-medium leading-[40px] cursor-pointer text-white"
}

const Pagination = () => {

    const {numOfPages, page} = useSelector((state) => state.allJobs)
    const dispatch = useDispatch()

    const pages = Array.from({length:numOfPages}, (_, index) => index+1)

    const handleNextPage = () => {
        let nextPage = page + 1
        if(nextPage > numOfPages){
            nextPage = 1
        }
        dispatch(changePage(nextPage))
    }

    const handlePrevPage = () => {
        let prevPage = page - 1
        if(prevPage < 1){
            prevPage = numOfPages
        }
        dispatch(changePage(prevPage))
    }
    
    return (
        <div className='flex items-center justify-end gap-x-4 mt-4'>
            <div className={`${buttonTheme.unactive}`} onClick={handlePrevPage}>
                <ArrowBackIos fontSize='small' className="text-gray-500 ml-1 mb-1 hover:text-primary-color"/>
            </div>
            {
                pages.map((num) => {
                    return(
                        <div className={`${ num === page ? buttonTheme.active : buttonTheme.unactive}`} onClick={() => dispatch(changePage(num))}>
                            {num}
                        </div>
                    )
                })
            }
            
            <div className={`${buttonTheme.unactive}`} onClick={handleNextPage}>
                <ArrowForwardIos fontSize='small' className='text-gray-500 mb-1 hover:text-primary-color'/>
            </div>
        </div>
    )
}

export default Pagination