"use client"
import Link from "@node_modules/next/link";
import  Image from "@node_modules/next/image";
import {useState,useEffect, use} from "react";
import {signIn,signOut,useSession, getProviders} from "next-auth/react"
function nav() {
    const isUserLOggedIn = true;
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setProviders();
    },[])
    

  return (
    <nav className="flex justify-between items-center mb-16">
        <Link href="/" className="flex gap-2">
            <Image src="/assets/images/logo.svg" alt="logo" width={30} height={30} className="object-contain"/>
            <p className="logo_text">Prompt It</p>
        </Link>
        <div className="sm:flex hidden">
            {isUserLOggedIn ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">
                        Create Post
                    </Link>
                    <button type="button" onClick={signOut} className="outline_btn">
                        Sign Out
                    </button>
                    <Link href="/profile">
                        <Image src="/assets/images/logo.svg" alt="profile" width={37} height={37} className="rounded-full"/>
                    </Link>
                </div>
            ) : (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                            Sign In
                        </button>
                    ))}
                </>
            )}
        </div>
        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {isUserLOggedIn ? (
                <div className="flex">
                    <Image src="/assets/images/logo.svg" alt="profile" width={37} height={37} className="rounded-full" onClick={() => setToggleDropdown((prev) => !prev)}/>
                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                My Profile
                            </Link>
                            <Link href="/create-propmt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                Create prompt
                            </Link>
                            <button type="button" onClick={() => {setToggleDropdown(false);signOut()}} className="mt-5 w-full black_btn">
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>{providers && Object.values(providers).map((provider) => (
                    <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                        Sign In
                    </button>                   
                ))}</>
            )}
        </div>

    </nav>
  )
}

export default nav