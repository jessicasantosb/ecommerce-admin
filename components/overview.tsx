'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Overview({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <>
        <BarChart data={data}>
          <XAxis
            dataKey='name'
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke='#88888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `R$${value}`}
          />
        </BarChart>
        <Bar dataKey='total' fill='#3498db' radius={[4, 4, 0, 0]} />
      </>
    </ResponsiveContainer>
  );
}
