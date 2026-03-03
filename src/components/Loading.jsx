import React from "react";
import { DNA } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center relative">
      <div className="flex items-center justify-center z-50 absolute">
<DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
      </div>
      
    </div>
  );
};

export default Loading;
