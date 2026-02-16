import { useRef, useEffect } from "react";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays automatically when loaded
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    }
  }, []);

  return (
    <div className="video-container">
      <div className="relative aspect-video bg-gradient-to-br from-deep-brown via-warm-brown to-deep-brown rounded-xl sm:rounded-2xl overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          playsInline
          preload="metadata"
          controls
        >
          <source
            src="/videos/hero-video.mp4"
            type="video/mp4"
          />
        </video>

        {/* Subtle decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/30 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default VideoPlayer;
