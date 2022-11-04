import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';


const BarChartStats = ({data}) => {
  return (
    <ResponsiveContainer width='100%' height={500}>
        <BarChart data={data} margin={{ top: 50, left:0 }}>
        {/* <CartesianGrid strokeDasharray='3 3 ' /> */}
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='count' fill='#00a6fb' barSize={75} />
        </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartStats