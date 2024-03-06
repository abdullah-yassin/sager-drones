"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { IDroneItem } from "@/interfaces/drones";

type DroneContextType = {
  dronesItems: IDroneItem[];
  setDronesItems: Dispatch<SetStateAction<IDroneItem[]>>;
  selectedDrone: IDroneItem;
  setSelectedDrone: Dispatch<SetStateAction<IDroneItem>>;
  activeDrone: IDroneItem;
  setActiveDrone: Dispatch<SetStateAction<IDroneItem>>;
};

const defaultStringContext: DroneContextType = {
  dronesItems: [],
  setDronesItems: () => {},
  selectedDrone: {} as IDroneItem,
  setSelectedDrone: () => {},
  activeDrone: {} as IDroneItem,
  setActiveDrone: () => {},
};

export const DroneContext =
  createContext<DroneContextType>(defaultStringContext);

interface IProps {
  children: ReactNode;
}

const DroneContextProvider: FC<IProps> = ({ children }) => {
  const [dronesItems, setDronesItems] = useState<IDroneItem[]>([]);
  const [activeDrone, setActiveDrone] = useState({} as IDroneItem);
  const [selectedDrone, setSelectedDrone] = useState<IDroneItem>(
    {} as IDroneItem
  );

  return (
    <DroneContext.Provider
      value={{
        dronesItems,
        setDronesItems,
        selectedDrone,
        setSelectedDrone,
        activeDrone,
        setActiveDrone,
      }}
    >
      {children}
    </DroneContext.Provider>
  );
};

export default DroneContextProvider;
