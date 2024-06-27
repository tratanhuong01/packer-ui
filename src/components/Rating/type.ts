type RatingProps = {
  current: number;
  disabled?: boolean;
  maxStar?: number;
  onChange?: (value: number) => void;
};

export default RatingProps;
