import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import RecipeDescription from './pages/RecipeDescription';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import SearchPage from './components/SearchPage';
import axios from 'axios';
import { GoDotFill } from 'react-icons/go';

function App() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [similarRecipe, setSimilarRecipe] = useState([]);
  const [similarDescriptions, setSimilarDescriptions] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleSearch = async () => {
    try {
      setLoader(true);
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=0152dc2c3477445fb7cd64a993ddbf7c&query=${searchTerm}`);
      setSimilarRecipe(response.data.results);
      setLoader(false);
    } catch (error) {
      console.error('Error fetching similar recipes:', error.message);
    }
  }

  useEffect(() => {
    const fetchSimilarDescriptions = async () => {
      if (similarRecipe.length > 0) {
        const ids = similarRecipe.map(recipeItem => recipeItem.id).join(',');
        try {
          setLoader(true);
          const response = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=0152dc2c3477445fb7cd64a993ddbf7c`);

          setLoader(false);

          setSimilarDescriptions(response.data);

        } catch (error) {
          console.error('Error fetching similar recipe descriptions:', error.message);
        }

      }
    };

    fetchSimilarDescriptions();
  }, [similarRecipe]);

  const handleChange = (value) => {
    setSearchTerm(value);
  }

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

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
    <div>
    {loader && (
        <div className="fixed inset-0 flex justify-center bg-white bg-opacity-50">
          <div className='flex gap-2 px-3 h-fit py-1 bg-[#ff642b] rounded-b-lg z-[70]'>
            {renderDots()}
          </div>
        </div>
      )}
      <Nav isSearchVisible={isSearchVisible} toggleSearch={toggleSearch} handleSearch={handleSearch} searchTerm={searchTerm} handleChange={handleChange} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDescription />} />
        <Route path="/search" element={<SearchPage similarDescriptions={similarDescriptions}/>} />
      </Routes>

    </div>
  );
}

export default App;
