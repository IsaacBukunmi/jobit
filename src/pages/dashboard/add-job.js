import React from 'react'
import { OutlineButton, PrimaryButton } from '../../components/button'
import { Input, Select } from '../../components/input'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

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
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error('Please Fill Out All Fields');
      return;
    }

  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    console.log(name, value)
  };

  return (
    <div>
        <div className='mb-5'>
          <h2 className='text-3xl text-white'>Add Job Application</h2>
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
            name="location" 
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
            options={statusOptions} 
            handleChange={handleJobInput}/>

          <Select 
            label="Job Type" 
            placeholder="Select Job Type" 
            name="status" 
            className="mt-2" 
            labelStyle="text-white" 
            options={jobTypeOptions} 
            handleChange={handleJobInput} />
      </form>
      <div className='flex gap-6 justify-end'>
          <OutlineButton className="w-44 mt-7" >Reset</OutlineButton>
          <PrimaryButton className="w-44 mt-7" loading={isLoading} onClick={handleSubmit}>Add Job</PrimaryButton>
      </div>
    </div>
  )
}

export default AddJob