import React from 'react';
import styled from 'styled-components';

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    event.target.click();
  }
}

export default function VideoListItem({ index, video, onVideoSelect }) {
  const tabOffset = 2;
  const imageUrl = video.snippet.thumbnails.default.url;

  const VideoThumbnail = styled.div`
  width: 50%;
  display: inline-block;
  padding: 20px;
  `;

  return (
    <VideoThumbnail className="video-list-media" onClick={() => onVideoSelect(video)} onKeyPress={handleKeyPress} role="button" tabIndex={tabOffset + index}>
      <div className="media-thumbnail">
        <img src={imageUrl} alt="Video thumbnail" style={{ width: '100%' }} />
      </div>

      <div className="media-heading">
        {video.snippet.title}
      </div>
    </VideoThumbnail>
  );
}
