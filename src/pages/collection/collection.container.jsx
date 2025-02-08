import { useSelector } from "react-redux";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "./collection.component";

const CollectionPageContainer = () => {
  const isLoaded = useSelector(selectIsCollectionsLoaded);

  return (
    <WithSpinner isLoading={!isLoaded}>
      <CollectionPage />
    </WithSpinner>
  );
};

export default CollectionPageContainer;
