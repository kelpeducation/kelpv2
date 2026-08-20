'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
    const pathname = usePathname();

    useEffect(() => {
        // If there's a hash (anchor link), let the anchor scroll logic handle it
        if (!window.location.hash) {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;
