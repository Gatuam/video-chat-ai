import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10 mx-auto">
        <div className=" w-full max-w-sm md:max-w-4xl  mx-auto bg-transparent ">
          {children}
        </div>
      </div>
      <div className="absolute -z-1 left-20 right-0 top-[51%] h-[300px] w-[300px] opacity-20 rounded-full bg-[radial-gradient(circle_400px_at_10%_300px,#fbfbfb36,#000)]"></div>
      <div className="absolute bottom-0 -z-1 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:90px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </>
  );
};

export default layout;
