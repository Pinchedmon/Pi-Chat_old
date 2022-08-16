import React, {useEffect, useState} from 'react';
import {ArrowLeftIcon, PencilIcon} from "@heroicons/react/solid";
import CPost from "../../../components/CPost";
import {getMyPosts} from "../../../api/session";
import {useLocation, useNavigate} from "react-router-dom";
import {getUserData} from "../../../api/users";

interface IUser {
    backImg: string
    pathImg: string
    name: string
    username: string
    info: string
}
function UserProfile() {
    const navigate = useNavigate()
    let location = useLocation()
    const [user, setUser] = useState<IUser>( {backImg: '', pathImg:  '', name: '', username: '', info: ''})
    useEffect(() => {
        getUserData(location.pathname.slice(1).toString()).then((res: {data: {0:IUser}}) => {if (res.data[0] !== undefined){setUser(res.data[0])}
        })
    },[])
    return (
        <>
            {user.name !== '' && <div>
            {/* exit */}
                <div className='border-b-2 border-gray-300 p-16px ' onClick={() => navigate('/')}>
                <ArrowLeftIcon className='w-48px text-green-600 rounded-md bg-gray-100 p-6px hover:bg-green-600 hover:text-white' />
                </div>
            {/* profile */}
            {/* background photo */}
                <img className=' h-200px w-full' src={user.backImg} alt='загружается...' />
            {/* icon */}
                <div className='w-full flex mt-16px self-center border-b-2 border-gray-300 pb-16px'>
                <img className=' rounded-xl w-100px ml-16px mr-16px' src={user.pathImg} alt='загружается...' />
                <div className='flex w-full flex-col'>
            {/* naming */}
                <div className='flex items-center align-center w-full  -mt-6px'>
                <div className='font-bold text-2xl'>{user.username}</div>
                <p className='ml-8px font-bold text-md text-gray-500'>@{user.name}</p>
                </div>
                <div>{user.info}</div>
                </div>
                </div>
            {/* posts */}
                <div className='mt-16px'>
                   <CPost getPost={getMyPosts} naming='myPosts' getObject={user.name} />
                </div>
            </div> }
        </>
    );
}

export default UserProfile;