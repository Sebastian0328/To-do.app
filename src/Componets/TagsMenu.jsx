import React from 'react'

export const TagsMenu = ({tag, tagFilter, deleteTag}) => {
    const handleClick = () => {
        tagFilter(tag);
      };
  return (
    <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={handleClick}>#{tag}</button>
  )
}
