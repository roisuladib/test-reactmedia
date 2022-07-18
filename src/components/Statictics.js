import React from 'react';

export const Statictics = ({ title, subTitle }) => {
   return (
      <div className="text-center">
         <div className="font-normal text-xs text-black">{title}</div>
         <div className="font-normal text-xs text-black">{subTitle}</div>
      </div>
   )
}