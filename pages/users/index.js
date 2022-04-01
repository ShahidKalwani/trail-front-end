import React, { useState, useEffect } from 'react'
import { Sidebar} from '../../components'
import { useAuth } from '../../hooks/auth'
import { getUsers, getRolesPermissions } from '../api/services';
import { useRouter } from 'next/router'

export default function Index() {
    const router = useRouter()
    const [rolePermissions , setRolesPermissions] = useState();
    const [show, setShow] = useState(null);
    const { user, loading} = useAuth({ middleware: 'auth' })
    const [users, setUsers] = useState();
    const [permissions, setPermissions] = useState();
    const [accessAllowed, setAccessAllowed] = useState();

    useEffect(() => {
        getUsers()
        .then((response) => {
            if(response.users) {
                setUsers(response.users);
            }
        })

        getRolesPermissions()
        .then((response) => {
           if(response) {
            setRolesPermissions(response.nav_items)
           
            let keys = getAllIndexes(response.nav_items, "User")
            let perm= null;
            keys.forEach(element => {
                 perm= response.nav_items[element].permissions;
                });
            setPermissions(perm)
            if(perm.includes('view-user') || perm.includes('all')) {
                // console.log(perm)
                setAccessAllowed(true);
            } else {
                router.push('../dashboard')
            }

           }
        })

    },[])

    const editUser = (user_id) => {
       
    }

    const deleteUser = (user_id) => {
      
    }

    const editRole = (user_id) => {
        router.push(`users/role/${user_id}`)
    }
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

            {accessAllowed  &&
                <div className="flex flex-no-wrap h-screen">
                <Sidebar />
                {/* Remove class [ h-64 ] when adding a card block */}
                <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                    {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
                    <div className="w-full h-full rounded ">
                    <div className="sm:px-6 w-full">
                        <div className="px-4 md:px-10 py-4 md:py-7">
                            <div className="lg:flex items-center justify-between">
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Users</p>
                                {permissions &&
                            <>
                            {permissions.includes("add-post")   || permissions.includes("all")  ?
                                <button onClick={() => router.push('users/add-user')} className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-teal-400 ml-3 bg-blue-600 transition duration-150 text-white-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" >
                                    Add User
                                    </button>
                                    :
                                    ''
                                }
                                </>
                            }
                            </div>
                        </div>
                        <div className="bg-white px-4 md:px-8 xl:px-10 overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                                <thead>
                                    <tr className="h-20 w-full text-sm leading-none text-gray-600">
                                        <th className="font-normal text-left pl-4">#</th>
                                        <th className="font-normal text-left pl-11">Name</th>
                                        <th className="font-normal text-left pl-10">Age</th>
                                        <th className="font-normal text-left">Created</th>
                                        <th className="font-normal text-left">Email</th>
                                        {permissions.includes('delete-user') || permissions.includes('delete-user')  ||  permissions.includes('edit-user')
                                        || permissions.includes('all') ?
                                        <th className="font-normal text-left w-32">Actions</th>
                                        : ' '
                                        }
                                    </tr>
                                </thead>
                                <tbody className="w-full">
                                    {users &&
                                        <>
                                        {users.map(function(usr, i) { 
                                        return  <tr className="h-20 text-sm leading-none text-gray-700 bg-white hover:bg-gray-100">
                                                <td className="pl-4">{usr.id}</td>
                                                <td className="pl-11">
                                                    <div className="flex items-center">
                                                        {usr.name}
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mr-16 pl-10">28</p>
                                                </td>
                                                <td>
                                                    <p className="mr-16">{usr.created_at}</p>
                                                </td>
                                                <td>
                                                    <p className="mr-16">{usr.email}</p>
                                                </td>
                                                {permissions.includes('delete-user') || permissions.includes('delete-user')  ||  permissions.includes('edit-user')
                                                || permissions.includes('all') ?
                                        
                                                <td>
                                                    <div className="flex items-center">
                                                        {permissions.includes('edit-role') || permissions.includes('all') &&
                                                        <button onClick={ () => editRole(usr.id) } className="bg-gray-100 mr-3 hover:bg-gray-200 py-2.5 px-5 rounded text-sm leading-3 text-gray-500 focus:outline-none">Role</button>
                                                        }
                                                        {permissions.includes('edit-user')  || permissions.includes('all')&&
                                                            <button onClick={ () => editUser(usr.id) } className="bg-gray-100 mr-3 hover:bg-gray-200 py-2.5 px-5 rounded text-sm leading-3 text-gray-500 focus:outline-none">Edit</button>
                                                        }
                                                        {permissions.includes('delete-user')  || permissions.includes('all') &&
                                                            <button onClick={ () => deleteUser(usr.id) } className="bg-gray-100 mr-5 hover:bg-gray-200 py-2.5 px-5 rounded text-sm leading-3 text-gray-500 focus:outline-none">Delete</button>
                                                        }
                                                    </div>
                                                </td>
                                                    : ''
                                                }
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
            }
        </>
    )
}