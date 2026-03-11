import React from 'react';
import PropTypes from 'prop-types';

const Listing = ({ items = [] }) => {
  
  const formatPrice = (price, currencyCode) => {
    if (currencyCode === 'USD') {
      return `$${price}`;
    }
    if (currencyCode === 'EUR') {
      return `€${price}`;
    }
    return `${price} ${currencyCode}`;
  };

  const getQuantityClass = (quantity) => {
    if (quantity <= 10) {
      return 'level-low';
    }
    if (quantity <= 20) {
      return 'level-medium';
    }
    return 'level-high';
  };

  const formatTitle = (title) => {
    if (!title) return '';
    return title.length > 50 ? `${title.slice(0, 50)}...` : title;
  };

  return (
    <div className="item-list">
      {items.map((item) => {
        if (!item.MainImage || !item.title) {
          return null;
        }

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
                {formatPrice(item.price, item.currency_code)}
              </p>
              <p className={`item-quantity ${getQuantityClass(item.quantity)}`}>
                {item.quantity} left
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Listing.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    listing_id: PropTypes.number,
    url: PropTypes.string,
    MainImage: PropTypes.shape({
      url_570xN: PropTypes.string
    }),
    title: PropTypes.string,
    currency_code: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number
  })),
};

Listing.defaultProps = {
  items: []
};

export default Listing;