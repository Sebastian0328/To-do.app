import React, { useEffect } from 'react'
import { useState } from 'react';
import { ToDo } from './ToDo';
import { TagsMenu } from './TagsMenu';
import { v4 as uuidv4 } from 'uuid';

export const Forms = () => {
    const [data, setData] = useState({})
    const [list, setList] = useState([])
    const [tag, setTag] = useState(["ALL"])
    const [memory, setMemory] = useState([])

    const tagFilter = (tag) => {
        if (tag === "ALL") {
            setList(memory)
        }
        else {
            {
                const filteredList = memory.filter((item) => item.class === tag);
                setList(filteredList);
            }
        }
    }
    const handleOrden = () => {
        setList(prev => {
            return [...prev].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        })
    }
    const handleChange = (event) => {
        setData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }

        })

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setList(prev => {
            return [...prev, data]

        })

        setTag(prev => {
            if ([...prev].includes(data.class)) {
                return prev
            }
            else {
                return [...prev, data.class]
            }
        })
        setMemory(prev => {
            return [...prev, data]
        })

    }
    const handClick = (activity) => {
        const deleteList = list.filter((list) => {

            return list.activity !== activity
        });
        setList(deleteList)
        setMemory(deleteList);
        const remainingTags = deleteList.map((item) => item.class);
        const uniqueTags = ["ALL",...new Set(remainingTags)];
        setTag(uniqueTags)
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label>TAREA</label>
                    <input className="border-2" type="text" name="activity" onChange={handleChange} value={data.activity || ''} />
                </div>
                <select className="border-2" type="text" name="priority" onChange={handleChange} value={data.priority} >
                    <option>low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
                <input className='border-2' type="date" name="date" onChange={handleChange} value={data.date || ""} />
                <div>
                    <label >TAG</label>
                    <input className='border-2' type="text" name="class" onChange={handleChange} value={data.class || ""} />
                </div>
                <input className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit" name="submit" onClick={handleSubmit} />
            </form>
            <hr />
            <div className='flex justify-center'>
                {tag.map((tag, i) => (<TagsMenu key={i} tag={tag} tagFilter={tagFilter}  />))}
            </div>
            <hr />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleOrden}>ORDENAR POR FECHA</button>
            <div className='flex flex-wrap gap-10 p-3'>
                {list.map((data, i) => (<ToDo key={i} activity={data.activity} priority={data.priority} date={data.date} classe={data.class} handClick={handClick} />))
                }

            </div>
        </div>
    )
}
