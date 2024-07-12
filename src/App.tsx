import { useEffect, useState } from 'react';
import './App.css';
import getImages from './images-api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { Oval } from 'react-loader-spinner';

interface ImageS {
  id: string;
  urls: { regular: string };
  title: string;
  description: string;
}

const App: React.FC = () => {
  const [images, setImages] = useState<ImageS[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<ImageS | null>(null);

  useEffect(() => {
    const fetchImages = async (): Promise<void> => {
      if (!query) return;

      try {
        setIsLoading(true);
        const newImages: ImageS[] = await getImages(query, 10);
        setImages(newImages);
        setError(null);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error occurred');
        }
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error occurred');
        }
      } finally {
        setIsLoadingMore(false);
      }
    };

    fetchMoreImages();
  }, [isLoadingMore, page, query]);

  const onSubmit = (searchQuery: string) => {
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

  const handleImageClick = (image: ImageS) => {
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
          height={80}
          width={80}
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
            height={80}
            width={80}
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
};

export default App;