import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SearchPage = ({ similarDescriptions }) => {
    return (
        <div>
            {similarDescriptions?.length === 0 && (
                <div className="search-page">
                    <h1 className="search-message">Search for your favorite dish</h1>
                </div>
            )}
            <div className='flex justify-center'>
                <div className='flex flex-wrap mt-10 w-3/4'>
                    {similarDescriptions?.length > 0 && similarDescriptions.map((recipeItem, index) => (
                        <div key={index} className='block p-2 w-full md:w-1/2 lg:w-1/3'>
                            <img src={recipeItem.image || "menu1.jpg"} alt='recipe' className='w-full rounded-xl rounded-b-none' />
                            <div className='p-6 pt-4 border border-[#d8d8d8] border-t-0 rounded-b-xl flex flex-col gap-3'>
                                <div className='flex gap-2 items-center border-b border-[#E0E0E0] py-2'>
                                    <span><FaHeart size={16} color='#ff642b' /></span>
                                    <h1 className='text-sm font-semibold'>{recipeItem?.aggregateLikes} likes</h1>
                                </div>
                                <h1 className='text-base lg:text-lg font-semibold'>{recipeItem.title}</h1>
                                <div style={{ maxHeight: '100px', overflow: 'hidden' }}>
                                    <h1 className='text-sm' dangerouslySetInnerHTML={{ __html: recipeItem?.summary }}></h1>
                                </div>
                                <div className="flex justify-end">
                                <Link to={`/recipe/${recipeItem.id}`} className="text-[#ff642b] text-sm hover:underline">...Read more</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
