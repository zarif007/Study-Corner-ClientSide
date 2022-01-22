import React from 'react'

const SidebarLink = ({ text, Icon }) => {
  return (
    <div className='text-white flex items-center justify-start text-xl space-x-3 hoverAnimation'>
      <Icon className='h-7'/>
      <span className='hidden xl:inline'>{text}</span>
    </div>
  )
}

export default SidebarLink
