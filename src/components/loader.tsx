'use client'

import { Spinner } from './spinner'

export const Loader = () => {
    return (
        <div className="py-10">
            <Spinner size={'large'}>
                <p className="text-xl">Loading...</p>
            </Spinner>
        </div>
    )
}
