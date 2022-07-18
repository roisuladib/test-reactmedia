import React, { useEffect, useState } from 'react';
import { apiUsers } from './configs';
import { ButtonMore, Card, CardLoading, Statictics } from './components';

const rows = 3;

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [countLike, setCountLike] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [more, setMore] = useState(rows);
  const [q, setQ] = useState('');

  useEffect(() => {
    handleGetUser();
    handleGetPost();
    handleMore();
    handleLike();
  }, []);

  const handleGetUser = async () => {
    try {
      const res = await apiUsers.getUser();
      setUsers(res);
    } catch (err) {
      setError(err?.statusText);
    }
  };
  const handleGetPost = async () => {
    try {
      const res = await apiUsers.getPost();
      setIsLoading(true);
      setTimeout(() => {
        setPosts(res);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      setError(err?.statusText);
    }
  };
  const handleGetPostNoSetTimeOut = async () => {
    try {
      const res = await apiUsers.getPost();
      setIsLoading(true);
      setPosts(res);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err?.statusText);
    }
  };
  const handleLike = async () => await apiUsers.getPostLike(1).then(res => {
    setPosts(res);
    setCountLike(res?.length);
  });
  const refreshLike = async () => await apiUsers.getPostLike(1).then(res => setCountLike(res?.length));
  const handleMore = () => setMore(more + rows)
  const handlerSearch = e => setQ(e);
  const handleComment = async e => {
    e.preventDefault();
    if (e.target[1].value === '') return alert('Comment can\'t be null ')
    try {
      await apiUsers.postComment({
        postId: e.target[0].value,
        body: e.target[1].value,
        time: `${new Date().getHours()} : ${new Date().getMinutes()}`
      });
      e.target[1].value = '';
      getComments(e.target[0].value);
    } catch (err) {
      setError(err?.statusText);
    }
  }
  const getComments = async e => await apiUsers.getComment(e).then(res => setComments(res));
  const handleFavorite = () => {
    setFavorite(!favorite);
    if (favorite) return handleGetPostNoSetTimeOut();
    else return handleLike();
  };
  const handleLikeUpdate = async e => {
    const { userId, title, body, like, id } = e;
    try {
      await apiUsers.updatePostLike(id, { userId, title, body, like: like === 0 ? 1 : 0 });
      refreshLike();
      handleGetPostNoSetTimeOut();
    } catch (err) {
      setError(err?.statusText);
    }
  }

  return (
    <div className="relative h-screen bg-white flex flex-row justify-center items-center">
      <div className="max-w-[444px] h-[96vh] px-4 flex-1 pt-10 border-x-[16px] border-y-[26px] border-gray-600 rounded-lg overflow-y-scroll">
        <div className="w-full">
          <div className="flex space-x-7 items-center">
            <div className="rounded-full w-[99px] h-[99px] overflow-hidden bg-gray-100">
              <img src={`https://avatars.dicebear.com/api/avataaars/${users?.name}.svg`} className="object-cover w-full h-full" alt="" />
            </div>
            <div className="flex flex-col space-y-[22px]">
              <div className="font-bold text-base text-black">{users.name}</div>
              <div className="flex space-x-10 overflow-x-scroll">
                <Statictics title="75" subTitle="Followers" />
                <Statictics title={countLike} subTitle="Likes" />
                <Statictics title={posts?.length} subTitle="Posts" />
              </div>
            </div>
          </div>
          <div className="bg-black w-full h-[1px] mt-8 mb-5" />
          <div className="flex flex-col space-y-2">
            <div className="text-center">POSTS</div>
            <div className="flex justify-between items-center">
              <div className={favorite ? 'rounded-lg border border-cyan-500 bg-cyan-500 text-white px-3 text-xs py-1 font-normal cursor-pointer hover:shadow-md transition-all duration-300' : "rounded-lg border border-black px-3 text-xs py-1 font-normal cursor-pointer hover:shadow-md hover:text-cyan-500 hover:border-cyan-500 transition-all duration-300"} onClick={handleFavorite}>Favorited</div>
              <input onChange={e => handlerSearch(e.target.value.toLowerCase())} type="search" placeholder="Search Here" className="outline-none rounded-[5px] border-[0.5px] w-1/3 border-black px-3 text-xs py-1 font-normal focus:border-cyan-500 focus:shadow-md focus:-translate-y-1 transition-all duration-300" />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {
              error !== null
                ? <div className="text-center text-red-600">{error}</div>
                : isLoading === true
                  ? (<CardLoading />)
                  : posts?.length > 0
                    ? posts?.slice(0, more)?.filter(e => e?.title?.toLowerCase()?.includes(q)).map(post => (
                      <Card
                        key={post.id}
                        users={users}
                        post={post}
                        comments={comments}
                        getComments={() => getComments(post.id)}
                        handleLikeUpdate={() => handleLikeUpdate(post)}
                        handleComment={handleComment}
                      />
                    ))
                    : (<div className="text-center col-span-3">Post Null</div>)
            }
          </div>
          {
            more < posts?.length && (<ButtonMore handleMore={handleMore} />)
          }
        </div>
      </div>
    </div>
  )
}

export default App;