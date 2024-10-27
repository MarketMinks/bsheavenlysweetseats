import Image from 'next/image';
import { FaFacebookSquare, FaInstagram  } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function Footer() {
    return (
      <div className="bg-background w-full  flex justify-center">
          <div className='text-center font-indie text-foreground'> 
              <div className=' flex flex-row space-x-6 px-52 '> 
                <a href='' className=''> 
                  <FaFacebookSquare className='w-[50px] h-[50px] text-foreground' />
                </a>
                <a> 
                  <SiGmail  className='w-[50px] h-[50px] text-foreground'/>
                </a>
                <a> 
                  <FaInstagram className='w-[50px] h-[50px] text-foreground'/>
                </a>
              </div>
              <li className='text-foreground font-thin font-indie mt-2 space-x-4'>
                  <a href>@2024 B's Heavenly Sweets  </a>
                  <a href=''> Terms and Conditions</a>
                  <a href=''> Refund Policy</a>
                  <a href=''> Privacy Policy</a>
              </li>
          </div>
      </div>
    );
}