import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selectors";

import { CollectionPageContainer, CollectionTitle, CollectionItemsContainer } from "./collection.styles";

const CollectionPage = () => {
  const { collectionId } = useParams();
  const collection = useSelector((state) => selectCollection(collectionId)(state));

  if (!collection) {
    //console.log('Collection not found');
    return null;
  }

  const { title, items } = collection;

  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.map((item) => (
          <CollectionItem
            key={item.id}
            item={item}
          />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

export default CollectionPage;
