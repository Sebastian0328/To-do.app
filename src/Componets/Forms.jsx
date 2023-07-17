import React, { useEffect } from 'react'
import { useState } from 'react';
import { ToDo } from './ToDo';
import { TagsMenu } from './TagsMenu';
import { v4 as uuidv4, v4 } from 'uuid';

export const Forms = () => {
    const [data, setData] = useState({})
    const [list, setList] = useState(JSON.parse(localStorage.getItem("data")) || [])
    const [tag, setTag] = useState(JSON.parse(localStorage.getItem("tags")) || ["ALL"])
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
        const done = true
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
            return [...prev, { ...data, id: id, done: done }]
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
    useEffect(() => {
        localStorage.setItem("tags", JSON.stringify(tag))
        localStorage.setItem("data", JSON.stringify(memory))
    }, [list])
    return (
        // <section className='bg-[url(/src/assets/fondo.png)]'>
        <section className='bg-[url(/src/assets/fondo.png)] bg-cover bg-center bg-no-repeat h-screen font-dm-sans'>
            <div className='p-20 pb-0'>
                <form onSubmit={handleSubmit}>
                    <div className='flex justify-center flex-col items-center gap-4 p-2'>
                        <div className='gap-0 flex flex-col items-center'>
                            <h2 className='text-blue-700 font-semibold '>Note Name</h2>
                            <p>Do not forget this!</p>
                        </div>
                        <input className="bg-gray-200 w-3/5  rounded-sm h-8" type="text" name="activity" onChange={handleChange} value={data.activity || ''} />
                    </div>

                    <div className='flex justify-center gap-20'>
                        <div>
                            <h3 className='text-blue-700 font-semibold'>Importance</h3>
                            <select className="bg-gray-200 w-48 rounded-sm h-8" type="text" name="priority" onChange={handleChange} value={data.priority} >
                                <option>low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select></div>
                        <div>
                            <h3 className='text-blue-700 font-semibold'>Date</h3>
                            <input className='bg-gray-200 w-48 rounded-sm h-8 ' type="date" name="date" onChange={handleChange} value={data.date || ""} />
                        </div>
                        <div>
                            <h3 className='text-blue-700 font-semibold'>Tag</h3>
                            <input className='bg-gray-200 rounded-sm h-8' type="text" name="class" onChange={handleChange} value={data.class || ""} />
                        </div>
                    </div>
                    <div className='flex justify-center gap-20 p-10'>
                        <input className='bg-amber-500 hover:bg-amber-300 text-white font-bold py-2 px-4 rounded-lg border-4 border-yellow-300' type="submit" name="submit" onClick={handleSubmit}  value="Create Note" />
                        <button className='bg-amber-500 hover:bg-amber-300 text-white font-bold py-2 px-4 rounded-lg border-4 border-yellow-300' onClick={handleOrden}>To order by date</button>
                    </div>
                </form>
            </div>

            <hr  />
            <div>
                <div className='flex justify-center gap-2 p-1 flex-wrap'>
                    {tag.map((tag, i) => (<TagsMenu key={i} tag={tag} tagFilter={tagFilter} />))}
                </div>
                <hr />
                {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleOrden}>ORDENAR POR FECHA</button> */}
                <div className='flex flex-wrap gap-10 p-3'>
                    {list.map((data, i) => (<ToDo key={i} setMemory={setMemory} id={data.id} done={data.done} activity={data.activity} priority={data.priority} date={data.date} classe={data.class} handClick={handClick} setList={setList} />))
                    }
                </div>
            </div>

        </section>
    )
}
