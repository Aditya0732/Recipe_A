import React from 'react';
import { MdOutlineTurnSharpRight } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const HeroImage = () => {
    return (
        <div className='relative lg:flex block'>
            <img src='menu1.jpg' alt='hero' className='lg:w-2/3 w-full lg:rounded-l-xl lg:rounded-r-none rounded-t-xl max-h-[500px]' />
            <div className='bg-[#bccefb] bg-opacity-60 p-3 lg:rounded-r-xl lg:rounded-l-none rounded-b-xl flex justify-center text-center items-center'>
                <div className='p-4 flex flex-col gap-3'>
                    <div className='flex gap-1 justify-center'>
                        <span><MdOutlineTurnSharpRight color='#ff642b' size={28} /></span>
                        <h1>85% would make this again</h1>
                    </div>
                    <h1 className='font-[Playfair-Display,serif] font-bold text-5xl'>Mighty Super Cheesecake</h1>
                    <h1>Look no further for a creamy and ultra smooth classic cheesecake recipe! no one can deny its simple decadence.</h1>
                </div>

            </div>
            <Link to={`/recipe/${632625}`}>
                <div className="absolute bottom-3 right-3 text-[#ff642b] hover:text-white hover:bg-[#ff642b] hover:transition-all duration-500 ease-in-out bg-white p-3 rounded-full cursor-pointer">
                    <FaArrowRightLong size={22} />
                </div>
            </Link>
        </div>
    );
};

export default HeroImage;
