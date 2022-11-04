import React, { useState } from 'react'
import AreaChartStats from './area-chart'
import BarChartStats from './bar-chart'
import { Switch } from './input'

const ChartsSection = ({data}) => {

    const [checked, setChecked] = useState(false)

    const handleSwitchChange = () => {
        setChecked(!checked)
    }

    return (
        <div>   
            <div className='flex justify-between items-center'>
                <h3 className='text-2xl text-white font-medium'>Monthly Applications</h3>
                <div className='flex items-center gap-x-2'>
                    <Switch handleChange={handleSwitchChange} value={checked}/>
                    <p className='text-white'>Toggle Chart</p>
                </div>
            </div>
            <div>
                {
                    checked ? <AreaChartStats data={data}/> : <BarChartStats data={data} />
                }
            </div>
        </div>
    )
}

export default ChartsSection