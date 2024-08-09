// External Libraries
import React, { useState, useRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// Components
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import ScrollUp from '../ScrollUp/ScrollUp';

// Styles
import css from './App.module.css';

// Constants
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const BASE_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 15;

// Utility function immitating slow download speed
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  // State Hooks
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Ref Hook
  const inputRef = useRef(null);

  // Load images from Unsplash API
  const fetchImages = async (searchQuery, page) => {
    setIsLoading(true);
    setError(null);

    await delay(1000); // Delay to showcase the loader spinner

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          client_id: API_KEY,
          query: searchQuery,
          page: page,
          per_page: IMAGES_PER_PAGE,
        },
      });

      const fetchedImages = response.data.results;

      if (page === 1) {
        setImages(fetchedImages);
      } else {
        setImages(prevImages => [...prevImages, ...fetchedImages]);
      }

      if (fetchedImages.length < IMAGES_PER_PAGE) {
        setIsLastPage(true);
        toast.info('No more images to load.');
      } else {
        toast.success('Images fetched successfully!');
        setIsLastPage(false);
      }
    } catch (error) {
      toast.error('Failed to fetch images.');
    } finally {
      setIsLoading(false);
    }
  };

  // Runs when search button is clicked (initial search)
  const handleSearch = (e) => {
    e.preventDefault();
    const queryValue = inputRef.current.value.trim();
    if (queryValue === '') {
      toast.error('Enter a search query.');
      return;
    }
    setQuery(queryValue);
    setPageNum(1);
    fetchImages(queryValue, 1);
    e.target.reset();
  };

  // Runs when load more button is clicked (subsequent search)
  const handleLoadMore = (e) => {
    e.preventDefault();
    if (isLastPage || !query) return;

    const newPageNum = pageNum + 1;
    setPageNum(newPageNum);
    fetchImages(query, newPageNum);
  };

  // Open modal
  function openModal(image) {
    setSelectedImage(image);
    setIsOpen(true);
  }

  // Close modal
  function closeModal() {
    setIsOpen(false);
    setSelectedImage('');
  }

  return (
    <>
      {/* SearchBar Component */}
      <SearchBar onSearch={handleSearch} ref={inputRef} />

      {/* Notifications Component */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* ImageGallery Component */}
      {!error && <ImageGallery images={images} onImageClick={openModal} />}

      {/* Error Message Component */}
      {error || !isLoading && query && images.length === 0 && <ErrorMessage />}

      {/* ScrollUp Component */}
      <ScrollUp />

      {/* Loader Component */}
      {isLoading && <Loader />}


      {/* LoadMoreBtn Component */}
      {images.length > 0 && !error && !isLastPage && (
        <LoadMoreBtn
          onClick={handleLoadMore}
          disabled={isLoading}
        />
      )}

      {/* ImageModal Component */}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedImage={selectedImage}
      />
    </>
  );
}

export default App;
