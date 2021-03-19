import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

const CollectionOverview = lazy(() =>
  import('../../components/collections-overview/collections-overview.component')
);
const CollectionPage = lazy(() => import('../collection/collection.container'));

// import CollectionPage from '../collection/collection.component';
// import WithSpinner from '../../components/with-spinner/with-spinner.component';

//creating HOC components withspinner
// const CollectionPagewithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, fetchCollectionsStart }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div>
      <Suspense fallback={<Spinner />} />
      <Route exact path={`${match.path}`} component={CollectionOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
