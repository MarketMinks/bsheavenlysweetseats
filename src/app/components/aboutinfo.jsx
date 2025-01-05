
import Image from 'next/image';


export default function AboutInfo() {
  return (
    <div className="grid grid-cols-2 justify-center items-center w-screen max-w-[100%] min-h-[600px]  bg-background">
      <div className="w-full flex flex-col justify-center items-center px-32 ">
        <h1 className="text-foreground text-6xl font-bold w-full text-start ">B's Sweets</h1>
        <p className="text-foreground   text-[40px] w-full text-start mb-4">About us</p>
        <div className="w-full border-t-[2px] border-foreground border-dashed"></div>
        <div className=" text-2xl text-foregroundlight mt-4">Barbara Montgomery is the owner of B’s Heavenly Sweets & Eats, inspired by her early passion for cooking alongside her grandmother and honed through years of practice and education in Home Economics. She began her business by crafting chocolate-covered strawberries and experimenting with recipes, which quickly expanded into cakes, desserts, and other baked goods due to popular demand. As her culinary offerings grew to include savory dishes, she rebranded her business to reflect both her sweet and savory creations. Today, Barbara delights in sharing her love for cooking and baking by providing delicious meals and desserts for individuals and events.</div>
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center border-l-2 border-foreground ">
        <Image className="w-[400px] h-[500px] border-foregroundlight border-[6px] rounded-3xl absolute shadow-[0px_4px_7.8px_2px_rgba(0,0,0,0.25)]
 object-cover " alt="" src="/cupcaketabs.png" width={1000} height={1000} />
        <Image className="w-[300px] h-[300px] border-foregroundlight border-[6px] absolute shadow-[0px_4px_7.8px_2px_rgba(0,0,0,0.25)] rounded-3xl right-9 translate-y-7
 object-cover " alt="" src="/cupcaketabs.png" width={1000} height={1000} />

      </div>

    </div>
  );
}