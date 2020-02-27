import React from 'react';
import styled from 'styled-components';

export default function VideoDetail({ video }) {
  if (!video) {
    return (
      <section>
        Loading...
      </section>
    );
  }

  const VideoContainer = styled.section`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  `;

  const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  `;

  const { videoId } = video.id;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <main id="video-detail">
      <VideoContainer id="video-player">
        <VideoIframe title="YouTube video player" src={url} />
      </VideoContainer>
      <section id="video-text">
        <div id="video-title">
          {video.snippet.title}
        </div>
        <div id="video-description">
          {video.snippet.description}
        </div>
      </section>
    </main>
  );
}
