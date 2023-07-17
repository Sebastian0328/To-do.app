import React, { useState } from 'react'
import { Forms } from './Forms'
export const ToDo = ({ activity, priority, date, handClick, classe, id, done, setList, setMemory }) => {
    // console.log('TODO',id);
    console.log(done);
    const handRealizadas = (done) => {
        if (done === true) {
            false
        }
        else {
            false
        }
        setList(prev => prev.map(todo => {
            if (todo.id === id) {
                return { ...todo, done: !done };
            }
            return todo;
        }));
        setMemory((prev => prev.map(todo => {
            if (todo.id === id) {
                return { ...todo, done: !done };
            }
            return todo;
        })))

    }
    return (<div className={`flex flex-col items-start border p-3 h-60  justify-between 
 ${done ? "" : "line-through"} ${priority === 'low' ? 'bg-green-600' : priority == 'Medium' ? 'bg-amber-400' : 'bg-red-600'}`}>
        <h2 className='text-3xl' >{activity}</h2>
        <p>Priority: {priority}</p>
        <p className='font-thin'>#{classe}</p>
        <p>Finish-date: {date}</p>
        <div className='flex gap-2.5'>
            <button onClick={() => { handClick(id) }} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l'>Delete</button>
            <button onClick={() => { handRealizadas(done) }} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r'>Done</button>
        </div>
    </div>

    )
}
