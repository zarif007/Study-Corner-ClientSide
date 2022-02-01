import React from 'react'
import { DotsHorizontalIcon, ArchiveIcon } from '@heroicons/react/solid'
import ResourceInput from '../Inputs/ResourceInput';

const ResourcesFeed = () => {
    return (
        <div className='text-white flex-grow border-l border-r border-gray-600 max-w-4xl ml-[72px] xl:ml-[400px] md:ml-[100px] xl:mr-[40px]'>
            <div className='text-white flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-600'>
                <h2 className='text-lg sm:text-xl font-bold'>Resources</h2>
                <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto'>
                    <ArchiveIcon className='h-5' />
                </div>
            </div>

            <ResourceInput />
        </div>
    )
}

export default ResourcesFeed
