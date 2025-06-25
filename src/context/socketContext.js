import { createContext } from "react";
import io from "socket.io-client";

//  export const socket = io('http://localhost:8000'); // Localhost

export const socket = io("https://iacg-backend.onrender.com"); // Production
// export const socket = io(
//   "http://ec2-13-232-71-109.ap-south-1.compute.amazonaws.com/api"
// ); // AWS

export const SocketContext = createContext();
