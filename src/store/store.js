import { configureStore } from "@reduxjs/toolkit";
import * as stores from "#stores";

console.log("stores", { ...stores });
export default configureStore({
  reducer: {
    ...stores,
  },
});
