import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" relative flex min-h-svh flex-col itc justify-center p-6 md:p-10 mx-auto">
        <div className=" w-full max-w-sm md:max-w-4xl  mx-auto bg-transparent ">
          {children}
        </div>
      </div>
      <div className=" absolute inset-0 -z-1  h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
    </>
  );
};

export default layout;
