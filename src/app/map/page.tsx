import DronesMap from "./DronesMap/DronesMap";
import DronesList from "./DronesList/DronesList";
import { FC } from "react";
import DroneContextProvider from "@/contexts/DronesContext";

const Map: FC = () => {
  return (
    <div className="flex">
      <DroneContextProvider>
        <DronesList />
        <DronesMap />
      </DroneContextProvider>
    </div>
  );
};

export default Map;
