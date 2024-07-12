import React from 'react';
import css from './ImageCard.module.css';

interface Image {
  id: string;
  urls: {
    regular: string; 
  };
  description: string; 
}

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <div>
      <img src={image.urls.regular} alt={image.description} className={css.imageGallery} />
    </div>
  );
};

export default ImageCard;
