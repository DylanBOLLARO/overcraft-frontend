import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

export default function Page() {
    return (
        <div className="flex flex-col gap-5 text-lg">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <p className="text-2xl">Why Overcraft?</p>
                    </CardTitle>
                </CardHeader>
            </Card>
            <p>
                {`I’ve often taken long breaks from StarCraft 2 sometimes for
                months or even years and each time, I found myself forgetting
                all the build orders. To get back into the game, I spent hours
                watching Twitch streams and replays, searching for builds that
                suited my playstyle. When I found one I liked, I would grab a
                piece of paper and jot down the key steps, then memorize them to
                execute them flawlessly in-game.`}
            </p>
            <p>
                {`That’s when I had an idea: what if I could share this learning
                process with others? I wanted to create an application where
                players could not only create and organize their build orders
                but also share them with the community. And that’s how Overcraft
                was born a platform designed to help StarCraft 2 players learn,
                improve, and strategize more efficiently.`}
            </p>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <p className="text-2xl">Documentation</p>
                    </CardTitle>
                </CardHeader>
            </Card>
            <p>
                Overcraft helps you master StarCraft 2 build orders through
                hands-on practice, making it easier to learn, refine, and
                execute strategies effectively.
            </p>

            <div className="flex gap-10 items-center">
                <div className="w-[600px] flex-1">
                    <AspectRatio
                        ratio={16 / 9}
                        className="border rounded-2xl overflow-hidden"
                    >
                        <Image
                            src="/oc_main_page.png"
                            alt="Image"
                            className="rounded-md object-cover"
                            width={1000}
                            height={1000}
                        />
                    </AspectRatio>
                </div>
                <p className="flex-1">
                    The main page displays all build orders from all users who
                    have the "public" status.
                </p>
            </div>
            <div className="flex gap-10 items-center">
                <div className="w-[600px] flex-1">
                    <AspectRatio
                        ratio={16 / 9}
                        className="border rounded-2xl overflow-hidden"
                    >
                        <Image
                            src="/oc_build_page.png"
                            alt="Image"
                            className="rounded-md object-cover"
                            width={1000}
                            height={1000}
                        />
                    </AspectRatio>
                </div>
                <p className="flex-1">
                    When you click on a build, you have all the steps to follow
                    displayed.
                </p>
            </div>
            <div className="flex gap-10 items-center">
                <div className="w-[600px] flex-1">
                    <AspectRatio
                        ratio={16 / 9}
                        className="border rounded-2xl overflow-hidden"
                    >
                        <Image
                            src="/oc_play_page.png"
                            alt="Image"
                            className="rounded-md object-cover"
                            width={1000}
                            height={1000}
                        />
                    </AspectRatio>
                </div>
                <p className="flex-1">
                    For connected users, you have the possibility to "play" the
                    build orders, this has the effect of triggering a timer and
                    scrolling through the steps, no need to alt tab and scroll
                    down
                </p>
            </div>
            <div className="flex gap-10 items-center">
                <div className="w-[600px] flex-1">
                    <AspectRatio
                        ratio={16 / 9}
                        className="border rounded-2xl overflow-hidden"
                    >
                        <Image
                            src="/oc_edit_page.png"
                            alt="Image"
                            className="rounded-md object-cover"
                            width={1000}
                            height={1000}
                        />
                    </AspectRatio>
                </div>
                <p className="flex-1">
                    There is an edit page that allows modification of build
                    steps and properties
                </p>
            </div>
            <div className="flex gap-10 items-center">
                <div className="w-[600px] flex-1">
                    <AspectRatio
                        ratio={16 / 9}
                        className="border rounded-2xl overflow-hidden"
                    >
                        <Image
                            src="/oc_pref_page.png"
                            alt="Image"
                            className="rounded-md object-cover"
                            width={1000}
                            height={1000}
                        />
                    </AspectRatio>
                </div>
                <p className="flex-1">
                    Finally, you can choose the display colors in your account
                    preferences
                </p>
            </div>
        </div>
    )
}
