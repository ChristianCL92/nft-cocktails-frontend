//src/components/CocktailNFTS.jsx
import '../styles/App.css';
import CocktailCollection from './CocktailCollection';
import Header from './Header';
import UserCollection from './UserCollection';


const CocktailNFTS = () => {

  return (
    <div className="container">
      <Header />
      <CocktailCollection />
      <UserCollection />
      <p className="disclaimer">
        This is an educational project focused on blockchain technology and
        NFTs. The content is for demonstration purposes only and not intended to
        promote alcohol consumption.
      </p>
    </div>
  );
};

export default CocktailNFTS;
