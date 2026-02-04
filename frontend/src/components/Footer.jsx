import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10 '>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* ---------left section----- */}
        <div >
           <img className='mb-5 w-40' src={assets.logoes} alt="" />
           <p className='w-full md:w-2/3 text-gray-600 leading-6'>Eslite links you with experienced engineers, ensuring efficient project planning and quality technical solutions.</p>
        </div>
         {/* ---------middle section----- */}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About US</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
         {/* ---------right section----- */}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+91 9709215843</li>
                <li>sudhanshu3094@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        {/* ----------copyrigth text-------- */}
        <hr />
        <p className='py-5 text-sm text-center'>copyrigth 2025@--eslite - self-project</p>
      </div>
    </div>
  )
}

export default Footer
