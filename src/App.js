import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './table/Table';
import Loader from './loader/Loader';
import Modal from './modal/modal';

import './app.scss';

function App() {
  const [dataContent, setDataContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [directionSort, setDirectionSort] = useState(true);
  const [selectedItem, setSelectedItem] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const combinedData = [];
        let pageIndex = 1;

        while (pageIndex <= 9) {
          const response = await axios.get(`https://swapi.dev/api/people/?page=${pageIndex}`);
          combinedData.push(...response.data.results);
          pageIndex++;
        }

        setDataContent(combinedData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortData = (field) => {
    const copyData = [...dataContent];
    let sortedData;

    if (directionSort) {
      sortedData = copyData.sort((a, b) => (a[field] - b[field]));
    } else {
      sortedData = copyData.sort((a, b) => (b[field] - a[field]));
    }

    setDataContent(sortedData);
    setDirectionSort(!directionSort);
  };

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Table dataContent={dataContent} sortData={sortData} openModal={openModal} />
          <Modal
            isVisible={selectedItem !== null}
            title={selectedItem ? selectedItem.name : ''}
            content={selectedItem ? selectedItem.homeworld : ''}
            onClose={closeModal}
          />
        </>
      )}
    </div>
  );
}

export default App;
