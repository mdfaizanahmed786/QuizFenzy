import { useAuth } from "@clerk/clerk-react"
import { Link } from "react-router-dom"

const DashboardPage = () => {
  const { getToken } = useAuth()


  async function callProtectedAuthRequired() {
    const token = await getToken()
    const res = await fetch('http://localhost:3000/api/v1/quiz', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await res.json()
    console.log(json)
  }

  return (
    <>
    <div>DashboardPage</div>
    <Link to="/dashboard/quiz/1">Create Quiz</Link>
    <button onClick={callProtectedAuthRequired}>GET user</button>
    </>
  )
}

export default DashboardPage