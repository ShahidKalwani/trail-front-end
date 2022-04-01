import React, { useState, useEffect } from "react";
import { Sidebar} from '../../components'
import { useAuth } from '../../hooks/auth'
import { getUsers } from '../api/services'

function Index() {
    const { user, loading} = useAuth({ middleware: 'auth' })
    useEffect(() => {
     
            
    })
    return (
        <div className="flex flex-no-wrap h-screen">
            <Sidebar style ={{position:'absolute;'}} />
            {/* Remove class [ h-64 ] when adding a card block */}
            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
                <div className="w-full h-full rounded border-2 border-gray-300">

                    <h1 className="p-4"> Dear , {user ? user[0].name :''}</h1>
                    <h4 className="p-4">Welcome To the Dashboard</h4>
                </div>
            </div>
        </div>
    );
}

export default Index;
