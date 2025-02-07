import { useDispatch } from 'react-redux';
import { 
  addItem as addItemAction,
  removeItem as removeItemAction,
  clearItemFromBag as clearItemAction,
  clearBag as clearBagAction
} from '@/redux/bag/bag.reducer';

export const useBagOperations = () => {
  const dispatch = useDispatch();

  const addItem = (item) => {
    dispatch(addItemAction({ item, bagType: 'local' }));
  };

  const removeItem = (item) => {
    dispatch(removeItemAction({ item, bagType: 'local' }));
  };

  const clearItemFromBag = (item) => {
    dispatch(clearItemAction({ item, bagType: 'local' }));
  };

  const clearBag = () => {
    dispatch(clearBagAction({ bagType: 'local' }));
  };

  return {
    addItem,
    removeItem,
    clearItemFromBag,
    clearBag
  };
};

export default useBagOperations;
