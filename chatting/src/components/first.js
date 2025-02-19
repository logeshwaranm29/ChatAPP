import React from 'react';
import myimage from './img.jpg'; 
import { IoHomeOutline } from "react-icons/io5";
import { IoChatbubbleSharp } from "react-icons/io5";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { CiDroplet } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";
import './App.css'; 

const First = () => {

  return (
    <div className='MainDiv'>
      <div className='firstcomponent'>
        <div>
          
          <img className='logo' src={myimage} alt='logo' />
        </div>
        <div className='container-2'>
          <IoHomeOutline className='icons' />
          <IoChatbubbleSharp className='icons' />
          <HiOutlineStatusOnline className='icons' />
          <CiDroplet className='icons' />
          <CiSearch className='icons' />
          <FaPlus className='icons' />
        </div>
        <div className='container-3'>
          <RiLogoutBoxRLine className='icons' />
        </div>
      </div>
    </div>
  );
};

export default First;
