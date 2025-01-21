import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MenuItem from '../menu-item/menu-item.component';
import { DirectoryMenuContainer } from './directory.styles';

import { 
  fetchSections,
  selectDirectory,
  selectIsLoading,
  selectError
} from '../../redux/directory/directory.reducer';

const Directory = () => {
  const dispatch = useDispatch();
  const sections = useSelector(selectDirectory);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [columnSections, setColumnSections] = useState({
    column1: [],
    column2: [],
    column3: []
  });

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  useEffect(() => {
    const distributeToColumns = () => {
      const newColumns = {
        column1: [],
        column2: [],
        column3: []
      };

      sections.forEach((section, index) => {
        const columnIndex = index % 3;
        if (columnIndex === 0) newColumns.column1.push(section);
        else if (columnIndex === 1) newColumns.column2.push(section);
        else newColumns.column3.push(section);
      });

      setColumnSections(newColumns);
    };

    if (sections.length > 0) {
      distributeToColumns();
    }
  }, [sections]);

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error loading categories: {error}</div>;
  }

  console.log(columnSections);

  return (
    <DirectoryMenuContainer>
      <div>
      {columnSections.column1.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
      </div>
      <div>
      {columnSections.column2.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
      </div>
      <div>
      {columnSections.column3.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
      </div>
    </DirectoryMenuContainer>
  );
};

export default Directory;