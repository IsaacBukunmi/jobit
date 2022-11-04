import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, } from 'recharts';

const AreaChartStats = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
        <AreaChart data={data} margin={{top:50}}>
            {/* <CartesianGrid strokeDasharray={'0 0'}/> */}
            <XAxis dataKey="date"/>
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#00a6fb" fill="rgb(0, 166, 251, 0.3)"/>
        </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartStats