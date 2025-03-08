import { Badge } from '../ui/badge'
import { cn } from '@/src/services/utils'
import { formatDistanceToNowStrict } from 'date-fns'

export function CommentItem({
    comment,
    classname,
    showHeader = true,
    highlightCreator = false,
}: any) {
    return (
        <button
            key={comment.id}
            className={cn(
                'flex flex-col flex-1 items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent max-w-full',
                classname
            )}
        >
            {showHeader && (
                <div className="flex w-full flex-col gap-1">
                    <div className="flex items-center">
                        <div className="flex items-center gap-2">
                            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                                {comment.title}
                            </h4>
                        </div>
                        <div
                            className={cn(
                                'ml-auto text-xs text-muted-foreground'
                            )}
                        >
                            {formatDistanceToNowStrict(
                                new Date(comment?.created_at),
                                {
                                    addSuffix: true,
                                }
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className="line-clamp-2 text-sm text-muted-foreground">
                {comment?.content?.substring(0, 300)}
            </div>
            <div className="flex items-center justify-between gap-2 w-full mt-auto">
                <div
                    className={`ml-auto flex items-center gap-2 ${highlightCreator ? 'opacity-100' : 'opacity-50'}`}
                >
                    {comment?.user?.username && (
                        <Badge
                            className="ml-auto"
                            variant={highlightCreator ? 'default' : 'outline'}
                        >
                            by {comment?.user?.username}
                        </Badge>
                    )}
                </div>
            </div>
        </button>
    )
}
