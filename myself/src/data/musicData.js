const BASE = import.meta.env.BASE_URL;
const musicData = [
    {
        id:'ms01',
        title:'Magnetic',
        artist:'ILLIT',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/0e165cdc21de750706d96b643a452ee6/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1772115775/songs/songs/95340a62-df35-463f-aa96-4f2ed5b8b325.mp3',
        videoSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775491665/videoMV/xjkcu3x12atoyi3he4ml.mp4'
    },
    {
        id:'ms02',
        title:'Cherish (My love)',
        artist:'ILLIT',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/1dee590cb8a17a25e2ed27803b7cb81a/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1772115227/songs/songs/27391c91-e3f1-4a19-8104-0582d4cdca05.mp3',
        videoSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775491648/videoMV/aoknyxubc3dpowlqki0t.mp4'
    },
    {
        id:'ms03',
        title:'oops!',
        artist:'ILLIT',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/e26714f04ae85b3388db4d1231544b66/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1772115552/songs/songs/e48e4f9c-3a45-43f2-b421-ebe512f39e7c.mp3',
        videoSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775491683/videoMV/qegbjdhkufy8eclovhns.mp4'
    },
    {
        id:'ms04',
        title:'Lucky Girl Syndrome',
        artist:'ILLIT',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/0e165cdc21de750706d96b643a452ee6/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1772115870/songs/songs/642252d9-0ee2-4f03-a802-8f032e78b39b.mp3',
        videoSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775491657/videoMV/ulokq2epbhwy8axv081w.mp4'
    },
    {
        id:'ms05',
        title:'NOT CUTE ANYMORE',
        artist:'ILLIT',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/3ba04f1d23b5801365db62fb5a18838f/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1772114931/songs/songs/2d5abf18-6c29-47a4-a9a5-a454709e04d4.mp3',
        videoSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775491673/videoMV/pm3hlrcmvant7fj9ymdr.mp4'
    },
    {
        id:'ms06',
        title:'Sunday Morning',
        artist:'ILLIT',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/271a65ec56fa462cbe3abe42b3651cc3/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1772115903/songs/songs/c2a7fab6-952b-4fc5-8cfe-67cb755ad2bb.mp3',
        videoSrc: 'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775491727/videoMV/b0lyx63lphuomtktufmx.mp4'
    },
    {
        id:'ms07',
        title:'Perfect Night',
        artist:'LE SSERAFIM',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/19965ca3dc610543faef2d3b269f8a0c/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775492302/music/dp3qupqgmmifacdjwmz7.mp3',
        videoSrc: 'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775491692/videoMV/arevy2x0napygncjn9me.mp4'
    },
    {
        id:'ms08',
        title:'RUDE!',
        artist:'Hearts 2 Hearts',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/da53678166431bddcbc470712bd43fa7/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775492304/music/krtjjrjfgiutdb9pujdr.mp3',
        videoSrc: 'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775492299/videoMV/pejya8feyg7b5ndho4xs.mp4'
    },
]

export default musicData