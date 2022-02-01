import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/solid';
import React, { useRef, useState } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Multiselect from 'multiselect-react-dropdown';



const ResourceInput = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    
    const filePickerRef = useRef();

    const addImageToPost = () => {}

    const addEmoji = e => {
        let sym = e.unified.split('-');
        let codesArray = [];
        sym.forEach(el => codesArray.push('0x' + el));
        let emoji = String.fromCodePoint(...codesArray);
        setBody(body + emoji);
    }

    const courses = ['CSE420', 'CSE340', 'CSE110', 'CSE111', 'CSE320', 'Others'];

    const MultiSelectstyle = {
        searchBox: {
          border: "none",
        },
        multiselectContainer: {
          color: "#1d9bf0",
        },
    };

    return (
      <div className={`border-b border-gray-700 p-3 flex space-x-3 lg:pl-24 lg:pr-24`}>
        <img src='https://rb.gy/ogau5a' className='h-11 w-11 rounded-full cursor-pointer' alt=''/>

        <div className='w-full divide-y divide-gray-700'>
          <div className={`${selectedImage && 'pb-7'} ${body && 'space-y-2.5'} divide-y divide-gray-700`}>
            <input value={title}
              className='overflow-y-hidden font-extrabold min-h-[50px] bg-transparent outline-none text-white text-lg placeholder-gray-500 tracking-wide w-full' 
              placeholder='Title'
              onChange={e => {
                setTitle(e.target.value);
                let cs = new Set();
                let text = title + body; 
                courses.map(course => {
                  if(text.includes(course.substring(3)))
                    cs.add(course);
                });
                setSelectedCourses([...cs]);
              }}  
              onBlur={e => {
                setTitle(e.target.value);
                let cs = new Set();
                let text = title + body; 
                courses.map(course => {
                  if(text.includes(course.substring(3)))
                    cs.add(course);
                });
                setSelectedCourses([...cs]);
              }}
            />
            <textarea value={body} name='' rows='3' 
              className='overflow-y-hidden min-h-[50px] bg-transparent outline-none text-white text-lg placeholder-gray-500 tracking-wide w-full' 
              placeholder='Share Course based resources'
              onChange={e => {
                setBody(e.target.value);
                let cs = new Set();
                let text = title + body; 
                courses.map(course => {
                  if(text.includes(course.substring(3)))
                    cs.add(course);
                });
                setSelectedCourses([...cs]);
              }}  
              onBlur={e => {
                setBody(e.target.value);
                let cs = new Set();
                let text = title + body; 
                courses.map(course => {
                  if(text.includes(course.substring(3)))
                    cs.add(course);
                });
                setSelectedCourses([...cs]);
              }}
            />

            <Multiselect
              isObject={false}
              options={courses}
              selectedValues={selectedCourses}
              placeholder='Select Related Course/s'
              onSelect={e => {setSelectedCourses(e)
                console.log(selectedCourses)
                }}
              onRemove={e => {setSelectedCourses(e)
                console.log(selectedCourses)
                }}
              style={MultiSelectstyle}
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

          <div className='flex items-center justify-between pt-2.5'>
            <div className='flex items-center'>
              <div className='icon' onClick={() => filePickerRef.current.click()}>
                <PhotographIcon className='h-[22px] text-[#1D9BF0]' />
                <input type='file' onChange={addImageToPost} ref={filePickerRef} hidden/>
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
              </div>
              {
                showEmojis && <Picker 
                  onSelect={addEmoji}
                  style={{
                    position: "absolute",
                    marginTop: "465px",
                    marginLeft: -40,
                    maxWidth: "320px",
                    borderRadius: "20px",
                  }}
                  theme="dark"
                />
              }
            </div>
            <button 
              className='bg-[#1d9bf0] text-white rounded-sm px-4 py-1.5 shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default'
              disabled={!body.trim() || selectedCourses.length == 0}
            >Post</button>
          </div>
        </div>
      </div>
    )
}

export default ResourceInput
