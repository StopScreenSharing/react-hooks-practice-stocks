import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ stocks, onStockClick }) {
  return (
    <div>
      <h2>My Portfolio</h2>
        {stocks.length > 0 ? (
          stocks.map((stock) => (
           <div  key={stock.id} className="card" onClick={() => onStockClick(stock)}>
           <div className="card-body">
             <h5 className="card-title">{stock.name}</h5>
             <p className="card-text">{stock.ticker}: {stock.price}</p>
           </div>
         </div>
         ))
        ) : (
          <p>Select a stock</p>
        )}
    </div>
  );
}

export default PortfolioContainer;
