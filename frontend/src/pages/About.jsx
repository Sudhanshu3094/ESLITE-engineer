import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'> US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gary-600'>
          <p>Welcome to Eslite, your reliable partner in connecting with skilled engineers effortlessly. We understand how important it is to find the right expertise for your projects, so we make scheduling consultations and managing engineering services simple and seamless.</p>
        <p>Eslite stands at the forefront of engineering excellence. Our mission is to simplify the way you connect with skilled engineers, bringing together technology, expertise, and convenience. Whether you’re planning your first project or refining ongoing work, Eslite is your reliable partner in success</p>
        <b className='text-gray-800'>Our Vision</b>
        <p>Our vision at Eslite is to create a seamless engineering experience for every user. We aim to bridge the gap between clients and skilled engineers, making it easier for you to access the expertise you need, when you need it.</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-zinc-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'><b>EFFICIENCY:</b><p>Smart scheduling tools that make connecting with the right engineer quick and hassle-free</p></div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-zinc-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'><b>CONVENIENCE:</b><p>Access to a network of trusted engineers and technical experts in your area</p></div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-zinc-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'><b>PERSONALIZATION:</b><p>Tailored recommendations and project reminders to help you stay on track with your engineering goals.</p></div>
      </div>
    </div>
  )
}

export default About
