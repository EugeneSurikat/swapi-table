import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './table/Table';
import Loader from './loader/Loader';
import Modal from './modal/Modal';

import './app.scss';

function App() {
  const [dataContent, setDataContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [directionSort, setDirectionSort] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const requests = [];
        let pageIndex = 1;

        while (pageIndex <= 9) {
          requests.push(axios.get(`https://swapi.dev/api/people/?page=${pageIndex}`));
          pageIndex++;
        }

        const responses = await Promise.all(requests);
        const combinedData = responses.flatMap(response => response.data.results);

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

  // const planetInfo = (url) => {
  //   axios(url).then(function (response) {
  //     response.text().then(function (text) {
  //       selectedItem.homeworld.textContent = text;
  //     });
  //   });

  //   // console.log(planetInfo);



  //   // axios.get(selectedItem.homeworld);
  //   // const response = Promise.

  //   // сделать запрос к url
  //   // дождаться ответа
  //   // из ответа вернуть json 
  // }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Table dataContent={dataContent} sortData={sortData} openModal={openModal} />
          <Modal
            isVisible={selectedItem !== null}
            title={selectedItem ? `Planet of ${selectedItem.name}` : ''}
            content={selectedItem ? selectedItem.homeworld : 'ghbdtn'}
            onClose={closeModal}
          />
        </>
      )}
    </div>
  );
}

export default App;
