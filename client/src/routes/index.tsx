import axiosInstance from '@/utils/axios';
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function IndexPage() {
  const userObject=useUser();

   useEffect(()=>{
   if(!userObject.isLoaded){
     return;
   }
   async function registerUser(){
    
    if(!userObject.user){
      return;
    }
    try {
      const response=await axiosInstance.post('/api/v1/user/register', {
        email: userObject.user.emailAddresses[0].emailAddress,
        name: userObject.user.firstName + ' ' + userObject.user.lastName,
        clerkId: userObject.user.id,
      })

      if(response.data.success){
        console.log(response.data, "DATA>>>>")
      } 
  
    } catch (error) {
      console.log(error)
    }
   }

    registerUser();
    
   }, [])
  return (
    <header>
      <h1>This is the index page</h1>
      <div>
        <ul>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}