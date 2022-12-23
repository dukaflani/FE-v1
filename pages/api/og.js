import { ImageResponse } from '@vercel/og';
import logo from '../../public/branding/dukaflani-white-logo-medium.png'

export const config = {
  runtime: 'experimental-edge',
};

export default function (req) {
    const { searchParams } = new URL(req.url)
    const stageName = searchParams.get("stage_name")
    const songTitle = searchParams.get("song_title")

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        //   textAlign: 'center',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   letterSpacing: '-1rem',
        }}
      >
        <div
            style={{
                background: 'blue',
                width: '100%',
                height: '80%',
            }}
        >
            pic
        </div>
        <div
            style={{
                fontSize: 50,
                background: 'black',
                color: 'white',
                width: '100%',
                height: '20%',
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '1rem',
                paddingRight: '1rem',
            }}
        >
            <div style={{
                height: '6rem', 
                width: '6rem',
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                borderRadius: '50%',
            }}
            >
                a
            </div>
            <div style={{display: 'flex', flexDirection: 'column', flex: '1 1 0%', paddingLeft: '1rem', paddingRight: '1rem',}}>
                <div style={{fontSize: 45,}}>{stageName}</div>
                <div style={{fontSize: 25}}>{songTitle}</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
            <img
              alt="Dukaflani"
              height={65}
              src={`${process.env.NEXT_PUBLIC_NEXT_URL}/branding/dukaflani-white-logo-medium.png`}
            //   style={{ margin: '0 30px' }}
              width={250}
            />
            </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}
