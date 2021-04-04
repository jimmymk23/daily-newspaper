import Image from 'next/image';

const Loading = () => {
    return (
        <Image
            src='/assets/loading-original.gif'
            layout='fill'
            className='loading-gif'
            alt='Loading Gif'
        />
    );
}

export default Loading;
