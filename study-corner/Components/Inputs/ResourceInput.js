import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/solid';
import React, { useRef, useState } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Multiselect from 'multiselect-react-dropdown';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { initializeFireBase } from '../../FireBase/firebase'


const ResourceInput = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [selectedCoursesFromMultiSelector, setSelectedCoursesFromMultiSelector] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const filePickerRef = useRef();

    const addImageToPost = e => {
        const reader = new FileReader();
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = readerEvent => {
            setSelectedImage(readerEvent.target.result);
        }
    }

    const addEmoji = e => {
        let sym = e.unified.split('-');
        let codesArray = [];
        sym.forEach(el => codesArray.push('0x' + el));
        let emoji = String.fromCodePoint(...codesArray);
        setBody(body + emoji);
    }

    const addCoursesFromBodyAndTitle = () => {
        let cs = new Set([...selectedCoursesFromMultiSelector]);
        let text = title + body; 
        courses.map(course => {
          if(text.includes(course.substring(3)))
            cs.add(course);
        });
        setSelectedCourses([...cs]);
    }

    const submitPost = async () => {
        if(isLoading) return;
        setIsLoading(true);

        const data = {
            title: title, 
            body: body,
            courses: selectedCourses,
            timestamp: serverTimestamp(),
        }
        const {db, storage} = initializeFireBase();

        const docRef = await addDoc(collection(db, 'resources'), data);

        const imageRef = ref(storage, `resources/${docRef.id}/image`);

        if(selectedImage) {
            await uploadString(imageRef, selectedImage, 'data_url')
              .then(async () => {
                  const downloadURL = await getDownloadURL(imageRef);
                  await updateDoc(doc(db, 'resources', docRef.id), {
                    image: downloadURL,
                  })
              })
        }

        setIsLoading(false);
        setBody("");
        setTitle('');
        setSelectedCourses([]);
        setSelectedCoursesFromMultiSelector([]);
        setSelectedImage(null);
        setShowEmojis(false);
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
      <div className={`border-b border-gray-700 p-3 flex space-x-3 lg:pl-24 lg:pr-24 ${isLoading && 'opacity-60'}`}>
        <img src='https://rb.gy/ogau5a' className='h-11 w-11 rounded-full cursor-pointer' alt=''/>

        <div className='w-full divide-y divide-gray-700'>
          <div className={`${selectedImage && 'pb-7'} ${body && 'space-y-2.5'} divide-y divide-gray-700`}>
            <input value={title}
              className='overflow-y-hidden font-extrabold min-h-[50px] bg-transparent outline-none text-white text-lg placeholder-gray-500 tracking-wide w-full' 
              placeholder='Title'
              onChange={e => {
                setTitle(e.target.value);
                addCoursesFromBodyAndTitle()
              }}  
              onBlur={e => {
                setTitle(e.target.value);
                addCoursesFromBodyAndTitle()
              }}
            />
            <textarea value={body} name='' rows='3' 
              className='overflow-y-hidden min-h-[50px] bg-transparent outline-none text-white text-lg placeholder-gray-500 tracking-wide w-full' 
              placeholder='Share Course based resources'
              onChange={e => {
                setBody(e.target.value);
                addCoursesFromBodyAndTitle()
              }}  
              onBlur={e => {
                setBody(e.target.value);
                addCoursesFromBodyAndTitle()
              }}
            />

            <Multiselect
              isObject={false}
              options={courses}
              selectedValues={selectedCourses}
              placeholder='Select Related Course/s'
              onSelect={e => {
                setSelectedCoursesFromMultiSelector(e);
                setSelectedCourses(e);
              }}
              onRemove={e => {
                setSelectedCourses(e)
                setSelectedCoursesFromMultiSelector(e);
              }}
              style={MultiSelectstyle}
            />
            {
              selectedImage && (
              <div className="relative mt-2">
                  <div
                    className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                    onClick={() => setSelectedImage(null)}
                  >
                    <XIcon className="text-white h-5"/>
                  </div>
                  <img
                    src={selectedImage}
                    alt=""
                    className="rounded-2xl max-h-80 object-contain pt-2"
                  />
              </div>
            )}
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
              disabled={!body.trim() || selectedCourses.length == 0 || !title.trim() || isLoading}
              onClick={submitPost}
            >Post</button>
          </div>
        </div>
      </div>
    )
}

export default ResourceInput
