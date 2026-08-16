import { useEffect } from "react";
import { useRouter } from "next/router";

const ScrollToTop = () => {
    const router = useRouter();
    const pathname = router.pathname;
    const hash = router.asPath.includes('#') ? router.asPath.slice(router.asPath.indexOf('#')) : '';

    useEffect(() => {
        // If there's a hash (anchor link), let the anchor scroll logic handle it
        if (!hash) {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
