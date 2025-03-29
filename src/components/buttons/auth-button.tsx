'use client'

import { LogOut, User, ChevronDown, Settings } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'

export default function AuthButton({ user }: any) {
    const router = useRouter()

    if (!user) {
        return (
            <Button onClick={() => router.replace('/auth/login')}>
                Sign in
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-2 py-1 h-auto focus-visible:ring-0 "
                >
                    <span className="font-medium text-sm hidden sm:inline p-2">
                        {user.name}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground sm:hidden">
                    {user.name}
                </div>
                <div className="px-2 py-1 text-xs text-muted-foreground sm:hidden">
                    {user.email}
                </div>
                <DropdownMenuSeparator className="sm:hidden" />
                <DropdownMenuItem asChild>
                    <Link
                        href="/profile"
                        className="cursor-pointer flex items-center gap-2 h-10"
                    >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        router.replace('/auth/logout')
                    }}
                    className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2 h-10"
                >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
