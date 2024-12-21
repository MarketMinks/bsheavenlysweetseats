import Image from "next/image";
export default function InstaPicFooter() {
  return (
    <div className="w-full flex flex-wrap flex-row justify-center items-center py-8 bg-background gap-5 pb-20">
  {/* Main Gallery */}
    <div className="bg-foreground rounded-lg p-4 w-[220px] h-[220px] flex items-center justify-center">
      <p className="text-white text-center text-sm font-bold">follow us<br/>@bsheavenly_sweetsandeats</p>
    </div>
    <div className="rounded-lg overflow-hidden w-[220px] h-[220px]">
      <Image 
        src="/cake/strawberrycake.png"
        alt="strawberrycake"
        width={220}
        height={220}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="rounded-lg overflow-hidden w-[220px] h-[220px]">
      <Image
        src="/cake/strawlemoncake.png" 
        alt="strawlemoncake"
        width={220}
        height={220}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="rounded-lg overflow-hidden w-[220px] h-[220px]">
      <Image
        src="/cake/reececake.png"
        alt="reececake"
        width={220}
        height={220}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="rounded-lg overflow-hidden w-[220px] h-[220px]">
      <Image
        src="/cake/strawberrycrunchcupcakes.png"
        alt="strawberrycrunchcupcakes"
        width={220}
        height={220}
        className="w-full h-full object-cover"
      />
    </div>

</div>

  );
}
