import axios from '../../lib/axios'

export const getUsers = async($role) => {
    return  axios.get(`api/get-users?role_id=${$role}`)
    .then((response) => response.data)
    .catch((error) =>  error);
}

export const getRolesPermissions = async() => {
    return axios.get(`api/user-permissions`)
    .then((response) => response.data )
    .catch((error) => error);
}

export const updateUser = async(data) =>  {
    return axios.post('api/update-user', data)
    .then((response)=> response.data)
    .catch((error)=> error)
    .catch((error)=> error)
}

export const deleteUser = async(user_id) =>  {
    return axios.post('api/delete-user', user_id)
    .then((response)=> response.data)
    .catch((error)=> error)
    .catch((error)=> error)
}

export const getPosts = async(id = null) => {
    if(id === null) {
        return  axios.get(`api/posts`)
        .then((response) => response.data)
        .catch((error) =>  error);
    } else {
        return  axios.get(`api/posts?id=${id}`)
        .then((response) => response.data)
        .catch((error) =>  error);
    }
}

export const addPost= async(data) =>  {
    return axios.post('api/add-post', data)
    .then((response)=> response.data)
    .catch((error)=> error)
    .catch((error)=> error)
}

export const getRoles = async(id = null) => {
    return  axios.get(`api/roles`)
        .then((response) => response.data)
        .catch((error) =>  error);
}

export const updateRole = async(data) =>  {
    return axios.post('api/update-role', data)
    .then((response)=> response.data)
    .catch((error)=> error)
    .catch((error)=> error)
}

export const addUser = async(data) =>  {
    return axios.post('api/add-user', data)
    .then((response)=> response.data)
    .catch((error)=> error)
    .catch((error)=> error)
}