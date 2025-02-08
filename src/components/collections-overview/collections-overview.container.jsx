import { useSelector } from "react-redux";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";

const CollectionsOverviewContainer = () => {
  const isLoaded = useSelector(selectIsCollectionsLoaded);

  return (
    <WithSpinner isLoading={!isLoaded}>
      <CollectionsOverview />
    </WithSpinner>
  );
};

export default CollectionsOverviewContainer;
