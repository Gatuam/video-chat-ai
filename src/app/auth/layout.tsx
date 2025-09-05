import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10 mx-auto">
        <div className=" w-full max-w-sm md:max-w-4xl  mx-auto bg-transparent ">
          {children}
        </div>
      </div>
    </>
  );
};

export default layout;
