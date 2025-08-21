'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

const AuthButton = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div className="w-24 h-9 bg-gray-200 animate-pulse rounded-md"></div>;
    }

    if (session) {
        return (
            <div className="flex items-center gap-4">
                <p className="text-white hidden md:block">{session.user?.name}</p>
                <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition-colors">
                    Sign Out
                </button>
            </div>
        );
    }

    return (
        <button onClick={() => signIn('github')} className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors">
            Sign In
        </button>
    );
};

export default AuthButton;