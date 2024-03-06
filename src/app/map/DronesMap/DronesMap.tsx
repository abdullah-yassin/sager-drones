"use client";

import React, { FC, useRef, Fragment, useContext, MouseEvent } from "react";
import Image from "next/image";
import mapboxgl from "mapbox-gl";
import droneIcon from "@/public/drone.svg";
import { isReadyToFly } from "@/helpers/isReadyToFly";
import { DroneContext } from "@/contexts/DronesContext";
import Map, { Layer, Marker, Source } from "react-map-gl";
import DroneMapPopup from "./DroneMapPopup/DroneMapPopup";
import { accessToken } from "@/constants/mapboxAccessToken";
import { Coordinates, IDroneItem, IDroneProperties } from "@/interfaces/drones";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";

// Define a custom type for the expected ref type
type DroneRefType = {
  getMap: () => mapboxgl.Map;
};

interface IDroneSource {
  index: number;
  registration: string;
  coordinates: Coordinates[];
  properties: IDroneProperties;
}

const DronesMap: FC = () => {
  // mapboxgl.accessToken = accessToken;
  const droneRef = useRef<DroneRefType | null>(null);
  const {
    dronesItems,
    activeDrone,
    selectedDrone,
    setActiveDrone,
    setSelectedDrone,
  } = useContext(DroneContext);

  const zoomToSelectedLoc = (
    e: MouseEvent<HTMLButtonElement>,
    droneItem: IDroneItem
  ) => {
    // stop event bubble-up which triggers unnecessary events
    e.stopPropagation();
    setSelectedDrone(droneItem);
  };

  const onDroneClickHandler = (
    e: MouseEvent<HTMLButtonElement>,
    droneItem: IDroneItem
  ) => {
    // stop event bubble-up which triggers unnecessary events
    e.stopPropagation();
    setActiveDrone(droneItem);
    setSelectedDrone(droneItem);

    if (droneRef.current) {
      const map = droneRef.current.getMap();

      map.flyTo({
        center: [
          droneItem.geometry.coordinates[
            droneItem.geometry.coordinates.length - 1
          ].longitude,
          droneItem.geometry.coordinates[
            droneItem.geometry.coordinates.length - 1
          ].latitude,
        ],
        zoom: 12,
      });
    }
  };

  const onMapClickHandler = () => {
    // stop event bubble-up which triggers unnecessary events
    setActiveDrone({} as IDroneItem);
    setSelectedDrone({} as IDroneItem);

    if (droneRef.current) {
      const map = droneRef.current.getMap();

      map.flyTo({
        zoom: 11,
        center: [35.900968, 31.919239],
      });
    }
  };

  const droneSource = ({
    index,
    properties,
    coordinates,
    registration,
  }: IDroneSource) => (
    <Source
      type="geojson"
      data={{
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: properties,
            geometry: {
              type: "LineString",
              coordinates: coordinates.map((item: Coordinates) =>
                Object.values(item)
              ),
            },
          },
        ],
      }}
    >
      <Layer
        type="line"
        source="LineString"
        id={`LineString ${index + 1}-drone`}
        layout={{ "line-join": "round", "line-cap": "round" }}
        paint={{
          "line-width": 5,
          "line-color": isReadyToFly(registration) ? "#16a34a" : "#dc2626",
        }}
      />
    </Source>
  );

  return (
    <Map
      ref={(map) => {
        // Assign the correct ref type with the getMap method
        if (map) droneRef.current = map;
      }}
      initialViewState={{
        zoom: 11,
        latitude: 31.919239,
        longitude: 35.900968,
      }}
      onClick={onMapClickHandler}
      mapboxAccessToken={accessToken}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      style={{ width: "calc(100vw - 60px)", height: "calc(100vh - 56px)" }}
    >
      {dronesItems.map((droneItem: IDroneItem, index: number) => {
        const { properties } = droneItem;
        const { registration } = properties;
        const { coordinates } = droneItem.geometry;

        return (
          <Fragment key={`${index + 1}-drone-item`}>
            <Marker
              latitude={coordinates[coordinates.length - 1].latitude}
              longitude={coordinates[coordinates.length - 1].longitude}
            >
              <button
                onClick={(e) => onDroneClickHandler(e, droneItem)}
                onMouseEnter={(e) => zoomToSelectedLoc(e, droneItem)}
                onMouseLeave={(e) => zoomToSelectedLoc(e, {} as IDroneItem)}
                className={`cursor-pointer p-1 rounded-full ${
                  isReadyToFly(registration) ? "bg-green-600" : "bg-red-600"
                }`}
              >
                <Image src={droneIcon} alt={"Drone"} />
              </button>
            </Marker>

            {activeDrone && activeDrone.properties
              ? activeDrone.properties.registration === registration &&
                droneSource({ coordinates, properties, registration, index })
              : droneSource({ coordinates, properties, registration, index })}
          </Fragment>
        );
      })}

      {selectedDrone && Object.keys(selectedDrone).length > 0 && (
        <DroneMapPopup
          latitude={
            selectedDrone.geometry.coordinates[
              selectedDrone.geometry.coordinates.length - 1
            ].latitude
          }
          longitude={
            selectedDrone.geometry.coordinates[
              selectedDrone.geometry.coordinates.length - 1
            ].longitude
          }
          name={selectedDrone.properties.Name}
          altitude={selectedDrone.properties.altitude}
        />
      )}
    </Map>
  );
};

export default DronesMap;
