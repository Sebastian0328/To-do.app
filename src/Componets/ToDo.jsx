import React, { useState } from 'react'
import { Forms } from './Forms'
export const ToDo = ({ activity, priority, date, handClick, classe }) => {
    const [done, setDone] = useState(true)
    const handRealizadas = () => {
        setDone(prev =>{
            return prev ?false:true})
    }
    console.log(date);
    return (<div className={`flex flex-col items-start border p-3 
    rounded-3xl ${done?"":"line-through" } ${priority === 'low' ? 'bg-green-400' : priority == 'Medium' ?  'bg-amber-300' : 'bg-red-600' }`}>
        <h2 className='text-3xl' >{activity}</h2>
        <p>Priority: {priority}</p>
        <p className='font-thin'>#{classe}</p>
        <p>Finish-date: {date}</p>
        <div className='flex gap-2.5'>
        <button onClick={() => { handClick(activity) }} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l'>ELIMINAR</button>
        <button onClick={handRealizadas}className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r'>REALIZADA</button>
        </div>
    </div>


    )
}
