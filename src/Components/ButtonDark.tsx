import { useEffect, useState } from 'react'

import { BsMoonStars } from 'react-icons/bs'
import { CiLight } from 'react-icons/ci'

type ButtonDarkProps = {
    className?: string
}
export function ButtonDark(props: ButtonDarkProps) {

    const [darkMode, setDarkMode] = useState(false)

    const handleDarkModeClick = () => {
        setDarkMode(darkMode => !darkMode)

        localStorage.theme = !darkMode ? 'dark' : 'light';
    }

    useEffect(() => {
        if (localStorage.theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    useEffect(() => {
        
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true)
        } else {
            setDarkMode(false)
        }
    }, [])
    return (
        <span onClick={handleDarkModeClick} className={`flex relative w-5 h-5 cursor-pointer ${props.className ?? ''}`}>
            <BsMoonStars className="text-l absolute opacity-0 dark:opacity-100 ease-in-out duration-500" />
            <CiLight className="text-l absolute opacity-100 dark:opacity-0 ease-in-out duration-500" />
        </span>
    )
}