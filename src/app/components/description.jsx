import Image from "next/image";
import TabScreen from "./tabs";
import AboutInfo from "./aboutinfo";

export default function DescriptionTab() {
  return (
    <div className="flex justify-center flex-col items-center w-screen max-w-[100%] bg-background">
      <TabScreen />
      <div className="w-full h-[1px] mt-20 bg-foreground"></div>
      <div className="w-full h-[1px] mt-1 mb-20 bg-foreground"></div>
      <AboutInfo />
      <div className="w-full h-[1px] mt-20 bg-foreground"></div>
      <div className="w-full h-[1px] mt-1 mb-20 bg-foreground"></div>
    </div>
  );
}
