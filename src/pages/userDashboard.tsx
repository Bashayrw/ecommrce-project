import api from "@/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { User } from "@/types"
import { Link } from "react-router-dom"
import { BellIcon, Package2Icon, PackageIcon, Table, UsersIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table"

export function UserDashboard() {
  const queryClient = useQueryClient()
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const getUsers = async () => {
    try {
      const res = await api.get("/users")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const postUser = async () => {
    try {
      const res = await api.post("/users", user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      const res = await api.delete(`/users/${userId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId)
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postUser()
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }

  const {
    isPending: userPending,
    data: users,
    error: userError
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" to="#">
            <Package2Icon className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
          <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              to="#"
            >
              <PackageIcon className="h-4 w-4" />
              Products
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to="#"
            >
              <UsersIcon className="h-4 w-4" />
              Users
            </Link>
          </nav>
        </div>
      </div>
    </div>
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <Link className="lg:hidden" to="#">
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Link>
        <div className="w-full flex-1">
          <Button className="ml-auto" size="sm">
            Add Product
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
              size="icon"
              variant="ghost"
            >
              <img
                alt="Avatar"
                className="rounded-full"
                height="32"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="border shadow-sm rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead className="max-w-[150px]">Name</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Inventory</TableHead>
                <TableHead>Vendor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">Glimmer Lamps</TableCell>
                <TableCell className="hidden md:table-cell">In Production</TableCell>
                <TableCell>500 in stock</TableCell>
                <TableCell className="hidden md:table-cell">Luminance Creations</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">Aqua Filters</TableCell>
                <TableCell className="hidden md:table-cell">Available for Order</TableCell>
                <TableCell>750 in stock</TableCell>
                <TableCell className="hidden md:table-cell">HydraClean Solutions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">Eco Planters</TableCell>
                <TableCell className="hidden md:table-cell">Backordered</TableCell>
                <TableCell>300 in stock</TableCell>
                <TableCell className="hidden md:table-cell">GreenGrowth Designers</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">Zest Juicers</TableCell>
                <TableCell className="hidden md:table-cell">Newly Launched</TableCell>
                <TableCell>1000 in stock</TableCell>
                <TableCell className="hidden md:table-cell">FreshTech Appliances</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">Flexi Wearables</TableCell>
                <TableCell className="hidden md:table-cell">Selling Fast</TableCell>
                <TableCell>200 in stock</TableCell>
                <TableCell className="hidden md:table-cell">Vitality Gear Co.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  </div>
  )
}
