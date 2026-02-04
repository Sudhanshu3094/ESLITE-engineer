import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='pt-30  flex flex-col md:flex-row flex-wrap bg-neutral-200 rounded-lg px-6 md:px-10 lg:px-20 '>
            {/* ---------Left Side --------*/}

            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py[10vw] md:mb-[-30px]'>
                <p className='text-3xl md:text-5xl lg:text-4xl  font-semibold leading-tigth md:leading-tight lg:leading-tight'>
                    Book Meetings <br /> With Professional & Trustworthy
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-zinc-400 text-sm font-light'>
                    <img className='w-28' src={assets.group_profiles} alt="" />
                    <p>Your career is in safe hands with our trusted Engineers. <br  className='hidden sm:block'/>— certified experts who care, listen, and treat with confidence.</p>
                </div>
                <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-zinc-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' >Book Meetings <img className='w-3' src={assets.arrow_icon} alt="" /></a>
            </div>
            {/*----------Rigth Side------*/}

            <div className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-0 h-100 rounded-t-lg' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Header
