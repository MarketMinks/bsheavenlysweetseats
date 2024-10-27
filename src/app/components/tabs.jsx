import Image from "next/image";


export default function TabScreen() {
  return (
    <div className="w-full h-screen justify-center flex items-center flex-col  ">
      <h1 className="text-foreground text-2xl text-center">Our Food</h1>
      <p className="text-foreground text-center text-[50px] font-bold">Fresh. Homemade. Irresistible.</p>
      <div className="absolute w-[90%] h-[324px] bg-[#8EA9C9] rounded-[42px] transform translate-y-52 z-0"></div>
      <div className="flex flex-row justify-center items-center w-full gap-20 mt-16 z-[1] px-[10%]">
        <div className="flex flex-col justify-center items-center gap-[17px]">
          <div className="max-w-60 max-h-[300px] rounded-[42px] border-4 border-[#8EA9C9] overflow-hidden ">
            <Image className="w-full h-full object-cover " alt="" src="/desserttabs.png" width={1000} height={1000} />
          </div>
          <a className="w-[187px] h-[58px] text-foreground text-center flex items-center justify-center bg-background text-2xl rounded-[22px] border-[1px] border-[#4B87C5]">
            Desserts

          </a>
        </div>
        <div className="flex flex-col justify-center items-center gap-[17px]">
          <div className="max-w-60 max-h-[300px] rounded-[42px] border-4 border-[#8EA9C9] overflow-hidden ">
            <Image className="w-full h-full object-cover " alt="" src="/cupcaketabs.png" width={1000} height={1000} />
          </div>
          <a className="w-[187px] h-[58px] text-foreground text-center flex items-center justify-center bg-background text-2xl rounded-[22px] border-[1px] border-[#4B87C5]">
            Cupcakes

          </a>
        </div>
        <div className="flex flex-col justify-center items-center gap-[17px]">
          <div className="max-w-60 max-h-[300px] rounded-[42px] border-4 border-[#8EA9C9] overflow-hidden ">
            <Image className="w-full h-full object-cover " alt="" src="/cateringtab.png" width={1000} height={1000} />
          </div>
          <a className="w-[187px] h-[58px] text-foreground text-center flex items-center justify-center bg-background text-2xl rounded-[22px] border-[1px] border-[#4B87C5]">
            Catering

          </a>
        </div>
        <div className="flex flex-col justify-center items-center gap-[17px]">
          <div className="max-w-60 max-h-[300px] rounded-[42px] border-4 border-[#8EA9C9] overflow-hidden ">
            <Image className="w-full h-full object-cover " alt="" src="/customizetabs.png" width={1000} height={1000} />
          </div>
          <a className="w-[187px] h-[58px] text-foreground text-center flex items-center justify-center bg-background text-2xl rounded-[22px] border-[1px] border-[#4B87C5]">
            Customize

          </a>
        </div>
        
      </div>
      
    </div>
  );
}