import React, {useEffect, useState}  from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [sortType, setSortType] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:3001/stocks')
    .then((r) => r.json())
    .then((stocks) => setStocks(stocks));
  }, [])

  const handleStockClick = (stock) => {
    if(!portfolioStocks.find((s) => s.id === stock.id)) {
      setPortfolioStocks([...portfolioStocks, stock]);
    }
  };

  const handleRemoveStock = (stockToRemove) => {
    setPortfolioStocks(portfolioStocks.filter((stock) => stock.id !== stockToRemove.id));
  };

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  }

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortType === 'Alphabetically') {
      return a.name.localeCompare(b.name);
    } else if (sortType === "Price") {
      return a.price - b.price;
    }
    return 0;

  });

  const filteredStocks = filterType 
  ? sortedStocks.filter(stock => stock.type === filterType)
  : sortedStocks;

  return (
    <div>
      <SearchBar 
      sortType={sortType} 
      onSortChange={handleSortChange} 
      filterType={filterType}
      onFilterChange={handleFilterChange}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onStockClick={handleStockClick}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolioStocks} onStockClick={handleRemoveStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
