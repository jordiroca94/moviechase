import { TbStarFilled } from "react-icons/tb";

type Props = {
  averageRate: number;
  outOfTen?: boolean;
};

const RateStar = ({ averageRate, outOfTen = false }: Props) => {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <TbStarFilled className="text-secondary size-4" />
      <div className="flex gap-1">
        <div className="font-bold">{averageRate.toFixed(1)}</div>
        {outOfTen && <div className="text-lightGray">/ 10</div>}
      </div>
    </div>
  );
};

export default RateStar;
