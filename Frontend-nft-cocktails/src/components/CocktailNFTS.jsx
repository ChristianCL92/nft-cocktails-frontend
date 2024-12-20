//src/components/CocktailNFTS.jsx
import '../styles/App.css';
import CocktailCollection from './CocktailCollection';
import Header from './Header';
import UserCollection from './UserCollection';


const CocktailNFTS = () => {

  return (
    <div className='container'>
    <Header/>
    <CocktailCollection/>
    <UserCollection />
    </div>
  
  );
};

export default CocktailNFTS;
