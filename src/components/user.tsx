"use client"

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react";


function User({img}: {img: string}) {

    const signOutHandler = () => {
        signOut({ callbackUrl: '/' })
    }
    
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={img} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOutHandler} className="cursor-pointer">Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
     );
}

export default User;