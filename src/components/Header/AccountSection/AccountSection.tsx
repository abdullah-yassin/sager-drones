import { FC } from "react";

interface IProps {
  name: string;
  role: string;
}

const AccountSection: FC<IProps> = ({ name, role }) => {
  return (
    <div className="ps-6 border-l border-gray-600 text-sm">
      <div>
        <span>Hello, </span>
        <span className="font-semibold">{name}</span>
      </div>
      <p className="text-gray-600">{role}</p>
    </div>
  );
};

export default AccountSection;
