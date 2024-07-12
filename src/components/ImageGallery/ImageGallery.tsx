import React from 'react';
import ImageCard from "./ImageCard/ImageCard";
import css from '../ImageGallery/ImageGallery.module.css';

interface Image {
  id: string;
  urls: { regular: string };
  title: string; 
  description: string; 
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={css.imageGalleryList}>
      {images.map((image) => (
        <li key={image.id} className={css.imageGalleryItem} onClick={() => onImageClick(image)}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
