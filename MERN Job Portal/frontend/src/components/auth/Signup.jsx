import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { RadioGroup } from '../ui/radio-group'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '../../utils/constant'
import axios from 'axios'
import { setLoading } from '../../redux/authSlice'
import { Button } from '../ui/button'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
});
const {loading,user} = useSelector(store=>store.auth);
// const user = false
const dispatch = useDispatch();
const navigate = useNavigate();

  const changeEventHandler=(e)=>{
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();    //formdata object
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
        formData.append("file", input.file);
    }

    try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
            headers: { 'Content-Type': "multipart/form-data" },
            withCredentials: true,
        });
        if (res.data.success) {
            navigate("/login");
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    } finally{
        dispatch(setLoading(false));
    }
  }

  useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])
  return (
    <div>
    <Navbar></Navbar>
  <div class="min-h-screen bg-gray-100 dark:bg-[#111] text-gray-900 flex justify-center">
<div class="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-[#4444] shadow sm:rounded-lg flex justify-center flex-1 overflow-hidden">
    <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div class="mt-12 flex flex-col items-center">
            <div class="w-full flex-1 mt-8">
                <div class="flex flex-col items-center">
                    <button
                        class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 dark:bg-[#555] bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                        <div class="bg-white p-2 rounded-full">
                            <svg class="w-4" viewBox="0 0 533.5 544.3">
                                <path
                                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                    fill="#4285f4" />
                                <path
                                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                    fill="#34a853" />
                                <path
                                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                    fill="#fbbc04" />
                                <path
                                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                    fill="#ea4335" />
                            </svg>
                        </div>
                        <span class="ml-4">
                            Sign up with Google
                        </span>
                    </button>

                </div>

                <div class="my-12 border-b text-center">
                    <div
                        class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium dark:bg-transparent bg-white transform translate-y-1/2">
                        Or sign up with Cartesian E-mail
                    </div>
                </div>

                <div class="mx-auto max-w-xs">
                    <input
                        class="w-full px-8 py-4 rounded-lg font-medium dark:bg-[#222] bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                        type="text" placeholder="Full Name" name='fullname' value={input.fullname} onChange={changeEventHandler}/>
                    <input
                        class="w-full px-8 py-4 rounded-lg font-medium dark:bg-[#222] bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="email" placeholder="Email" name='email' value={input.email} onChange={changeEventHandler}/>
                    <input
                        class="w-full px-8 py-4 rounded-lg font-medium dark:bg-[#222] bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="number" placeholder="Phone Number" name='phoneNumber' value={input.phoneNumber} onChange={changeEventHandler}/>
                    <input
                        class="w-full px-8 py-4 rounded-lg font-medium dark:bg-[#222] bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password" placeholder="Password" name='password' value={input.password} onChange={changeEventHandler}/>
                     <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1" className="dark:text-[#999]">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2" className="dark:text-[#999]">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className='flex items-center gap-2'>
                    <Label className="dark:text-[#999]">Profile</Label>
                            <Input
                                accept="image/*"
                                placeholder=""
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    {loading ? <Button class="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">Please wait</Button> : 
                        <button
                            class="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" onClick={submitHandler}>
                                                <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                            <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span class="ml-">
                                Sign Up
                            </span>
                        </button> }

                    <p className='text-[13px] mt-1 dark:text-[#999]'>Already have an account? <Link to={"/login"} className='text-blue-900 dark:text-[#8280f5]'>Login</Link></p>

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
        <img class="w-full h-[70%] mix-blend-multiply" src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-online-registration_516790-2402.jpg" alt="" />
    </div>
</div>
    </div>
</div>
  )
}

export default Signup
