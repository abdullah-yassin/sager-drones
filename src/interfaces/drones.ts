export type Coordinates = {
  latitude: number;
  longitude: number;
};

export interface IDroneProperties {
  serial: string;
  registration: string;
  Name: string;
  altitude: number;
  pilot: string;
  organization: string;
  yaw: number;
}

export interface IDroneItem {
  properties: IDroneProperties;
  geometry: {
    coordinates: Coordinates[];
  };
}
