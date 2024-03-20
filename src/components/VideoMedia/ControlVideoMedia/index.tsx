import { RefObject, useEffect } from "react";

const ControlVideoMedia = ({
  refVideo,
  duration,
  timeCurrent,
  isPlay,
  setIsPlay,
  setTimeCurrent,
}: {
  refVideo: RefObject<HTMLVideoElement>;
  duration: number;
  timeCurrent: number;
  isPlay: boolean;
  setIsPlay: Function;
  setTimeCurrent: Function;
}) => {
  const time = (durationTime: number) => {
    const hours = Math.floor(durationTime / 3600);
    const minutes = Math.floor(durationTime / 60);
    const seconds =
      Math.floor(durationTime / 60) === 0
        ? Math.round(durationTime)
        : Math.floor(durationTime / 60);

    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  useEffect(() => {}, [refVideo]);
  return (
    <div className="text-white text-xl flex items-center justify-between">
      <div className="flex items-center gap-1">
        <i className="bx bx-volume-full"></i>
        <div className="w-24 h-1.5 bg-white rounded-full relative">
          <div
            className="bg-gray-500 rounded-r-full h-1.5 absolute top-0 left-1/2 w-1/2 
            before:absolute before:w-3 before:h-3 before:bg-white cursor-pointer before:-top-1 
            before:-left-2 before:rounded-full"
          ></div>
        </div>
      </div>
      <ul className="flex items-center gap-3 text-xl">
        <li className="text-xs">{time(timeCurrent)}</li>
        <li className="bx bxs-chevrons-left cursor-pointer"></li>
        <li
          onClick={() => {
            isPlay ? refVideo.current?.pause() : refVideo.current?.play();
            setIsPlay(!isPlay);
          }}
          className={`bx bx-${
            isPlay ? "pause" : "play"
          } text-2xl cursor-pointer`}
        ></li>
        <li
          onClick={() => {
            if (!refVideo.current) return;
            if (timeCurrent + 3 > duration) {
              setTimeCurrent(duration);
              refVideo.current.currentTime = duration;
              return;
            }
            refVideo.current.currentTime = timeCurrent + 3;
            setTimeCurrent(timeCurrent + 3);
          }}
          className="bx bxs-chevrons-right cursor-pointer"
        ></li>
        <li
          onClick={() => {
            if (!refVideo.current) return;
            if (timeCurrent - 3 <= 0) {
              setTimeCurrent(0);
              refVideo.current.currentTime = 0;
              return;
            }
            refVideo.current.currentTime = timeCurrent - 3;
            setTimeCurrent(timeCurrent - 3);
          }}
          className="text-xs"
        >
          {time(duration)}
        </li>
      </ul>
      <div className="flex items-center gap-3 cursor-pointer">
        <i className="bx bx-cog cursor-pointer"></i>
        <span>HD</span>
        <i className="bx bx-fullscreen cursor-pointer"></i>
      </div>
    </div>
  );
};

export default ControlVideoMedia;
