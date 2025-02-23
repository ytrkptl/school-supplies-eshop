import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cart/cart.reducer";
import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainerAndPriceContainer,
  NameContainer,
  PriceContainer
} from "./collection-item.styles";

const CollectionItem = ({ item }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = item;

  const handleAddItem = () => dispatch(addItem(item));

  return (
    <CollectionItemContainer>
      <BackgroundImage
        className="image"
        $imageUrl={imageUrl}
      />
      <CollectionFooterContainer>
        <NameContainerAndPriceContainer>
          <NameContainer>{name}</NameContainer>
          <PriceContainer>${price}</PriceContainer>
        </NameContainerAndPriceContainer>
        <AddButton
          onClick={handleAddItem}
          inverted>
          Add to cart
        </AddButton>
      </CollectionFooterContainer>
    </CollectionItemContainer>
  );
};

export default CollectionItem;
