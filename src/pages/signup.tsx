import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NavBar } from "@/components/ui/navbar"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { CloudRainWind } from "lucide-react"
import { cwd } from "process"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Signup() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: ""
    })

    const handleSignup = async () => {
        try {
            const res = await api.post(`/users/signup`, user)
            return res.data
        } catch (error) {
            console.error(error)
            return Promise.reject(new Error("Something went wrong"))
        }
    }


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, valueAsNumber } = e.target

        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const response = await handleSignup()
        if (response) {
            navigate("/login")
        }

        }

    return (
        <>
        <NavBar/>
            <h2 className="md:font-bold mt-40" >SIGNUP</h2>
            <form action="POST" className="w-full md:w-1/3 mx-auto" onSubmit={handleSubmit}>
                <Input
                    name="firstName"
                    className="mt-4"
                    type="text"
                    placeholder="First Name"
                    onChange={handleChange}
                />
                <Input
                    name="lastName"
                    className="mt-4"
                    type="text"
                    placeholder="Last Name"
                    onChange={handleChange}
                />
                <Input
                    name="email"
                    className="mt-4"
                    type="text"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <Input
                    name="password"
                    type="password"
                    className="mt-4"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <Input
                    name="phoneNumber"
                    type="text"
                    className="mt-4"
                    placeholder="Phone Number"
                    onChange={handleChange}
                />
                <div className="flex justify-between flex-col">
                    <Button className="mt-4 md:font-bold">Signup</Button>
                    <Button variant="link" className="mt-4 md:font-bold">
                        <Link to="/login">Have an account already?</Link>
                    </Button>
                </div>
            </form>
        </>
    )
}
