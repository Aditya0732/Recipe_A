import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { Link } from 'react-router-dom';

const Categories = ({ query }) => {
  const [similarRecipe, setSimilarRecipe] = useState([]);
  const [similarDescriptions, setSimilarDescriptions] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem('similarDescriptions');
        if (storedData) {
          const descriptions = JSON.parse(storedData);
          if (descriptions[query]) {
            setSimilarDescriptions(descriptions[query]);
          } else {
            fetchDescriptions();
          }
        } else {
          fetchDescriptions();
        }
      } catch (error) {
        console.error('Error fetching data from localStorage:', error.message);
      }
    };

    const fetchDescriptions = async () => {
      try {
        setLoader(true);
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=84a634f7e198482e9c4ee29a5d3d00c6&query=${query}`);
        setSimilarRecipe(response.data.results);
        setLoader(false);

        const filteredRecipes = response.data.results.filter(recipeItem => recipeItem.title.toLowerCase().includes(query.toLowerCase()));
        const ids = filteredRecipes.slice(0, 6).map(recipeItem => recipeItem.id).join(',');

        if (ids) {
          setLoader(true);
          const descriptionsResponse = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=84a634f7e198482e9c4ee29a5d3d00c6`);
          const newDescriptions = descriptionsResponse.data.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
          }, {});

          setSimilarDescriptions(Object.values(newDescriptions));
          setLoader(false);
          const storedData = localStorage.getItem('similarDescriptions');
          const descriptions = storedData ? JSON.parse(storedData) : {};
          descriptions[query] = Object.values(newDescriptions);
          localStorage.setItem('similarDescriptions', JSON.stringify(descriptions));
        }
      } catch (error) {
        console.error('Error fetching similar recipes:', error.message);
      }
    };

    fetchData();
  }, [query]);

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
    <>
      {loader && (
        <div className="fixed inset-0 flex justify-center bg-white bg-opacity-50">
          <div className='flex gap-2 px-3 h-fit py-1 bg-[#ff642b] rounded-b-lg z-[70]'>
            {renderDots()}
          </div>
        </div>
      )}
      {similarRecipe && (
        <div className='mt-10'>
          <h1 className='font-[Playfair-Display,serif] font-bold text-4xl'>{query}</h1>
          <div className='flex flex-wrap mt-10'>
            {similarDescriptions.length === 0 ? (
              <div className="error-message">
                <h1>OOP's something went wrong, please try again later.</h1>
              </div>
            ) : (
              similarDescriptions.map((recipeItem, index) => (
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
              ))
            )}

          </div>
        </div>
      )}
    </>
  );
}

export default Categories;
