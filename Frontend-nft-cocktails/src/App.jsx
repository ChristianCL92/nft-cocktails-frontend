import { WalletProvider } from "./context/WalletContext";
import CocktailNFTS from "./components/CocktailNFTS";
function App() {

  return (
    <>
    <WalletProvider>
      <CocktailNFTS />
    </WalletProvider>
    </>
  )
}

export default App
