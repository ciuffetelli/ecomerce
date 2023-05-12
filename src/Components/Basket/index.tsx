import React, { useRef, useImperativeHandle } from 'react';
import Link from 'next/link';
import { Image } from '@/Components/Image';

import { useApp } from '@/hooks/useApp';

import { AiOutlineDelete } from 'react-icons/ai';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';

import { SideModal, SideModalElement } from '../Modal/SideModal';
import { Button } from "@/Components/Button";

export type BasketElement = SideModalElement

type BasketProps = {
    forwardRef: React.ForwardedRef<BasketElement>
}
export function Basket(props: BasketProps) {

    const app = useApp();
    const basket = app.basket;

    const sideModalRef = useRef<SideModalElement>(null);

    const handleHide = () => {
        sideModalRef.current?.hide();
    }

    const handleRemoveItem = () => {
    }

    useImperativeHandle(props.forwardRef, () => ({
        show: () => sideModalRef.current?.show(),
        hide: () => sideModalRef.current?.hide()
    }))
    return (
        <SideModal forwardRef={sideModalRef}>
            { basket.items.map((item, key) => (
                <div key={key} className="flex justify-between gap-2 text-sm md:text-base overflow-y-scroll">
                    <div className="relative w-20 h-24 bg-neutral-200/50 rounded-md overflow-hidden">
                        <Image src={item.image ? item.image : "/Product_Images_Coming_Soon.webp"} alt={item.name} fill />
                    </div>
                    <div className="flex flex-col flex-1 justify-evenly">
                        <strong>{ item.name }</strong>
                        <div className="">&pound; { item.price.toFixed(2) }</div>
                    </div>
                    <div className="flex flex-col w-16 scale-75 justify-center items-center">
                        <Button Icon={IoIosAdd} action={handleRemoveItem} />
                            <div className="w-16 text-center">{ item.quantity }</div>
                            <Button Icon={IoIosRemove} action={handleRemoveItem} />
                    </div>
                    <div className="flex justify-center items-center">
                        <Button Icon={AiOutlineDelete} action={handleRemoveItem} />
                    </div>
                </div>
            ))}

            <div className="flex flex-col p-2 gap-2 mt-auto border-t-2 border-t-slate-800">
                <div className="flex justify-between">
                    Total:
                    <span>&pound; { Math.round(basket.total) }</span>
                </div>                 

                <Button title="Continue Shopping" action={handleHide} className="bg-zinc-900/5 dark:bg-white/5" />
                <Button Icon={MdOutlineShoppingCartCheckout} action={handleHide} className="bg-green-700 text-white text-3xl">
                    <span className="text-lg">Checkout</span>
                </Button>
            </div> 
        </SideModal>
    )
}