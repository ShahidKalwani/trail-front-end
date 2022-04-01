import React, { useState, useEffect } from "react";
import { Sidebar} from '../../../components'
import { useAuth } from '../../../hooks/auth'
import { getRolesPermissions , addPost } from '../../api/services'
import { useRouter } from 'next/router'


export default function Index() {
    const router = useRouter()
    const [rolePermissions , setRolesPermissions] = useState();
    const [accessAllowed, setAccessAllowed] = useState();
    const [title,setTitle] = useState();
    const [post, setPost] = useState()
    const [permissions, setPermissions] = useState();

    useEffect(() => {
        getRolesPermissions()
        .then((response) => {
           if(response) {
            setRolesPermissions(response.nav_items)
            let index =response.nav_items.findIndex(x => x.name ==="Post");
            setPermissions(response.nav_items[index].permissions)
            let permissions= response.nav_items[index].permissions;
            if(permissions.includes('add-post') || permissions.includes('all')) {
                setAccessAllowed(true);
            } else {
                router.push('../dashboard')
            }

           }
        })
    }, [])
    const handleSubmit = (event) => {
       event.preventDefault()

       if(post && title) {
            let data = {
                title: title,
                post: post,
            }

            addPost(data)
            .then((response) => {
                
                if(response) {
                    router.push('../posts')
                }
            })
       }
    }
    return(
        <>
            {accessAllowed &&

            <div className="flex flex-no-wrap h-screen">
                <Sidebar rolePermissionsChange ={setRolesPermissions} />
                    <>
                    <form onSubmit={handleSubmit} className='w-3/4 ml-4 pt-4'>
                        <div className="container mx-auto shadow bg-white dark:bg-gray-800 rounded">
                            <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                                <div className="flex items-center w-11/12 mx-auto">
                                    <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Add Post</p>
                                    <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                            <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-11/12 mx-auto">
                                <div className="xl:w-9/12 mx-auto xl:mx-0">
                            
                                    <div className="mt-16 flex flex-col xl:w-2/6 lg:w-2/6 w-full">
                                        <label htmlFor="username" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                           Title
                                        </label>
                                        <input type="text"  value={title} onChange={e => setTitle(e.target.value)} className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800 bg-transparent dark:text-gray-100" placeholder="@example" required />
                                    </div>
                                    <div className="mt-8 flex flex-col xl:w-3/5 lg:w-3/5 w-full">
                                        <label htmlFor="about" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                          Post
                                        </label>
                                        <textarea   value={post} onChange={e => setPost(e.target.value)} className="border border-gray-300 dark:border-gray-700 pl-3 py-2 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent resize-none text-gray-800 dark:text-gray-100" placeholder="Let the world know who you are" rows={5} required defaultValue={""} />
                                        <p className="w-full text-right text-xs text-gray-500 pt-1">Character Limit: 200</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full py-4 sm:px-12 px-4 bg-gray-100 dark:bg-gray-700 mt-6 flex justify-end rounded-bl rounded-br">
                                <button className="btn  text-sm focus:outline-none text-gray-600 dark:text-gray-400 border border-gray-300 dark:hover:border-gray-500 py-2 px-6 mr-4 rounded hover:bg-gray-200 transition duration-150 ease-in-out">Restore</button>
                                <button className="bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm focus:outline-none" type="submit">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                    </>
                
            </div>
            }
        </>
    )
}