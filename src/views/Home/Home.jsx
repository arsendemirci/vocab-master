import React from "react";
import { useIPC } from "#hooks";

function Home() {
  const ipc = useIPC((state) => state.userStore);

  return (
    <div>
        Home
        {/* <button onClick={()=>ipc.test()}>test storage</button> */}
    </div>
  );
}

export default Home;
