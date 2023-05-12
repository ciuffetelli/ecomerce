import Link from "next/link"
import { IconType } from "react-icons"

type ButtonProps = {
    title?: string
    Icon?: IconType
    action: string | (() => void)
    className?: string
    children?: React.ReactNode
}
export function Button(props: ButtonProps) {

    const handleClick = () => {
        if(typeof props.action === 'function') return props.action();
    }

    function ButtonContent() {
        return (
            <div onClick={handleClick} className={`flex p-2 gap-2 min-w-16 min-h-20 items-center justify-between text-lg hover:brightness-125 border border-slate-600/10 hover:border-slate-600 rounded-xl cursor-pointer duration-global ${props.className ?? ''}`}>
                { props.Icon && <props.Icon className={``}  /> }
                { props.title && <span className="text-center flex-1">{ props.title }</span> }
                { props.children && <span className="text-center flex-1">{ props.children }</span> }
            </div>
        )
    }

    return typeof props.action === 'string' ? (<Link href={props.action}><ButtonContent /></Link>) : <ButtonContent />
}