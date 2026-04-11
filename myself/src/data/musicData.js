const musicData = [
    {
        id:'ms01',
        title:'Magnetic',
        artist:'ILLIT',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/0e165cdc21de750706d96b643a452ee6/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1772115775/songs/songs/95340a62-df35-463f-aa96-4f2ed5b8b325.mp3',
        videoSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775706125/videoMV/awby94dvgdho7beh2jso.webm'
    },
    {
        id:'ms02',
        title:'Cherish (My love)',
        artist:'ILLIT',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/1dee590cb8a17a25e2ed27803b7cb81a/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1772115227/songs/songs/27391c91-e3f1-4a19-8104-0582d4cdca05.mp3',
        videoSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775706120/videoMV/xn7unhhcw97iux2yovfg.webm'
    },
    {
        id:'ms03',
        title:'oops!',
        artist:'ILLIT',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/e26714f04ae85b3388db4d1231544b66/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1772115552/songs/songs/e48e4f9c-3a45-43f2-b421-ebe512f39e7c.mp3',
        videoSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775706131/videoMV/yeouijybroynnsujj9zd.webm'
    },
    {
        id:'ms04',
        title:'Lucky Girl Syndrome',
        artist:'ILLIT',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/0e165cdc21de750706d96b643a452ee6/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1772115870/songs/songs/642252d9-0ee2-4f03-a802-8f032e78b39b.mp3',
        videoSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775706104/videoMV/nxsouczn8ucizgaesa0c.webm'
    },
    {
        id:'ms05',
        title:'NOT CUTE ANYMORE',
        artist:'ILLIT',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/3ba04f1d23b5801365db62fb5a18838f/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1772114931/songs/songs/2d5abf18-6c29-47a4-a9a5-a454709e04d4.mp3',
        videoSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775706108/videoMV/mxa2rcdww5twudcoquqw.webm'
    },
    {
        id:'ms06',
        title:'Sunday Morning',
        artist:'ILLIT',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/271a65ec56fa462cbe3abe42b3651cc3/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1772115903/songs/songs/c2a7fab6-952b-4fc5-8cfe-67cb755ad2bb.mp3',
        videoSrc: 'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775706116/videoMV/u4mh0gtmplawh8ejkzz5.webm'
    },
    {
        id:'ms07',
        title:'Perfect Night',
        artist:'LE SSERAFIM',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/19965ca3dc610543faef2d3b269f8a0c/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775492302/music/dp3qupqgmmifacdjwmz7.mp3',
        videoSrc: 'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775706137/videoMV/rwomh4krdvdupnygk7rr.webm'
    },
    {
        id:'ms08',
        title:'RUDE!',
        artist:'Hearts 2 Hearts',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/da53678166431bddcbc470712bd43fa7/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775492304/music/krtjjrjfgiutdb9pujdr.mp3',
        videoSrc: 'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775706094/videoMV/k0ylh1tlm6ycrclfavbu.webm'
    },
    {
        id:'ms09',
        title:'PSYCHO!',
        artist:'BABYMONSTER',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/b8fc928e8b10a4d1463b3200aaa107fa/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1767642702/songs/songs/84464837-663e-4e4c-be17-5872c05bf426.mp3',
        videoSrc: 'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775706068/videoMV/hzrcpg55we22a5r7n41g.webm'
    },
    {
        id:'ms10',
        title:'2.0',
        artist:'BTS',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/a3b8e9462db0c02e082c706c624f9811/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1775408912/songs/songs/1ad1c790-98f0-4431-9a1d-2b74341c40ad.mp3',
        videoSrc: 'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775706074/videoMV/qg4lhbdof76bveyga15b.webm'
    },
    {
        id:'ms11',
        title:'NOT ME',
        artist:'ILLIT',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/3ba04f1d23b5801365db62fb5a18838f/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1772116005/songs/songs/b31ca62d-2b4b-4d83-9e91-af58912dcc8e.mp3',
        videoSrc: 'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775706112/videoMV/lkdmw5w1ps3m9gememzt.webm'
    },
    {
        id:'ms12',
        title:'little monster',
        artist:'ILLIT',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/e26714f04ae85b3388db4d1231544b66/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dhl6ykwsd/video/upload/v1772115477/songs/songs/cd92f7ee-34ae-420b-9ac9-08aaac0d1e58.mp3',
        videoSrc: 'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775706099/videoMV/wo2hlusbpdmm6hrdzohk.webm'
    },
    {
        id:'ms13',
        title:'JANE DOE',
        artist:'Kenshi Yonezu, Hikaru Utada',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/8bb62cdb1adfd485edee8d52dd304b5f/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775726673/music/q75g6sj5ntkqbs2b542h.mp3',
        videoSrc: 'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775726664/videoMV/vflpzfnkagqwefzxbqff.webm'
    },
    {
        id:'ms14',
        title:'Home',
        artist:'Charlie Puth, Hikaru Utada',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/3dd9f3a54b3c8ebb3fea72f10d40305d/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775726671/music/nvho4hhtcqwhvzqiepoi.mp3',
        videoSrc: ' https://res.cloudinary.com/dqdssnpbf/video/upload/v1775726661/videoMV/bu0elrh8pns2xpaktqia.webm'
    },
    {
        id:'ms15',
        title:'SWIM',
        artist:'BTS',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/a3b8e9462db0c02e082c706c624f9811/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775726669/music/f3yzz8xkqal07jfobx2a.mp3',
        videoSrc: 'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775726657/videoMV/ziycovbz7fwxjcfnyvjr.webm'
    },
    {
        id:'ms16',
        title:'WE GO UP',
        artist:'BABYMONSTER',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/b8fc928e8b10a4d1463b3200aaa107fa/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775726667/music/jc3rsnemnbqts1fg07mv.mp3',
        videoSrc: 'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775726652/videoMV/u0v0uogu64md7kvtbubi.webm'
    },
    {
        id:'ms17',
        title:'LIKE THAT',
        artist:'BABYMONSTER',
        coverSrc:'https://cdn-images.dzcdn.net/images/cover/b8fc928e8b10a4d1463b3200aaa107fa/1000x1000-000000-80-0-0.jpg',
        musicSrc:'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775726666/music/vu3zhzqxpb9l68mzuci0.mp3',
        videoSrc: 'https://res.cloudinary.com/dqdssnpbf/video/upload/v1775726648/videoMV/umdraizak5ifdqbb6rqc.webm'
    },
]

export default musicData