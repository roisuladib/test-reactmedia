import React from 'react';
import { Modal } from './Modal';
import { ReactComponent as IcStar } from '../assets/images/ic-star.svg';
import { ReactComponent as IcSend } from '../assets/images/ic-send.svg';

export const Card = ({ users, post, comments, getComments, handleLikeUpdate, handleComment }) => {
   return (
      <div className="group relative bg-gray-300 h-[120px] w-[120px] overflow-hidden cursor-pointer" title={post.title} onClick={getComments}>
         <img className="object-cover w-full h-full animate-bounce" src={`https://avatars.dicebear.com/api/bottts/${post?.title}.svg`} alt={post?.title} />
         <div className="absolute inset-0 bg-gray-300 p-2 opacity-0 group-hover:opacity-70 transition-all duration-300">
            <div className="text-xs opacity-100 capitalize">{post.title}</div>
         </div>
         <Modal content={toggle => (
            <div className="bg-white w-[410px] h-[80vh] overflow-y-scroll">
               <div className="flex py-5 px-4 justify-between items-center w-full">
                  <div className="flex space-x-4 items-center">
                     <div className="rounded-full w-10 h-10 overflow-hidden bg-gray-100">
                        <img src={`https://avatars.dicebear.com/api/avataaars/${users?.name}.svg`} className="object-cover w-full h-full" alt="" />
                     </div>
                     <div className="">{users.name}</div>
                  </div>
                  <div className="cursor-pointer" onClick={handleLikeUpdate}>
                     {
                        post.like === 0
                           ? <IcStar className="w-7 h-7 stroke-black" />
                           : <IcStar className="w-7 h-7 fill-red-600" />}
                  </div>
               </div>
               <div className="relative w-full bg-gray-300 overflow-hidden cursor-pointer">
                  <img className="object-cover w-full h-full animate-bounce" src={`https://avatars.dicebear.com/api/bottts/${post?.title}.svg`} alt={post?.title} />
               </div>
               <div className="w-full px-4 py-5">
                  <div className="flex flex-col space-y-3">
                     <div className="flex flex-col">
                        <div className="font-bold text-base capitalize">{post.title}</div>
                        <div className="font-normal text-[13px] leading-relaxed">{post.body}</div>
                     </div>
                     <div className="flex flex-col">
                        <div className="font-bold text-xs">COMMENTS</div>
                        {
                           comments?.length > 0
                              ? comments?.map(comment => (
                                 <>
                                    <div className="bg-gray-100 w-full h-[1px] mt-1 mx-2" />
                                    <div className="flex justify-between items-center space-x-3">
                                       <div key={comment.id} className="font-normal text-xs leading-relaxed px-2">{comment.body}</div>
                                       <div key={comment.id} className="font-normal text-xs leading-relaxed px-2 whitespace-nowrap">{comment.time}</div>
                                    </div>
                                 </>
                              ))
                              : (<div className="font-normal text-xs leading-relaxed px-2">No Comments</div>)
                        }
                        <form onSubmit={handleComment} className="flex space-x-1 mt-2">
                           <input type="hidden" name="postId" value={post.id} />
                           <input name="body" className="w-full border-[0.5px] border-black rounded-[10px] py-2 px-4 text-xs" type="text" />
                           <button type="submit">
                              <IcSend />
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         )}>
            {
               toggle => <span onClick={toggle} className="link-wrapper"></span>
            }
         </Modal>
      </div>
   )
}
