import React, { Dispatch, FC, SetStateAction, useContext } from "react";
import { Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { IDroneItem } from "@/interfaces/drones";
import "../style.css";
import { DroneContext } from "@/contexts/DronesContext";

interface Props {
  latitude: number;
  longitude: number;
  name: string;
  altitude: number;
}

const DroneMapPopup: FC<Props> = ({ latitude, longitude, name, altitude }) => {
  const { setSelectedDrone } = useContext(DroneContext);

  return (
    <div>
      <Popup
        offset={25}
        latitude={latitude}
        longitude={longitude}
        onClose={() => {
          setSelectedDrone({} as IDroneItem);
        }}
        closeButton={false}
      >
        <div className="bg-zinc-950 p-2 text-white">
          <h3 className="text-lg font-bold">{name}</h3>
          <div className="flex justify-between">
            <div className="flex flex-col me-4">
              <span className="text-gray-500">Altitude</span>
              <span>{altitude} m</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">Flight Time</span>
              <span>Not Exists</span>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default DroneMapPopup;
