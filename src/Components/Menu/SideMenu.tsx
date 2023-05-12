import React, { useRef, useImperativeHandle } from 'react';
import Link from 'next/link';
import { Image } from '@/Components/Image';

import { useApp } from '@/hooks/useApp';

import { SideModal, SideModalElement } from '../Modal/SideModal';
import { ButtonDark } from '../ButtonDark';

export type SideMenuElement = SideModalElement

type SideMenuProps = {
    forwardRef: React.ForwardedRef<SideMenuElement>
}
export function SideMenu(props: SideMenuProps) {

    const app = useApp();
    const menu = app.menu;

    const sideModalRef = useRef<SideModalElement>(null);

    const handleMenuClick = (index: number) => {
        document.querySelector(`[data-children="${index}"]`)?.classList.toggle('animate-slide-down');
    }    

    useImperativeHandle(props.forwardRef, () => ({
        show: () => sideModalRef.current?.show(),
        hide: () => sideModalRef.current?.hide()
    }))
    return (
        <SideModal forwardRef={sideModalRef}>
            <div className='absolute top-2 z-10'>
                <ButtonDark/>
            </div>
            <div className="w-full h-24">
                <Image src="/NextEcomerceLogo.svg" alt="Next Ecomerce Logo" fill />
            </div>

            <ul className="text-lg">
                { menu.map((item, index) => (
                    <li key={index} className="cursor-pointer" onClick={() => handleMenuClick(index)}>
                        { item.children ? item.title : <Link href={item.url ?? '#'}>{item.title}</Link>}

                        <div className="animate-slide-up" data-children={index}>

                            <ul className="ml-4">
                                { item.children && item.children.map((subItem, subIndex) => (
                                    <li key={subIndex}>{subItem.title}</li>
                                ))}
                            </ul>                                            
                        </div>
                    </li>
                ))}
            </ul>            
        </SideModal>
    )
}