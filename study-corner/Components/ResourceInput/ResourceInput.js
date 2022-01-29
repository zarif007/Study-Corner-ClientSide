import { XIcon } from '@heroicons/react/solid';
import React, { useState } from 'react'

const ResourceInput = () => {

    const [input, setInput] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    return (
      <div className={`border-b border-gray-700 p-3 flex space-x-3`}>
        <img src='https://rb.gy/ogau5a' className='h-11 w-11 rounded-full cursor-pointer' alt=''/>

        <div className='w-full divide-y divide-gray-700'>
          <div className={''}>
            <textarea value={input} name='' rows='2' 
              className='min-h-[50px] bg-transparent outline-none text-white text-lg placeholder-gray-500 tracking-wide w-full' 
              placeholder='Share Course based resources'
              onChange={e => setInput(e.target.value)}  
            />

            {
              selectedImage && 
              <div className='relative'>
                <div className='absolute w-8 h-8 bg-black hover:bg-slate-800 bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                    onClick={() => setSelectedImage(null)}
                  >
                  <XIcon className='h-5 text-white'/> 
                  <img src={selectedImage} className='rounded-2xl max-h-80 object-contain' />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    )
}

export default ResourceInput
