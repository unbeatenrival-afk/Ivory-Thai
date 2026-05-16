'use client';

/**
 * Video Background Component
 * Plays looping videos (Ivory Thai → Chef) behind content
 */

import { useState, useEffect, useRef } from 'react';

const videos = [
  '/video/Ivory_Thai.mp4',
  '/video/Chef.mp4',
];

export function VideoBackground() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;

    if (!video1 || !video2) return;

    // Start playing the first video
    video1.play().catch((error) => {
      console.log('Video autoplay prevented:', error);
    });

    const handleVideo1End = () => {
      console.log('Video 1 ended, switching to Video 2');
      setCurrentVideoIndex(1);
      video2.currentTime = 0;
      video2.play().catch(console.error);
    };

    const handleVideo2End = () => {
      console.log('Video 2 ended, switching to Video 1');
      setCurrentVideoIndex(0);
      video1.currentTime = 0;
      video1.play().catch(console.error);
    };

    video1.addEventListener('ended', handleVideo1End);
    video2.addEventListener('ended', handleVideo2End);

    return () => {
      video1.removeEventListener('ended', handleVideo1End);
      video2.removeEventListener('ended', handleVideo2End);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video 1 */}
      <video
        ref={video1Ref}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: currentVideoIndex === 0 ? 1 : 0 }}
        muted
        playsInline
        preload="auto"
      >
        <source src={videos[0]} type="video/mp4" />
      </video>

      {/* Video 2 */}
      <video
        ref={video2Ref}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: currentVideoIndex === 1 ? 1 : 0 }}
        muted
        playsInline
        preload="auto"
      >
        <source src={videos[1]} type="video/mp4" />
      </video>

      {/* Golden Buddha overlay - warm cream/gold tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/90 via-orange-50/85 to-yellow-50/90 mix-blend-overlay pointer-events-none" />

      {/* Additional warm glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-100/70 via-transparent to-orange-50/50 pointer-events-none" />
    </div>
  );
}
