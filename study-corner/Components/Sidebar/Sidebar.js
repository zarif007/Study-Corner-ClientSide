import Image from 'next/image'
import React from 'react'
import SidebarLink from './../SidebarLink/SidebarLink';
import { DotsHorizontalIcon, ArchiveIcon, QuestionMarkCircleIcon, ChatAlt2Icon, PuzzleIcon, FireIcon, BookmarkIcon } from '@heroicons/react/solid'

const Sidebar = () => {
    return (
        <div className='flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full'>
            <div className='flex items-center justify-center w-14 h-14 p-0 xl:ml-24 hoverAnimation'>
                <Image src="https://rb.gy/ogau5a" width={30} height={30}/>
            </div>
            <div className='space-y-3 mt-4 mb-2.5 xl:ml-24'>
                <SidebarLink text="Resources" Icon={ArchiveIcon}/>
                <SidebarLink text="Ask" Icon={QuestionMarkCircleIcon}/>
                <SidebarLink text="Suggestions" Icon={ChatAlt2Icon}/>
                <SidebarLink text="Extracurricular" Icon={PuzzleIcon}/>
                <SidebarLink text="Memes" Icon={FireIcon}/>
                <SidebarLink text="Saved" Icon={BookmarkIcon}/>
            </div>
            <div className='text-white flex items-center justify-center mt-auto xl:ml-24 hoverAnimation  xl:-mr-5'>
                <img src='https://rb.gy/ogau5a' className='h-10 w-10 rounded-full xl:mr-2.5'/>
                <div className='hidden xl:inline leading-5'>
                    <h4 className='font-bold'>Zarif</h4>
                    <p>@zrrrr</p>
                </div>
                <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
            </div>
        </div>
    )
}

export default Sidebar
