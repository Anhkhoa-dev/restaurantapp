import React, {useState} from 'react';
import {motion} from 'framer-motion';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';
import {Link} from 'react-router-dom';

import Logo from './img/logo.png';
import Avatar from './img/avatar.png';
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md"; // import react icons
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';



const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [{user}, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false);

    const login = async () => {
      if(!user){
        const {user: {refreshToken, providerData}} = await signInWithPopup( firebaseAuth, provider);
        dispatch({
          type : actionType.SET_USER,
          user : providerData[0],
        });
        localStorage.setItem('user', JSON.stringify(providerData[0]));
      }else{
        setIsMenu(!isMenu)
      }
        
    };

  return (
    <header className='fixed z-50 w-screen p-6 px-16'>
      {/* desktop and tablet */}
      <div className='hidden md:flex w-full h-ful items-center justify-between'>
          <Link to={"/"} className='flex items-center gap-2'>
              <img src={Logo} alt="logo website" className='w-8 object-cover' />
              <p className='text-headingColor text-xl font-bold'>City</p>
          </Link>

          {/* menu */}
          <div className='flex items-center gap-8'>
            <ul className='flex items-center justify-between gap-8'>
              <li className='text-base text-textColor hover:text-headingColor durarion-100 transition-all ease-in-out cursor-pointer'>Home</li>
              <li className='text-base text-textColor hover:text-headingColor durarion-100 transition-all ease-in-out cursor-pointer'>Menu</li>
              <li className='text-base text-textColor hover:text-headingColor durarion-100 transition-all ease-in-out cursor-pointer'>About Us</li>
              <li className='text-base text-textColor hover:text-headingColor durarion-100 transition-all ease-in-out cursor-pointer'>Service</li>
            </ul>

            <div className='relative flex items-center justify-center'>
            <MdShoppingBasket className='text-textColor text-2xl cursor-pointer'/>
              <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center' >
                <p className='text-xs text-white font-semibold'>0</p>
                </div>
            </div>
            <div className='relative'>
              <motion.img 
              whileTap={{scale : 0.6}}
              src={user ? user.photoURL : Avatar} 
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full" 
              alt={user ? user.displayName : "User Profile"} onClick={login}
              />
              {
                isMenu && (
                  <motion.div 
                  initial={{opacity: 0, scale: 0.6}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.6}}
                  className='w-60 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute  top-12 right-0 px-4 py-4 '>
                  {user && user.email === "nguyenkhoa.offical2021@gmail.com" && (
                    <Link to={"/createItem"} className='flex items-center justify-start gap-2 cursor-pointer hover:bg-slate-300 px-4 py-2 translate-all duration-100 ease-in-out text-textColor text-base'>New Item <MdAdd /></Link>
                  )}
              
                <p className='flex items-center justify-start gap-2 cursor-pointer hover:bg-slate-300 px-4 py-2 translate-all duration-100 ease-in-out text-textColor text-base'>Logout <MdLogout /></p>
              </motion.div>
                )
              }
              
            </div>
            
          </div>
          


      </div>



      {/* mobile */}
      
      <div className='flex md:hidden w-full h-ful'></div>
      
    </header>
  )
}

export default Header