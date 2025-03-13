import { BlurBackgroundColor } from './blur-background-color'

export const BackgroundColors = () => {
    return (
        <>
            <BlurBackgroundColor className={'bg-blue-700'} position={'left'} />
            <BlurBackgroundColor
                className={'bg-indigo-700'}
                position={'right'}
            />
        </>
    )
}
