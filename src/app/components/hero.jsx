import Image from "next/image";

export default function HeroPage() {
  return (
      <div className="bg-background w-full h-[90vh]   grid grid-cols-2 justify-center items-center ">
        <div className="flex justify-center items-center text-foreground flex-col">
          <h1 className="text-6xl text-center">
            Baked with love, 
          </h1>
          <h1 className="text-6xl text-center">Delivered fresh</h1>
          <p className=" text-foregroundlight text-center text-2xl font-extralight px-[20%] mt-4">
          From Classic Favorites to Custom Creations, We Have Something Sweet
          for Everyone!
        </p>
        <div className="py-3 px-10 mt-4 rounded-3xl border-foreground border-[1px]">
          <a href="/menu" className=" text-center text-3xl">
          Order Online
          </a>
        </div>
        
        </div>
        <div className="relative justify-center items-center flex-col w-full h-full  bg-[url('/heroPNG.jpg')]  bg-cover">
        <div className="absolute inset-0 bg-background opacity-10"></div>
  
        </div>
        
      </div>
  );
}
