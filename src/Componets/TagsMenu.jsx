import React from 'react'

export const TagsMenu = ({tag, tagFilter, deleteTag}) => {
    const handleClick = () => {
        tagFilter(tag);
      };
  return (
    <button className='bg-transparent hover:bg-yellow-300 text-yellow-300 font-semibold hover:text-white py-2 px-4 border border-yellow-300 hover:border-transparent rounded' onClick={handleClick}>#{tag}</button>
  )
}
