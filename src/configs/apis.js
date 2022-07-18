import instance from './instance';

export const apiUsers = {
   getUser: () => instance.get('/users').then(res => res.data),
   getPost: id => instance.get(`/posts/${id || ''}`).then(res => res.data),
   getPostLike: like => instance.get(`/posts?like=${like}`).then(res => res.data),
   updatePostLike: (id, body) => instance.put(`/posts/${id}`, body).then(res => res.data),
   getComment: id => instance.get(`posts/${id}/comments`).then(res => res.data),
   postComment: body => instance.post('/comments', body).then(res => res.data),
}