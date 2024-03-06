/**
 * Check if the drone is ready to fly or not by droneRegisteration
 */

export const isReadyToFly = (droneRegisteration: string) => {
  const registrationChars = droneRegisteration.split("-")[1];
  const firstChar = registrationChars[0];

  if (firstChar === "B") return true;
  else return false;
};
