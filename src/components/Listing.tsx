import React from 'react';
import { ListingItem } from '../types';

interface ListingProps {
  items: ListingItem[];
}

export const Listing: React.FC<ListingProps> = ({ items = [] }) => {
  
  const formatTitle = (title: string) => {
    return title.length > 50 ? `${title.slice(0, 50)}…` : title;
  };

  const formatPrice = (price: string, currency: string) => {
    if (currency === 'USD') return `$${price}`;
    if (currency === 'EUR') return `€${price}`;
    if (currency === 'GBP') return `£${price}`;
    return `${currency} ${price}`;
  };

  const getQuantityClass = (quantity: number) => {
    if (quantity <= 10) return 'stock-low';
    if (quantity <= 20) return 'stock-medium';
    return 'stock-high';
  };

  return (
    <div className="item-list">
      {items.map((item) => {
        if (!item.listing_id || !item.MainImage || !item.title) return null;

        return (
          <div className="item" key={item.listing_id}>
            <div className="item-image">
              <a href={item.url}>
                <img src={item.MainImage.url_570xN} alt={item.title} />
              </a>
            </div>
            <div className="item-details">
              <p className="item-title">
                {formatTitle(item.title)}
              </p>
              <p className="item-price">
                {formatPrice(item.price || '0', item.currency_code || '')}
              </p>
              <p className={`item-quantity level-${getQuantityClass(item.quantity || 0).split('-')[1]}`}>
                 {item.quantity} left
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};