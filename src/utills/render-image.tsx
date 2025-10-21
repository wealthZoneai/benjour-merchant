import React from "react";

interface ImageProps {
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const renderImage = ({ src, alt, width = 24, height = 24, className = "" }: ImageProps) => {
  if (!src) return null;
  return <img src={src} alt={alt} width={width} height={height} className={className} />;
};

export default renderImage;
