import axios from 'axios';

export const getUserInfoFromToken = () => {
    const token = localStorage.getItem('token');

    return axios.get('api/auth/info', { 
        headers: {"Authorization" : `Bearer ${token}`} 
    });
}

export const getPosts = () => {
    const token = localStorage.getItem('token');

    return axios.get('api/posts', { 
        headers: {"Authorization" : `Bearer ${token}`} 
    });
}

export const getPostById = (id) => {
    const token = localStorage.getItem('token');

    return axios.get('api/posts/' + id, { 
        headers: {"Authorization" : `Bearer ${token}`} 
    });
}

export const deletePostById = (id) => {
    const token = localStorage.getItem('token');

    return axios.delete('api/posts/' + id, { 
        headers: {"Authorization" : `Bearer ${token}`} 
    });
}

export const updatePostById = (title, content, id) => {
    const token = localStorage.getItem('token');

    return axios.put('api/posts/' + id, 
        { 
            title: title,
            content: content
        },
        {headers: {"Authorization" : `Bearer ${token}`} 
    });
}

export const createPost = (title, content) => {
    const token = localStorage.getItem('token');

    return axios.post('api/posts', 
        { 
            title: title,
            content: content
        },
        {headers: {"Authorization" : `Bearer ${token}`} 
    });
}