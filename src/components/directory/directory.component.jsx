import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MenuItem from '../menu-item/menu-item.component';
import { DirectoryMenuContainer } from './directory.styles';
import useWindowSize from '@/hooks/useWindowSize';

import { 
  fetchSections,
  selectDirectory,
  selectIsLoading,
  selectError
} from '@/redux/directory/directory.reducer';

const Directory = () => {
  const dispatch = useDispatch();
  const sections = useSelector(selectDirectory);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const { width } = useWindowSize();
  const [columnSections, setColumnSections] = useState({
    column1: [],
    column2: [],
    column3: []
  });

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  useEffect(() => {
    // clear columns
    let newColumns = {
      column1: [],
      column2: [],
      column3: []
    };
    const distributeToColumns = (newColumns, modValue) => {
      sections.forEach((section, index) => {
        const columnIndex = index % modValue;
        if (columnIndex === 0) newColumns.column1.push(section);
        else if (columnIndex === 1) newColumns.column2.push(section);
        else newColumns.column3.push(section);
      });

      setColumnSections(newColumns);
    };

    if (sections.length > 0) {
      if(width <=600) {
        newColumns = {
          column1: [],
          column2: []
        }
        distributeToColumns(newColumns, 1);
      } else if (width <=900) {
        newColumns = {
          column1: [],
          column2: []
        }
        distributeToColumns(newColumns, 2);
      } else {
        newColumns = {
          column1: [],
          column2: [],
          column3: []
        }
        distributeToColumns(newColumns, 3);
      }
    }
  }, [sections, width]);

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error loading categories: {error}</div>;
  }

  return (
    <DirectoryMenuContainer>
      <div>
      {columnSections.column1.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
      </div>
      <div>
      {columnSections.column2?.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
      </div>
      <div>
      {columnSections.column3?.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
      </div>
    </DirectoryMenuContainer>
  );
};

export default Directory;