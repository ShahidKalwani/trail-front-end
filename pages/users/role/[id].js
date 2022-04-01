import React, { useState, useEffect, useRef} from 'react'
import { Sidebar} from '../../../components'
import { useAuth } from '../../../hooks/auth'
import { getRoles, updateRole, getRolesPermissions } from '../../api/services';
import { useRouter } from 'next/router'

export default function Index() {
    const router = useRouter()
    const [rolePermissions , setRolesPermissions] = useState();
    const [roleID, setRoleID] = useState();
    const [show, setShow] = useState(null);
    const [users, setUsers] = useState();
    const { user, loading} = useAuth({ middleware: 'auth' })
    const [permissions, setPermissions] = useState();
    const [roles, setRoles] = useState();
    const [accessAllowed, setAccessAllowed] = useState();
     const id=router.query.id;
     let form = useRef(null);
    
    useEffect(()=>{
        if(id && user) {
           let role_id = user[0].pivot.role_id;
           console.log("role id ", router.query.id)
           setRoleID(router.query.id);
            getRoles()
                .then((response) => {
                    console.log(response)
                    
                    if(response.roles) {
                        setRoles(response.roles);
                    }
                })
            }
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
                if(perm.includes('view-role') || perm.includes('all')) {
                    setAccessAllowed(true);
                } else {
                    router.push('../../dashboard')
                }
    
               }
            })
     },[router.isReady , user])

    const updateUserRole = (role_id) => {
        updateRole({
            role_id:role_id
        })
        .then((response)=>{
           if(response) {
               setRoleID(role_id)
           }
        })
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
            <div className="flex flex-no-wrap h-screen">
                <Sidebar />
                <div className="container mx-auto bg-white shadow rounded">
                    <div className="xl:w-full border-b border-gray-300 py-5">
                        <div className="flex items-center w-11/12 mx-auto">
                            <div className="container mx-auto">
                                <div className="mx-auto xl:w-full">
                                    <p className="text-lg text-gray-800 font-bold">Roles</p>
                                    <p className="text-sm text-gray-500 pt-1">Roles Assigned and available role</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div>
                            <div className="container mx-auto bg-white dark:bg-gray-800 py-6 w-11/12">
                                {roles &&
                                    <>
                                        {roles.map(function(role, i) {
                                            return  <div className="flex justify-between items-center mb-8">
                                              <div className="w-9/12">
                                                  <p className="text-sm text-gray-800 dark:text-gray-100 pb-1">{role.name}</p>
                                              </div>
                                              <div className="cursor-pointer rounded-full relative shadow-sm">
                                                  <input onClick={()=>updateUserRole(role.id)} type="checkbox"  id={`toggle${role.id}`} className="focus:outline-none checkbox w-4 h-4 rounded-full bg-white absolute m-1 shadow-sm appearance-none cursor-pointer" checked={roleID == role.id ? 'true' : ''}/>
                                                  <label htmlFor={`toggle${role.id}`}  className="toggle-label dark:bg-gray-700 block w-12 h-6 overflow-hidden rounded-full bg-gray-300 cursor-pointer" />
                                              </div>
                                          </div>
                                        })}
                                    </>
                                }
                            </div>
                           
                        </div>
                    </form>
                    <style>
                        {` .checkbox:checked {
                                /* Apply class right-0*/
                                right: 0;
                            }
                            .checkbox:checked + .toggle-label {
                                /* Apply class bg-indigo-700 */
                                background-color: #4c51bf;
                            }`}
                    </style>
                </div>  
            </div>
        </>
    )
}