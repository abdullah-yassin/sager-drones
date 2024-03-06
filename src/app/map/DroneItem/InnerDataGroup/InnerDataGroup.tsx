import { FC } from "react";

interface IProps {
  label: string;
  data: string;
  withMarginBottom: boolean;
}

const InnerDataGroup: FC<IProps> = ({ label, data, withMarginBottom }) => {
  return (
    <div
      className={`flex flex-col basis-1/2 items-start w-fit ${
        withMarginBottom ? "mb-2" : "mb-0"
      }`}
    >
      <span>{label}</span>
      <p className="font-bold">{data}</p>
    </div>
  );
};

export default InnerDataGroup;
