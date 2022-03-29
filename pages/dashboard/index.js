import React from "react";
import { Sidebar} from '../../components'
function Index() {
    return (
        <div className="flex flex-no-wrap h-screen">
            <Sidebar />
            {/* Remove class [ h-64 ] when adding a card block */}
            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
                <div className="w-full h-full rounded border-dashed border-2 border-gray-300">{/* Place your content here */}</div>
            </div>
        </div>
    );
}

export default Index;
