import React, { useState, useEffect } from "react";
import { Sidebar} from '../../../components'
import { useAuth } from '../../../hooks/auth'
import { getPosts} from '../../api/services'
import { getRolesPermissions  } from '../../api/services'
import { useRouter } from 'next/router'


export default function Index() {
    const router = useRouter()
    const [rolePermissions , setRolesPermissions] = useState();
    const id=router.query.id;
    const [post, setPost] = useState();
    const [accessAllowed, setAccessAllowed] = useState();
    const [permissions, setPermissions] = useState();    
    useEffect(()=>{
       if(id) {
        getPosts(router.query.id)
            .then((response) => {
                console.log(response)
                if(response.post) {
                    setPost(response.post);
                }
                getRolesPermissions()
                .then((response) => {
                   if(response) {
                    setRolesPermissions(response.nav_items)
                    let index =response.nav_items.findIndex(x => x.name ==="Post");
                    let keys = getAllIndexes(response.nav_items, "Post")
                    console.log(keys)
                    keys.forEach(element => {
                         perm= response.nav_items[element].permissions;
                    });
                    console.log(perm)
                    setPermissions(perm)
                    if(perm.includes('view-post') || perm.includes('all')) {
                        setAccessAllowed(true);
                    } else {
                        router.push('../dashboard')
                    }
        
                   }
                })
            })
        }
    },[router.isReady])

    const getAllIndexes = (arr, val) => {
        var keys = []
        var index= 0;
        for(let i = 0; i < arr.length; i++){
           var item =  arr[i]
           if(item.name === 'User') {
                keys[index] = i;
           }
        }

        return keys;
    }
    return(
        <> 
            <div className="flex flex-no-wrap h-screen">
                <Sidebar />
                {post && 
                   
                    <div class="bg-lightblue py-20 px-10 ">
                        <div class="mx-auto max-w-6xl flex flex-col md:flex-row">
                           
                            <dl class="w-full md:w-2/3">
                                <dt class="mb-4">
                                    <h3 class="text-xl font-semibold">
                                       {post.title}
                                    </h3>
                                </dt>
                                <dd class="mb-16">
                                    <p>
                                       {post.post}
                                    </p>
                                </dd>
                            </dl>
                        </div>
                    </div>

                }

            </div>
        </>
    )

}