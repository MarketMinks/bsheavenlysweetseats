import Image from 'next/image';
import { FaFacebookSquare, FaInstagram  } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function Footer() {
    return (
      <div className="bg-foreground w-full  flex justify-center min-h-[200px] items-center">
          <div className='text-center font-indie text-background'> 
              <div className=' flex flex-row space-x-6 px-52 '> 
                <a href='true' className=''> 
                  <FaFacebookSquare className='w-[50px] h-[50px] text-background' />
                </a>
                <a href='true'> 
                  <SiGmail  className='w-[50px] h-[50px] text-background'/>
                </a>
                <a href='true'> 
                  <FaInstagram className='w-[50px] h-[50px] text-background'/>
                </a>
              </div>
              <li className='text-background font-thin font-indie mt-2 space-x-4'>
                  <a href='true'> @2024 B&apos;s Heavenly Sweets  </a>
                  <a href='true'> Terms and Conditions</a>
                  <a href='true'> Refund Policy</a>
                  <a href='true'> Privacy Policy</a>
              </li>
          </div>
      </div>
    );
}