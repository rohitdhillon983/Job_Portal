import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '.././utils/constant';
import { setLoading, setUser } from '.././redux/authSlice';
import Footer from './shared/Footer';


const ResetPassword = () => {
    const params = useParams();
    const Token = params.token;
    const [input , setInput]= useState({
        password:'',
        confirmPassword:'',
        token:Token
    })
    console.log(input)
    const { loading,user } = useSelector(store => store.auth);
        // const user = false
        const navigate = useNavigate();
        const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    
    const submitHandler=async()=>{
        dispatch(setLoading(true))
       try {
              const res = await axios.post(`${USER_API_END_POINT}/reset-password`, {input},{
                headers:{
                     'Content-Type':'application/json'
                },
                withCredentials:true
              });
              if(res.data.success){
                toast.success(res.data.message)
                dispatch(setLoading(false))
                navigate('/login')
              }
        
       } catch (error) {
           toast.error(error.response.data.message)
        
       }
    }
  return (
    <div>
        <Navbar></Navbar>
        <div class=" bg-gray-100 dark:bg-black text-gray-900 flex justify-center">
    <div class="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-[#4444] shadow sm:rounded-lg flex justify-center flex-1 overflow-hidden">
        <div class="lg:w-1/2 xl:w-5/12 px-6 sm:p-12">
            <div class="mt-12 flex flex-col items-center">
                <div class="w-full flex-1 mt-8">
                

                    <div class="mx-auto max-w-xs">
                        
                        <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border dark:bg-[#222] border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="password" placeholder="Password" name='password' value={input.password} onChange={changeEventHandler}/>
                        
                        <input
                            class="w-full mt-7 px-8 py-4 rounded-lg font-medium bg-gray-100 border dark:bg-[#222] border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="password" placeholder="Confirm Password" name='confirmPassword' value={input.confirmPassword} onChange={changeEventHandler}/>
                        
                        
                         <button
                            class="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" onClick={submitHandler}>
                            
                            <span class="ml-">
                                reset Password
                            </span>
                        </button>
                        <p class="mt-6 text-xs text-gray-600 text-center">
                            I agree to abide by Cartesian Kinetics
                            <a href="#" class="border-b border-gray-500 border-dotted">
                                Terms of Service
                            </a>
                            and its
                            <a href="#" class="border-b border-gray-500 border-dotted">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-1 overflow-hidden text-center lg:flex justify-center items-center">
            <img class="w-full h-[70%] mix-blend-multiply" src="https://thumbs.dreamstime.com/b/wrong-password-isolated-cartoon-vector-illustrations-confused-man-forget-laptop-access-blocked-cybersecurity-industry-262757564.jpg" alt="" />
        </div>
    </div>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default ResetPassword
