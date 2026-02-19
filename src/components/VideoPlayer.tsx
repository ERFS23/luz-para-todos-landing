const VideoPlayer = () => {
  return (
    <div className="video-container">
      <div className="relative aspect-video bg-gradient-to-br from-deep-brown via-warm-brown to-deep-brown rounded-xl sm:rounded-2xl overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
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
      </div>
    </div>
  );
};

export default VideoPlayer;
