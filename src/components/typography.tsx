interface TypographyProps {
    str: string
}

export function TypographyMuted({ str }: TypographyProps) {
    return <p className="text-sm text-muted-foreground">{str}</p>
}

export function TypographySmall({ str }: TypographyProps) {
    return <small className="text-sm font-medium leading-none">{str}</small>
}

export function TypographyLarge({ str }: TypographyProps) {
    return <div className="text-lg font-semibold">{str}</div>
}

export function TypographyLead({ str }: TypographyProps) {
    return <p className="text-xl text-muted-foreground">{str}</p>
}

export function TypographyP({ str }: TypographyProps) {
    return <p className="leading-7 not-first:mt-6">{str}</p>
}

export function TypographyH4({ str }: TypographyProps) {
    return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {str}
        </h4>
    )
}

export function TypographyH3({ str }: TypographyProps) {
    return (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {str}
        </h3>
    )
}

export function TypographyH2({ str }: TypographyProps) {
    return <h2 className="text-2xl font-semibold">{str}</h2>
}
