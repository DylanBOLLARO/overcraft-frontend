import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog'
import { Button, buttonVariants } from './ui/button'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PAGE_PATH } from '../constants/enum'
import { axiosInstance } from '@/lib/networking'
import { CustomButton } from './ui-customs/button'

export const DialogDeleteBuild = ({ selectedUserBuildId }: any) => {
    const router = useRouter()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <CustomButton
                    className={'text-destructive hover:text-destructive'}
                >
                    <Trash2 />
                    Delete
                </CustomButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure ?</DialogTitle>
                    <DialogDescription>
                        Do you really want to delete the build order? This
                        action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        type="submit"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={async () => {
                            await axiosInstance.delete(
                                `builds/${selectedUserBuildId}`
                            )
                            router.push(PAGE_PATH.DASHBOARD)
                        }}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
