const flexCenter = "flex items-center justify-center";
const box = (size: number) =>
  `w-${size} h-${size} flex items-center justify-center`;
const flexGap = (gap: number) => `flex gap-${gap} items-center`;

const tailwind = {
  flexCenter,
  box,
  flexGap,
};

export default tailwind;
