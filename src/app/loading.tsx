import React from "react";

const Loading = () => {
  return (
    <div className="relative flex items-center justify-center h-screen">
      <img
        src="https://holaworld.io/images/logo/hola_default.png"
        alt=""
        className="w-80 h-80 origin-center loadingIcon"
      />
    </div>
  );
};

export default Loading;
