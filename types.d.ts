/* eslint-disable no-var */
import { Connection } from "mongoose";

declare global {
  var mongoose: {
    conn: Connection | null; // it stores actual connection to the database
    promise: Promise<Connection> | null; // it prevents multiple connections during hot reloads in development by caching the promise of the connection
  };
}

export {};
