import React, { useState, useEffect } from "react";
import { Sidebar} from '../../components'
import { useAuth } from '../../hooks/auth'
import { getPosts,getRolesPermissions} from '../api/services'
import { useRouter } from 'next/router'


export default function Index() {
    const router = useRouter()
    const [rolePermissions , setRolesPermissions] = useState();
    const [posts, setPosts] = useState();
    const [permissions, setPermissions] = useState();
    const [accessAllowed, setAccessAllowed] = useState();
    
    useEffect(()=>{
        getPosts()
        .then((response) => {
            if(response.posts) {
                setPosts(response.posts);
            }
        })

        getRolesPermissions()
        .then((response) => {
           if(response) {
            setRolesPermissions(response.nav_items)
            let keys = getAllIndexes(response.nav_items, "Post")
            let perm= null;
            console.log(response.nav_items)
            keys.forEach(element => {
                 perm= response.nav_items[element].permissions;
                });
            setPermissions(perm)
            if(perm.includes('view-post') || perm.includes('all')) {
                setAccessAllowed(true);
            } else {
                router.push('../dashboard')
            }

           }
        })

    },[])

    const getAllIndexes = (arr, val) => {
        var keys = []
        var index= 0;
        for(let i = 0; i < arr.length; i++){
           var item =  arr[i]
           if(item.name === 'Post') {
                keys[index] = i;
           }
        }

        return keys;
    }
   const viewPost = (post) => {
        router.push(`/posts/post-details/${post.id}`)
    }
    return(
        <>
        {accessAllowed  ? 
        <div className="flex flex-no-wrap h-screen">
            <Sidebar  rolePermissionsChange ={setRolesPermissions}/>
        {/* Remove class [ h-64 ] when adding a card block */}
        <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
            {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
            <div className="w-full h-full rounded ">
            <div className="sm:px-6 w-full">
                <div className="px-4 md:px-10 py-4 md:py-7">
                    <div className="lg:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Posts</p>
                        {permissions &&
                            <>
                            {permissions.includes("add-post")   || permissions.includes("all")  ?
                                <button onClick={() => router.push('posts/add-post')} className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-teal-400 ml-3 bg-blue-600 transition duration-150 text-white-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" >
                                Add Post
                                </button>
                                :
                                ''
                            }
                            </>
                        }

                    </div>
                </div>
                <div className="bg-white px-4 md:px-8 xl:px-10 overflow-x-auto">
                    <table className="w-full whitespace-nowrap border-2">
                        <thead>
                            <tr className="h-20 w-full text-sm leading-none text-gray-600">
                                <th className="font-normal text-left pl-4 ">#</th>
                                <th colSpan={3} className="font-normal text-left pl-11">Post</th>
                                <th className="font-normal text-left w-32">Created At</th>
                                {permissions.includes('delete-post') || permissions.includes('delete-post')  ||  permissions.includes('edit-post')
                                        || permissions.includes('all') ?
                                        <th className="font-normal text-left w-32">Actions</th>
                                        : ' '
                                        }
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {posts &&
                                <>
                                {posts.map(function(post, i) { 
                                  return  <tr className="h-20 text-sm leading-none text-gray-700 bg-white hover:bg-gray-100">
                                        <td className="pl-4">{post.id}</td>
                                        <td colSpan={3} className="pl-11">
                                            <div className="flex items-center">
                                                {post.title}
                                            </div>
                                        </td>
                                        
                                        <td>
                                            <p className="mr-16">{post.created_at}</p>
                                        </td>
                                        
                                        <td>
                                            

                                            <div className="flex items-center">
                                                
                                                {permissions.includes('edit-post')  || permissions.includes('all')&&
                                                    <button onClick={ () => editPost(post.id) } className="bg-gray-100 mr-3 hover:bg-gray-200 py-2.5 px-5 rounded text-sm leading-3 text-gray-500 focus:outline-none">Edit</button>
                                                }
                                                {permissions.includes('delete-post')  || permissions.includes('all') &&
                                                    <button onClick={ () => deletePost(post.id) } className="bg-gray-100 mr-5 hover:bg-gray-200 py-2.5 px-5 rounded text-sm leading-3 text-gray-500 focus:outline-none">Delete</button>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                })}
                                </>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
   

            </div>
        </div>
       
        </div>
        :

        ''
            }
        </>
                        
    )
}