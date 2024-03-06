"use client";

import { FC, useEffect, useState, useContext, useRef } from "react";
import DroneItem from "../DroneItem/DroneItem";
import { IDroneItem } from "@/interfaces/drones";
import { isReadyToFly } from "@/helpers/isReadyToFly";
import { DroneContext } from "@/contexts/DronesContext";
import {
  connectSocket,
  disconnectSocket,
  subscribeToMessages,
} from "@/services/socketService";

const DronesList: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [droneFlying, setDroneFlying] = useState<number>(0);
  const [isShowDronesList, setIsShowDronesList] = useState<boolean>(true);
  const { dronesItems, setDronesItems, activeDrone } = useContext(DroneContext);

  useEffect(() => {
    // Connect to socket when the component mounts
    connectSocket();

    // Subscribe to messages
    subscribeToMessages((data) => {
      const droneItem = data?.features?.[0];

      if (droneItem) {
        // Increase the counter of RED drones:
        if (!isReadyToFly(droneItem.properties.registration)) {
          setDroneFlying((prev: number) => prev + 1);
        }

        setDronesItems((prevItems: IDroneItem[]) => {
          const droneIndex = prevItems.findIndex(
            (item) =>
              item.properties.registration === droneItem.properties.registration
          );

          const latitude = droneItem.geometry.coordinates[1];
          const longitude = droneItem.geometry.coordinates[0];

          if (droneIndex === -1) {
            prevItems.push({
              properties: droneItem.properties,
              geometry: {
                coordinates: [{ longitude, latitude }],
              },
            });
          } else {
            const coordinatesIndex = prevItems[
              droneIndex
            ].geometry.coordinates.findIndex(
              (item) =>
                item.latitude === latitude && item.longitude === longitude
            );

            if (coordinatesIndex === -1)
              prevItems[droneIndex].geometry.coordinates.push({
                longitude,
                latitude,
              });
          }

          return [...prevItems];
        });
      }
    });

    return () => {
      // Disconnect from socket when the component unmounts
      disconnectSocket();
    };
  }, [setDronesItems]);

  useEffect(() => {
    if (
      containerRef &&
      containerRef.current &&
      activeDrone &&
      activeDrone.properties
    ) {
      const selectedButtonElement = document.getElementById(
        activeDrone.properties.registration
      );

      if (selectedButtonElement) {
        selectedButtonElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [activeDrone]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsShowDronesList(true)}
        className={`rounded-md z-30 absolute left-[-1rem] top-[13.3%] bg-zinc-700 w-10 h-[91px] text-white flex items-center justify-center text-xl ${
          isShowDronesList ? "w-0 left-[-5rem] z-0" : ""
        }`}
      >
        {"  >"}
      </button>
      <div
        className={`absolute bg-zinc-900 text-white py-6 min-w-[385px] max-w-[385px] overflow-y-auto min-h-[calc(100vh-88px)] max-h-[calc(100vh-88px)] z-10 left-3 top-3 transition-all ${
          isShowDronesList ? "" : "min-w-0 w-0 left-[-5rem]"
        }`}
      >
        <div
          className={`flex justify-between mb-4 px-6 min-w-[385px] opacity-1 transition-opacity ${
            isShowDronesList ? "" : "opacity-0"
          }`}
        >
          <h2 className="font-bold uppercase">Drone Flying</h2>
          <button
            onClick={() => setIsShowDronesList(false)}
            className="rounded-full bg-gray-500 w-6 h-6 text-zinc-950 flex items-center justify-center text-xl"
          >
            ×
          </button>
        </div>
        <div
          ref={containerRef}
          className={`flex flex-col min-w-[385px] opacity-1 transition-opacity ${
            isShowDronesList ? "" : "opacity-0"
          }`}
        >
          {dronesItems.map((item: any, index: number) => (
            <DroneItem
              data={item}
              key={`drone-${index + 1}`}
              id={item.properties.registration}
            />
          ))}
        </div>
      </div>

      <div className="absolute right-24 bottom-8 bg-zinc-200 rounded-md p-2 z-10 flex items-center text-sm">
        <span className="rounded-full bg-zinc-900 text-white me-2 px-2 py-1 font-bold">
          {droneFlying}
        </span>
        <span>Drone Flying</span>
      </div>
    </div>
  );
};

export default DronesList;
