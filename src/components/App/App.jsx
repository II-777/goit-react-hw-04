// External Libraries
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Components
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ScrollUp from '../ScrollUp/ScrollUp';
import SearchBar from '../SearchBar/SearchBar';

// API Logic
import { fetchImages, IMAGES_PER_PAGE } from '../../services/api';

const App = () => {
  // State Hooks
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  // Effect Hook: Manage Page Renders
  useEffect(() => {
    // Prevent render on mount
    if (!query) {
      return;
    }

    const loadImages = async () => {
      setIsLoading(true);
      try {
        const [results, total_pages, total_images] = await fetchImages(query, currentPage);
        setImages((prevImages) => (currentPage === 1 ? results : [...prevImages, ...results]));
        setTotalPages(total_pages);
        setIsLastPage(currentPage >= total_pages);

        
        // Hot Toast notifications
        if (currentPage === 1) {
          if (results.length > 0) {
            // 1st page load notification 
            toast.success(`Found ${total_images} images.`);
          } else {
            // Empty API response notification 
            toast.error('No images found');
          }
        } else {
          // Subsequent pages load notification 
          toast.success(`Loaded ${results.length} more images`);
        }
      } catch (err) {
        setError(err);
        toast.error('Failed to fetch images');
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, currentPage]);

  // Handler Functions
  const handleSearch = (newQuery) => {
    if (newQuery.trim() === '') {
      toast.error('Enter a query');
      return;
    }
    if (query !== newQuery) {
      setImages([]);
      setCurrentPage(1);
      setQuery(newQuery);
    } else {
      toast.error('Enter a different query');
    }
  };

  const handleLoadMore = () => {
    if (!isLastPage) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setModalImageUrl('');
  };

  return (
    <>
      {/* SearchBar component */}
      <SearchBar onSearch={handleSearch} />

      {/* ErrorMessage component */}
      {error && <ErrorMessage />}
      {!isLoading && query && images.length === 0 && !error && <ErrorMessage />}

      {/* ImageGallery component */}
      {Array.isArray(images) && images.length > 0 && !error && (
        <ImageGallery images={images} onImageClick={handleOpenModal} />
      )}

      {/* Loader component */}
      {isLoading && <Loader />}

      {/* LoadMoreBtn component */}
      {Array.isArray(images) && images.length > 0 && !isLastPage && !error && (
        <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
      )}

      {/* ImageModal component */}
      <ImageModal isOpen={modalIsOpen} onClose={handleCloseModal} selectedImage={modalImageUrl} />
      
      {/* Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* ScrollUp Component */}
      <ScrollUp />
    </>
  );
};

export default App;
