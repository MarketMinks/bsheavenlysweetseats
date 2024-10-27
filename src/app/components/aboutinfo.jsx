
import Image from 'next/image';


export default function AboutInfo() {
  return (
    <div className="grid grid-cols-2 justify-center items-center w-screen max-w-[100%] min-h-[600px]  bg-background">
      <div className="w-full flex flex-col justify-center items-center px-32 ">
        <h1 className="text-foreground text-6xl font-bold w-full text-start ">About Us</h1>
        <p className="text-foreground   text-[40px] w-full text-start mb-4">Our Story</p>
        <div className="w-full border-t-[2px] border-foreground border-dashed"></div>
        <div className=" text-2xl text-foregroundlight mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisl  ligula, venenatis in placerat et, mollis eu felis. Nulla non suscipit  elit. Mauris quis ornare lectus, quis posuere nunc. Nam consequat  vulputate convallis. Morbi augue nisl, elementum non varius aliquam.</div>
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