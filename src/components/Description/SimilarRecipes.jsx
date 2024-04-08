import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { Link } from 'react-router-dom';


const SimilarRecipes = ({ recipe }) => {
    const [similarRecipe, setSimilarRecipe] = useState([]);
    const [similarDescriptions, setSimilarDescriptions] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const fetchSimilarRecipes = async () => {
            try {
                setLoader(true);
                const response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/similar?apiKey=a6cbffac8c7a431897721244d5754ceb`);
                setSimilarRecipe(response.data);
                setLoader(false);
            } catch (error) {
                console.error('Error fetching similar recipes:', error.message);
            }
        };

        fetchSimilarRecipes();
    }, [recipe.id]);

    useEffect(() => {
        const fetchSimilarDescriptions = async () => {
            if (similarRecipe.length > 0) {
                const ids = similarRecipe.slice(0, 6).map(recipeItem => recipeItem.id).join(',');
                const storedDescriptions = JSON.parse(localStorage.getItem('similarDescriptions')) || {};
                const missingIds = ids.split(',').filter(id => !storedDescriptions[id]);

                if (missingIds.length > 0) {
                    try {
                        setLoader(true);
                        const response = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${missingIds.join(',')}&apiKey=a6cbffac8c7a431897721244d5754ceb`);
                        const newDescriptions = response.data.reduce((acc, curr) => {
                            acc[curr.id] = curr;
                            return acc;
                        }, {});
                        setLoader(false);
                        const updatedDescriptions = { ...storedDescriptions, ...newDescriptions };
                        setSimilarDescriptions(Object.values(updatedDescriptions));
                        localStorage.setItem('similarDescriptions', JSON.stringify(updatedDescriptions));
                    } catch (error) {
                        console.error('Error fetching similar recipe descriptions:', error.message);
                    }
                } else {
                    setSimilarDescriptions(Object.values(storedDescriptions));
                }
            }
        };

        fetchSimilarDescriptions();
    }, [similarRecipe]);

    const [dotCount, setDotCount] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDotCount(count => (count === 3 ? 1 : count + 1));
        }, 300); // Change the interval as needed

        return () => clearInterval(intervalId);
    }, []);

    const renderDots = () => {
        switch (dotCount) {
            case 1:
                return <GoDotFill size={24} color='white' />;
            case 2:
                return (
                    <>
                        <GoDotFill size={24} color='white' />
                        <GoDotFill size={24} color='white' />
                    </>
                );
            case 3:
                return (
                    <>
                        <GoDotFill size={24} color='white' />
                        <GoDotFill size={24} color='white' />
                        <GoDotFill size={24} color='white' />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className='block mt-12'>
            {loader && (
                <div className="fixed inset-0 flex justify-center bg-black bg-opacity-50">
                    <div className='flex gap-2 px-3 h-fit py-1 bg-[#ff642b] rounded-b-lg z-[70]'>
                        {renderDots()}
                    </div>
                </div>
            )}
            <h1 className='font-[Playfair-Display,serif] font-bold text-4xl mt-4'>You might also like</h1>
            <div className='flex flex-wrap mt-10'>
                {similarDescriptions.map((recipeItem, index) => (
                    <div key={index} className='block p-2 w-full md:w-1/2 lg:w-1/3'>
                        <img src={recipeItem.image || "random.jpg"} alt='recipe' className='w-full rounded-xl rounded-b-none' />
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
    );
}

export default SimilarRecipes;
