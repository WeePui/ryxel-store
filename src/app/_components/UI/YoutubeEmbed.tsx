import React from 'react';

interface YoutubeEmbedProps {
  videoId: string;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ videoId }) => {
  return (
    <div className="w-full aspect-video overflow-hidden rounded-xl shadow-lg mt-6">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YoutubeEmbed;
