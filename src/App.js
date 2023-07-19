import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './table/Table';
import Loader from './loader/Loader';
// import OpenWindow from './openWindow/OpenWindow';
import SwapiModal from './swapiModal/SwapiModal';

import './app.scss';

function App() {
  const [dataContent, setDataContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [directionSort, setDirectionSort] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [show, setShow] = useState(null);


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

  const handleClose = () => {
    setShow(null);
  };

  const handleShow = (item) => {
    setShow(item);
  };

  const planetInfo = async (url) => {
    const request = [];
    request.push(axios.get(selectedItem.homeworld));

    const response = await Promise.all(request);

    // сделать запрос к url
    // дождаться ответа
    // из ответа вернуть json 
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Table dataContent={dataContent} sortData={sortData} handleShow={handleShow} />
          {/* <OpenWindow
            isVisible={selectedItem !== null}
            title={selectedItem ? `Planet of ${selectedItem.name}` : ''}
            content={selectedItem ? selectedItem.homeworld : ''}
            onClose={closeModal}
          /> */}
          <SwapiModal
            isVisible={show !== null}
            show={show}
            title={show ? `Planet of ${show.name}` : 'Name is not found'}
            content={show ? show.homeworld : 'Homeworld is not found'}
            onClick={handleClose}
          />
        </>
      )}
    </div>
  );
}

export default App;
