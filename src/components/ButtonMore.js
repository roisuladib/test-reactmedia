import React from 'react'

export const ButtonMore = ({ handleMore }) => {
   return (
      <div className="flex justify-center mt-14 mb-10">
         <div onClick={handleMore} className="rounded-full flex text-center items-center justify-center font-bold text-base border border-black text-black w-[104px] h-[104px] cursor-pointer hover:shadow-lg hover:-translate-y-4 hover:text-cyan-500 hover:border-cyan-500 transition-all duration-500 bg-white">
            <div className="">MORE</div>
         </div>
      </div>
   )
}
