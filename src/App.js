import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './table/Table';
import Loader from './loader/Loader';
// import Modal from 'react-modal';
import Modal from './modal/Modal';

import './app.scss';

function App() {
  const [dataContent, setDataContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [directionSort, setDirectionSort] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const requests = Array.from({ length: 9 }, (_, index) =>
    //       axios.get(`https://swapi.dev/api/people/?page=${index + 1}`)
    //     );

    //     const responses = await Promise.all(requests);
    //     const combinedData = responses.flatMap(resp => resp.data.results);
        
    //     setDataContent(combinedData);
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.log(error);
    //     setIsLoading(false);
    //   }
    // };

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

  // const openModal = () => {
  //   setModalIsOpen(true)
  // }

  // const closeModal = () => {
  //   setModalIsOpen(!openModal)
  // }

  // const modalContent = (
  //   <div>
  //     <h2>Header</h2>
  //     <p>Text</p>
  //     <button onClick={closeModal}>Close</button>
  //   </div>
  // )

  return (
    <div>
      {isLoading ? <Loader /> : <Table dataContent={dataContent} sortData={sortData} />}
      {/* <button onClick={openModal}>Open</button> */}
      {/* <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>{modalContent}
      </Modal> */}

      <button onClick={() => setModalIsOpen(true)}>Click Here</button>
      <Modal

        isVisible={modalIsOpen}
        title="Modal Title"
        content={<p>Add your content here</p>}
        footer={<button>Cancel</button>}
        onClose={() => setModalIsOpen(false)}
      />
    </div>
  );
}

export default App;
