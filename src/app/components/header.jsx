import Image from 'next/image';
export default function Header() {
  return (
    <>
      <div className="bg-background w-full h-[70px] flex flex-row justify-between items-center px-8 md:px-16 space-x-10 border-b-[1px] border-foreground ">
        <a href="true" className="flex-shrink-0"> 
          <Image src="/logo.png" width={80} height={80}  alt="Logo" className="max-w-full h-auto" />
        </a>
        <div className="flex space-x-16 text-foreground">
          <a href="/" className="text-lg md:text-2xl font-body ">Home </a>
          <a href="true" className="text-lg md:text-2xl font-body ">About Me</a>
          <a href="/menu" className="text-lg md:text-2xl font-body ">Menu</a>
          <a href="true" className="text-lg md:text-2xl font-body ">Contact Me</a>
          <a href="/cart" className="text-lg md:text-2xl font-body ml-auto pr-4">Cart</a>
        </div>
      </div>
      <div className="bg-blue-500 w-[full] h-[1px]" ></div>
    </>
  );
}
