import axios from 'axios';

const API=axios.create({baseURL:'https://ganesh-rohit-memories-app.herokuapp.com/'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`;
    }
    return req;
});

//const url ='http://localhost:5000/posts';
 
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search||'none'}&tags=${searchQuery.tags||'none'}`); 
export const fetchPost =(id) => API.get(`/posts/${id}`);
export const createPost =(newPost)=>API.post('/posts',newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) =>API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value,id) => API.post(`/posts/${id}/commentPost`, {value});

export const signIn=(FormData)=>API.post('/user/signin',FormData);
export const signUp=(FormData)=>API.post('/user/signup',FormData);
