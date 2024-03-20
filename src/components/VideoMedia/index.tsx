/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRef, useEffect, useState } from "react";
import ControlVideoMedia from "./ControlVideoMedia";
import htmlCourse from "./html-course.mp4";

const VideoMedia = () => {
  //
  const refVideo = createRef<HTMLVideoElement>();
  const [duration, setDuration] = useState(0);
  const [timeCurrent, setTimeCurrent] = useState(0);
  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    if (refVideo.current) {
      setDuration(refVideo.current.duration);
    }
  }, [refVideo]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let timeOut: ReturnType<typeof setTimeout>;
  useEffect(() => {
    if (isPlay)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeOut = setTimeout(() => {
        if (timeCurrent === Math.round(duration)) {
          clearTimeout(timeOut);
          setTimeCurrent(0);
          return;
        }
        setTimeCurrent(timeCurrent + 1);
      }, 1000);
    else clearTimeout(timeOut);
  }, [timeCurrent, isPlay]);
  //
  return (
    <div className="h-screen w-full pt-20 flex justify-center">
      <div
        className="w-3/4 bg-black rounded-xl relative"
        style={{ height: 400 }}
      >
        <video
          ref={refVideo}
          className="w-full h-full absolute top-0 left-0"
          src={htmlCourse}
          loop
        ></video>
        <div className="p-2 bg-black w-full absolute bottom-0 left-0">
          <div className="w-full my-2 h-1.5 bg-gray-500 relative rounded-full">
            <div
              className="absolute top-0 h-1.5 rounded-r-full bg-white left-0"
              style={{
                width: ((): string => {
                  return `${(timeCurrent / duration) * 100}%`;
                })(),
              }}
            ></div>
            <span
              style={{
                left: ((): string => {
                  return `${(timeCurrent / duration) * 100}%`;
                })(),
              }}
              className="absolute w-3 h-3 bg-white cursor-pointer -top-1 -ml-2 rounded-full"
            ></span>
          </div>
          <ControlVideoMedia
            refVideo={refVideo}
            duration={duration}
            timeCurrent={timeCurrent}
            setTimeCurrent={setTimeCurrent}
            isPlay={isPlay}
            setIsPlay={(_: boolean) => {
              if (!_) clearTimeout(timeOut);
              setIsPlay(_);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoMedia;
