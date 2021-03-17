import React from 'react';
import CollectionItem from '../collection-item/collection-item.component';
import { withRouter } from 'react-router-dom';
import { ShopLink } from './collection-preview.styles';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items, history, routeName, match }) => {
  return (
    <div className='collection-preview'>
      <ShopLink
        className='title'
        onClick={() => history.push(`${match.url}/${routeName}`)}
      >
        {title.toUpperCase()}
      </ShopLink>
      <div className='preview'>
        {items
          .filter((item, idx) => idx < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default withRouter(CollectionPreview);
