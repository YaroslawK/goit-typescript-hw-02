import { useEffect, useState } from 'react';
import './App.css';
import getImages from './images-api'
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { Oval } from 'react-loader-spinner'

function App() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (!query) return;

      try {
        setIsLoading(true);
        const newImages = await getImages(query, 10);
        setImages(newImages);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query]);

  useEffect(() => {
    if (!isLoadingMore) return;

    const fetchMoreImages = async () => {
      try {
        const newImages = await getImages(query, 10, page);
        setImages((prevImages) => [...prevImages, ...newImages]); 
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingMore(false);
      }
    };

    fetchMoreImages();
  }, [isLoadingMore, page, query]);

  const onSubmit = (searchQuery) => {
    if (searchQuery !== query) {
      setQuery(searchQuery);
      setPage(1); 
      setImages([]); 
    }
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      {error && <ErrorMessage error={error} />}
      {isLoading && (
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {images.length > 0 && !isLoading && (
        isLoadingMore ? (
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <LoadMoreBtn handleLoadMore={handleLoadMore} />
        )
      )}
      <ImageModal isOpen={!!selectedImage} onRequestClose={handleCloseModal} image={selectedImage} />
    </div>
  );
}



export default App;
