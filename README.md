# Sager Drone Tracing System

![Project Logo](https://sagerdrone.com/frontend/img/sager_log.svg)

Sager Drones in a Next TS application that shows a list of drones on the map and traces the path of each drone.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Credits](#credits)

## Overview

Sager Drone Tracing System is a web application designed to display live drone activity in a given space.
It provides real-time tracking of drones and classifies them based on their registration number.
The system utilizes a front-end developed using ReactJS/NextJS, communicates with the backend via WebSocket, and implements the map using Mapbox.

## Features

- Displays live drone activity on a map interface.
- Classifies drones as allowed to fly (green) or not (red) based on their registration number.
- Shows the path of each drone from the time of opening the page.
- Hovering over a drone displays a popup with flight time and altitude information.
- Dashboard section for entertainment.
- The counter in the bottom right displays the number of red drones.
- Clicking on a drone in the list moves the map to that drone.
- Clicking on a drone on the map highlights it in the list.

## Setup Instructions

- Clone the repository from GitHub.
- Install dependencies using Yarn: `yarn install`.
- Run the application: `yarn dev`.

## Usage

- Open the application in a web browser.
- Explore live drone activity displayed on the map route (from the side menu).
- Interact with drones by hovering over them, clicking on them, or using the drone list.
- Have fun with the dashboard page numbers game.

## Credits

- [ReactJS](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [Mapbox](https://www.mapbox.com/)
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Particles](https://particles.js.org/)
