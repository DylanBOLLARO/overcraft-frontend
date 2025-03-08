import ThemeToggle from './ThemeToggle/theme-toggle'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { PAGE_PATH } from '../../constants/enum'
import { Book, Info } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Image from 'next/image'
import _ from 'lodash'
import { useAuth } from '../providers/context-provider'

export default function Header() {
    const { user } = useAuth()
    const router = useRouter()
    return (
        <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-14 px-4 items-center gap-3">
                <h4
                    className="text-2xl font-semibold tracking-wider opacity-75 ml-5 hover:scale-105 hover:opacity-100 duration-75 cursor-pointer"
                    onClick={() => router.push(PAGE_PATH.HOME)}
                >
                    Overcraft
                </h4>
                <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold opacity-75">
                    beta
                </code>

                <div className="flex items-center ml-auto gap-10">
                    <div className="ml-10 flex items-center space-x-2">
                        {/* <UserNav /> */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Info className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                    <DialogTitle>
                                        <h2 className="pb-2 text-3xl font-semibold first:mt-0 min-w-max">
                                            Help me to develop this website 🥰
                                        </h2>
                                    </DialogTitle>
                                    <DialogDescription>
                                        <h4 className="text-xl font-semibold my-5">
                                            Do not hesitate to contact me on
                                            Discord at{' '}
                                            <span className="text-primary font-bold">
                                                Vipalisk
                                            </span>{' '}
                                            to discuss development and new
                                            functionalities.
                                        </h4>
                                    </DialogDescription>
                                    <DialogDescription className="text-5xl mx-auto">
                                        ༼ つ ◕_◕ ༽つ
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                        <div className="flex items-center gap-3">
                            <p className="lead">
                                {_.isEmpty(user) ? (
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            router.replace('/login')
                                        }}
                                    >
                                        Login
                                    </Button>
                                ) : (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">
                                                <p className="lead">
                                                    {user?.userinfo?.name}
                                                </p>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            asChild
                                        >
                                            <Button
                                                variant="destructive"
                                                onClick={() => {
                                                    router.replace('/logout')
                                                }}
                                            >
                                                Logout
                                            </Button>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </p>
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                                router.push(PAGE_PATH.DOCUMENTATION)
                            }}
                        >
                            <Book className="h-[1.2rem] w-[1.2rem] " />
                        </Button>

                        <ThemeToggle />
                    </div>
                </div>
            </nav>
        </div>
    )
}
