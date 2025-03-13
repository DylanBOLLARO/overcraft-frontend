export function TypographyMuted({ str }: any) {
    return <p className="text-sm text-muted-foreground">{str}</p>
}

export function TypographySmall({ str }: any) {
    return <small className="text-sm font-medium leading-none">{str}</small>
}

export function TypographyLarge({ str }: any) {
    return <div className="text-lg font-semibold">{str}</div>
}

export function TypographyLead({ str }: any) {
    return <p className="text-xl text-muted-foreground">{str}</p>
}

export function TypographyP({ str }: any) {
    return <p className="leading-7 [&:not(:first-child)]:mt-6">{str}</p>
}

export function TypographyH4({ str }: any) {
    return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {str}
        </h4>
    )
}

export function TypographyH3({ str }: any) {
    return (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {str}
        </h3>
    )
}

export function TypographyH2({ str }: any) {
    return <h2 className="text-2xl font-semibold">{str}</h2>
}
