import React, { useEffect } from 'react'
import { useState } from 'react';
import { ToDo } from './ToDo';
import { TagsMenu } from './TagsMenu';
import { v4 as uuidv4, v4 } from 'uuid';

export const Forms = () => {
    const [data, setData] = useState({})
    const [list, setList] = useState(JSON.parse(localStorage.getItem("data")) || [])
    const [tag, setTag] = useState(JSON.parse(localStorage.getItem("tags"))||["ALL"])
    const [memory, setMemory] = useState(JSON.parse(localStorage.getItem("data")) || [])
    // const [done, setDone] = useState(true)

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
        const id = v4()
        const done =true
        console.log('FORM', id);
        setList(prev => {
            return [...prev, { ...data, id: id, done: done }]

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
            return [...prev, { ...data, id: id, done: done}]
        })

    }
    const handClick = (id) => {
        const deleteList = list.filter((list) => {
            return list.id !== id
        });
        const deleteMemory = memory.filter((list) => {
            return list.id !== id
        });
        setList(deleteList)
        setMemory(deleteMemory);
        const remainingTags = deleteMemory.map((item) => item.class);
        const uniqueTags = ["ALL", ...new Set(remainingTags)];
        setTag(uniqueTags)

    }
    useEffect(()=>{
        localStorage.setItem("tags",JSON.stringify(tag))
        localStorage.setItem("data", JSON.stringify(memory))
    },[list])
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
                {tag.map((tag, i) => (<TagsMenu key={i} tag={tag} tagFilter={tagFilter} />))}
            </div>
            <hr />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleOrden}>ORDENAR POR FECHA</button>
            <div className='flex flex-wrap gap-10 p-3'>
                {list.map((data, i) => (<ToDo key={i} setMemory={setMemory} id={data.id} done={data.done} activity={data.activity} priority={data.priority} date={data.date} classe={data.class} handClick={handClick} setList={setList} />))
                }

            </div>
        </div>
    )
}
