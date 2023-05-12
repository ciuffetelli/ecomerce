import React, { ForwardedRef, useImperativeHandle, useRef } from 'react';

import { AiOutlineClose } from 'react-icons/ai';

export type SideModalElement = {
    show: () => void
    hide: () => void
}

type SideModalProps = {
    forwardRef: ForwardedRef<SideModalElement>
    children: React.ReactNode
}
export function SideModal(props: SideModalProps) {

    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleShow = () => {
        containerRef.current?.classList.remove('hidden');
        containerRef.current?.classList.add('animate-appear');

        setTimeout(() => {
            contentRef.current?.classList.add('animate-slide-right-show');
        }, 100);        
    }

    const handleHide = () => {
        containerRef.current?.classList.remove('animate-appear');
        contentRef.current?.classList.remove('animate-slide-right-show');

        setTimeout(() => {
            containerRef.current?.classList.add('hidden');
        }, 500);        
    }

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    }

    useImperativeHandle(props.forwardRef, () => ({
        show: () => handleShow(),
        hide: () => handleHide()
    }))
    return (
        <div ref={containerRef} className="hidden absolute top-0 left-0 z-50 w-screen h-screen font-Rajdhani bg-zinc-900/50 dark:bg-white/50 backdrop-blur duration-global" onClick={handleHide}>
            <div className="w-full h-full max-w-fit ml-auto bg-neutral-50 dark:bg-zinc-900 text-gray-900 dark:text-neutral-50">
                <div ref={contentRef} className="h-full animate-slide-right duration-global">
                    <div className="relative flex flex-col w-screen max-w-sm h-full justify-between" onClick={handleContentClick}>
                        <div className="absolute flex top-0 left-0 z-10 w-full pl-4 pr-4 h-8 items-center text-xl bg-neutral-50 dark:bg-zinc-900">
                            <AiOutlineClose className="ml-auto cursor-pointer" onClick={handleHide} />
                        </div>
                        <div className="flex flex-col flex-1 gap-4 p-2 pt-10 bg-zinc-900/5 dark:bg-white/5 overflow-y-auto"> 
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}