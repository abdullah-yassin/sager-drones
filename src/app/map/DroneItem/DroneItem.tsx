import { FC, useContext } from "react";
import { IDroneItem } from "@/interfaces/drones";
import { isReadyToFly } from "@/helpers/isReadyToFly";
import { DroneContext } from "@/contexts/DronesContext";
import InnerDataGroup from "./InnerDataGroup/InnerDataGroup";

interface IProps {
  id: string;
  data: IDroneItem;
}

const DroneItem: FC<IProps> = ({ data, id }) => {
  const { setActiveDrone, activeDrone } = useContext(DroneContext);

  const onDroneItemClickHandler = () => {
    setActiveDrone(data);
  };

  return (
    <button
      id={id}
      onClick={onDroneItemClickHandler}
      className={`hover:bg-zinc-700 px-6 py-3 border-b border-black ${
        activeDrone?.properties?.serial === data.properties.serial
          ? "bg-zinc-700"
          : "bg-transparent"
      }`}
    >
      <h3 className="mb-1 font-bold text-start">{data.properties.Name}</h3>
      <div className="flex">
        <div className="flex flex-wrap text-gray-400 text-sm">
          <InnerDataGroup
            label={"Serial #"}
            withMarginBottom={true}
            data={data.properties.serial}
          />
          <InnerDataGroup
            withMarginBottom={true}
            label={"Registration #"}
            data={data.properties.registration}
          />
          <InnerDataGroup
            label={"Pilot"}
            withMarginBottom={false}
            data={data.properties.pilot}
          />
          <InnerDataGroup
            label={"Organzation"}
            withMarginBottom={false}
            data={data.properties.organization}
          />
        </div>
        <span
          className={`w-[15px] h-[15px] rounded-full ${
            isReadyToFly(data.properties.registration)
              ? "bg-green-600"
              : "bg-red-600"
          }  border border-white`}
        ></span>
      </div>
    </button>
  );
};

export default DroneItem;
