import React, { useEffect } from 'react'
import { OutlineButton, PrimaryButton } from '../../components/button'
import { Input, Select } from '../../components/input'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { handleChange, clearValues, createJobApplication, editJobApplication } from '../../redux/job/jobSlice';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((state) => state.job);
  const {user} =  useSelector((state) => state.auth)
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    
    if (isEditing) {
      dispatch( editJobApplication({ jobId: editJobId, job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      navigate(routes.ALL_JOBS)
      return;
    } else{
      dispatch(createJobApplication({ position, company, jobLocation, jobType, status }));
      navigate(routes.ALL_JOBS)
    }
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    console.log(name, value)
    dispatch(handleChange({name, value}))
  };

  useEffect(() => {
    if(!isEditing){
      dispatch(handleChange({name:'jobLocation', value:user?.location}))
    }
  }, [])

  return (
    <div>
        <div className='mb-5'>
          <h2 className='text-3xl text-white'>{ isEditing ? "Edit" : "Add"} Job Application</h2>
        </div>
        <form className='md:grid md:grid-cols-2 md:gap-8'>
          <Input 
            label="Position" 
            type="text" 
            placeholder="Frontend Developer" 
            name="position" 
            className="mt-2" 
            labelStyle="text-white" 
            value={position} 
            handleChange={handleJobInput}/>

          <Input 
            label="Company" 
            type="text" 
            placeholder="Microsoft" 
            name="company" 
            className="mt-2" 
            labelStyle="text-white" 
            value={company} 
            handleChange={handleJobInput}/>

          <Input 
            label="Location" 
            type="text" 
            placeholder="Amsterdam, Netherlands" 
            name="jobLocation" 
            className="mt-2" 
            labelStyle="text-white" 
            value={jobLocation} 
            handleChange={handleJobInput}/>

          <Select 
            label="Status" 
            placeholder="Select Job Status" 
            name="status" 
            className="mt-2" 
            labelStyle="text-white" 
            value={status}
            options={statusOptions} 
            handleChange={handleJobInput}/>

          <Select 
            label="Job Type" 
            placeholder="Select Job Type" 
            name="jobType" 
            className="mt-2" 
            labelStyle="text-white" 
            value={jobType}
            options={jobTypeOptions} 
            handleChange={handleJobInput} />
      </form>
      <div className='flex gap-6 justify-end'>
          <OutlineButton className="w-44 mt-7" onClick={() => dispatch(clearValues())}>Reset</OutlineButton>
          <PrimaryButton className="w-44 mt-7" loading={isLoading} onClick={handleSubmit}>{ isEditing ? "Update" : "Add"} Job</PrimaryButton>
      </div>
    </div>
  )
}

export default AddJob