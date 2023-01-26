import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import numeral from 'numeral'

export const config = {
  runtime: 'experimental-edge',
};

export default async function (req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const stageName = searchParams.get('stage_name');
  const fanbaseCount = searchParams.get('fanbase_count');
  const songTitle = searchParams.get('song_title');
  const videoTitle = searchParams.get('video_title');
  const avatar = searchParams.get('avatar');


  const totalFanBaseCount = fanbaseCount
  const fanbase2 = totalFanBaseCount ? totalFanBaseCount : 0
    let fanbase3 = ''
    Number(fanbase2) < 1000  || Number(fanbase2) % 10 === 0 ? fanbase3 = numeral(fanbase2).format('0a') :  fanbase3 = numeral(fanbase2).format('0.0a')
    

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <div tw="bg-black w-full h-full flex flex-col p-20">
            <div tw="flex w-full text-white items-center justify-center">
            <img
                src="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-white-logo-medium.png"
                tw="w-32"
              />
            </div>
            <div tw="flex-1 flex flex-col items-center justify-center w-full">
              <div style={{fontSize: 90, color: 'white', textTransform: 'uppercase', fontWeight: "bolder", lineHeight: '80%'}}>{songTitle}</div>
              <div tw="text-white text-2xl pt-5">{videoTitle}</div>
            </div>
            <div tw="flex items-center justify-start w-full bg-white p-5">
            <img
                src={avatar ? avatar : ''}
                tw='h-20 w-20 rounded-full bg-gray-500'
              />
              <div tw="flex-1 px-2 flex flex-col">
                  <div tw='text-lg font-bold text-black'>{stageName}</div>
                  <div tw='text-sm text-gray-700 -mt-2'>{`Fanbase ${fanbase3}`}</div>
              </div>
              <div tw='max-w-sm uppercase'>Streaming Links | Merchandise | Lyrics | Skiza Tunes | Albums | Events</div>
            </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
