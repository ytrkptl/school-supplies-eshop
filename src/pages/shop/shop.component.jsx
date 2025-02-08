import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";

import { fetchCollectionsAsync } from "../../redux/shop/shop.reducer";

const CollectionsOverviewContainer = lazy(
  () => import("../../components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() => import("../collection/collection.container"));

const ShopPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollectionsAsync());
  }, [dispatch]);

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            index
            element={<CollectionsOverviewContainer />}
          />
          <Route
            path=":collectionId"
            element={<CollectionPageContainer />}
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default ShopPage;
