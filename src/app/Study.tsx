import React from 'react'
import { Red_Hat_Display } from 'next/font/google';
const red_hat = Red_Hat_Display({ subsets: ['latin'] ,weight:'500'});

export default function Study() {
  return (
    <div id='study' className='bg-gray-300 text-sm'>
        <h1 className={'text-center text-4xl md:text-5xl py-10 md:py-20 text-gray-800 '+red_hat}>My study</h1>
        <div className='grid  grid-cols-6 md:grid-cols-11 mx-4 md:mx-8'>
            <div className='h-full p-3 md:p-5 col-span-5 '>
                <div className='p-5 bg-gray-400 text-gray-800 rounded-3xl'>
                    <h1 className='text-3xl'>Title 1</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, consequuntur tempore natus esse, mollitia magni quia in repudiandae velit blanditiis nobis nemo necessitatibus commodi beatae reprehenderit ipsum nesciunt temporibus voluptate.</p>
                </div>
            </div>
            <div className='h-full flex justify-center items-center'>
                <div className='bg-gray-500 h-full w-2 rounded-t-xl'></div>
                <div className='bg-gray-500 w-5 h-5 rounded-full absolute'></div>
            </div>
            <div className='h-full col-span-5'></div>
        </div>

        <div className='grid grid-cols-6 md:grid-cols-11 text-justify mx-4 md:mx-8'>
            <div className='h-full col-span-5'></div>
            <div className='h-full order-2 flex justify-center items-center'>
                <div className='bg-gray-500 h-full w-2'></div>
                <div className='bg-gray-500 w-5 h-5 rounded-full absolute'></div>
            </div>
            <div className='h-full p-3 md:p-5 order-1 md:order-3 col-span-5 '>
                <div className='p-5 bg-gray-400 text-gray-800 rounded-3xl'>
                    <h1 className='text-3xl'>Title 2</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, consequuntur tempore natus esse, mollitia magni quia in repudiandae velit blanditiis nobis nemo necessitatibus commodi beatae reprehenderit ipsum nesciunt temporibus voluptate.</p>
                </div>
            </div>
        </div>

        <div className='grid  grid-cols-6 md:grid-cols-11 mx-4 md:mx-8'>
            <div className='h-full p-3 md:p-5 col-span-5 '>
                <div className='p-5 bg-gray-400 text-gray-800 rounded-3xl'>
                    <h1 className='text-3xl'>Title 3</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, consequuntur tempore natus esse, mollitia magni quia in repudiandae velit blanditiis nobis nemo necessitatibus commodi beatae reprehenderit ipsum nesciunt temporibus voluptate.</p>
                </div>
            </div>
            <div className='h-full flex justify-center items-center'>
                <div className='bg-gray-500 h-full w-2'></div>
                <div className='bg-gray-500 w-5 h-5 rounded-full absolute'></div>
            </div>
            <div className='h-full col-span-5'></div>
        </div>

        <div className='grid grid-cols-6 md:grid-cols-11 text-justify mx-4 md:mx-8'>
            <div className='h-full col-span-5'></div>
            <div className='h-full order-2 flex justify-center items-center'>
                <div className='bg-gray-500 h-full w-2 rounded-b-xl'></div>
                <div className='bg-gray-500 w-5 h-5 rounded-full absolute'></div>
            </div>
            <div className='h-full p-3 md:p-5 order-1 md:order-3 col-span-5 '>
                <div className='p-5 bg-gray-400 text-gray-800 rounded-3xl'>
                    <h1 className='text-3xl'>Title 4</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, consequuntur tempore natus esse, mollitia magni quia in repudiandae velit blanditiis nobis nemo necessitatibus commodi beatae reprehenderit ipsum nesciunt temporibus voluptate.</p>
                </div>
            </div>
        </div>


    </div>
  )
}
