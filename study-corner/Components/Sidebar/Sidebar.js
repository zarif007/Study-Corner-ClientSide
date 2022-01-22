import Image from 'next/image'
import React from 'react'

const Sidebar = () => {
    return (
        <div className='text-cyan-100 hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 absolute'>
            <div className='flex items-center justify-center w-14 h-14 p-0 xl:ml-24 hoverAnimation'>
                <Image src="https://rb.gy/ogau5a" width={30} height={30}/>
            </div>
        </div>
    )
}

export default Sidebar
