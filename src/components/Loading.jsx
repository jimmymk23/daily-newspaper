import React from 'react';
import loadingGif from '../assets/loading-original.gif';
// import loadingGif from '../assets/loading.gif';

export default function Loading() {
	return <img src={loadingGif} className='loading-gif' alt='Loading Gif' />;
}
