import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import ReactImageGallery from 'react-image-gallery';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "react-image-gallery/styles/css/image-gallery.css";

export default function Gallery({id}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [galleryRef, setGalleryRef] = useState(null);

  const images = [
    { 
      original: require(`../assets/${id}/1.jpg`),
      thumbnail: require(`../assets/${id}/1.jpg`).default.src,
      priority: true,
    },
    { 
      original: require(`../assets/${id}/2.jpg`),
      thumbnail: require(`../assets/${id}/2.jpg`).default.src,
      priority: true, 
    },
    { 
      original: require(`../assets/${id}/3.jpg`),
      thumbnail: require(`../assets/${id}/3.jpg`).default.src,
      priority: true, 
    },
    { 
      original: require(`../assets/${id}/4.jpg`),
      thumbnail: require(`../assets/${id}/4.jpg`).default.src,
      priority: true, 
    },
    { 
      original: require(`../assets/${id}/fp.jpg`),
      thumbnail: require(`../assets/${id}/fp.jpg`).default.src,
      priority: true, 
    },
  ];

  const handleImageClick = useCallback(() => {
    if (galleryRef) {
      galleryRef.toggleFullScreen();
    }
  }, [galleryRef]);

  const buttonBaseClasses = "absolute top-1/2 -translate-y-1/2 z-10 p-1 rounded duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none hidden md:block";
  const buttonNormalClasses = "bg-white/80 hover:bg-gray-100 backdrop-blur-sm border-2 shadow-sm";
  const buttonFullscreenClasses = "bg-white/60 backdrop-blur-sm hover:bg-white/80 shadow-sm hover:shadow-md";
  
  const renderLeftNav = (onClick, disabled) => (
    <button
      className={`${buttonBaseClasses} left-2 ${isFullscreen ? buttonFullscreenClasses : buttonNormalClasses}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Previous"
    >
      <ChevronLeft className="w-6 h-6 text-gray-800" />
    </button>
  );
  
  const renderRightNav = (onClick, disabled) => (
    <button
      className={`${buttonBaseClasses} right-2 ${isFullscreen ? buttonFullscreenClasses : buttonNormalClasses}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Next"
    >
      <ChevronRight className="w-6 h-6 text-gray-800" />
    </button>
  );
  const renderFullscreenButton = (onClick, isFullscreen) => (null);
  
  const renderImage = (item) => (
    <div className="relative w-full" style={{ aspectRatio: '16/9' }} onClick={handleImageClick}>
      <Image
        src={item.original}
        alt="Gallery image"
        fill
        className="object-contain"
        sizes="(max-width: 1200px) 100vw, 50vw"
        priority
      />
    </div>
  );

  const renderThumbnail = (item) => (
    <div className="relative w-32 h-20">
      <Image
        src={item.original}
        alt="Thumbnail"
        fill
        className="object-cover"
        sizes="128px"
      />
    </div>
  );

  return (
    <div className="w-full">
      <ReactImageGallery
        ref={setGalleryRef}
        items={images}
        renderItem={renderImage}
        renderThumbItem={renderThumbnail}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
        renderFullscreenButton={renderFullscreenButton}
        showPlayButton={false}
        showBullets={false}
        showNav={true}
        showThumbnails={true}
        showFullscreenButton={true}v
        thumbnailPosition="bottom"
        onScreenChange={setIsFullscreen}
      />
    </div>
  );
}