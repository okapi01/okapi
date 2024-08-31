import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Outlet, useLocation } from "react-router-dom";
import "../App.css";
import "../fire.scss";
import { AnimatePresence } from "framer-motion";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { UserProvider } from "../context/userContext";

// Lazy load the Footer component
const Footer = lazy(() => import("../Components/Footer"));

const tele = window.Telegram.WebApp;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const scrollableEl = useRef(null);
  
  useEffect(() => {
    // Initialize Telegram WebApp and setup feedback
    tele.ready();
    tele.expand();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    // Set Telegram WebApp header color
    window.Telegram.WebApp.setHeaderColor('#1b1b1b'); 

    // Haptic feedback
    if (tele.HapticFeedback) {
      tele.HapticFeedback.impactOccurred("medium");
    }
    if (navigator.vibrate) {
      navigator.vibrate(100); // Vibrate for 100ms
    }

    // Handle touch events
    const isDashboardRoute = location.pathname.startsWith('/dashboard');
    if (!isDashboardRoute) {
      document.body.style.overflowY = 'hidden';
      document.body.style.marginTop = '100px'; // Overflow value
      document.body.style.height = `${window.innerHeight + 100}px`;
      document.body.style.paddingBottom = '100px'; // Overflow value
      window.scrollTo(0, 100); // Overflow value
    }

    let ts;

    const onTouchStart = (e) => {
      ts = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      const el = scrollableEl.current;
      if (el) {
        const scroll = el.scrollTop;
        const te = e.changedTouches[0].clientY;
        if (scroll <= 0 && ts < te) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    };

    const onTouchMoveWithException = (e) => {
      const target = e.target.closest('#refer');
      if (!target) {
        onTouchMove(e);
      }
    };

    document.documentElement.addEventListener('touchstart', onTouchStart, { passive: false });
    document.documentElement.addEventListener('touchmove', onTouchMoveWithException, { passive: false });

    return () => {
      document.documentElement.removeEventListener('touchstart', onTouchStart);
      document.documentElement.removeEventListener('touchmove', onTouchMoveWithException);
    };
  }, [location.pathname]);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-center">
          <div className="flex flex-col pt-3 space-y-3 w-full">
            <TonConnectUIProvider manifestUrl="YOUR BOT APP URL/tonconnect-manifest.json">
              <UserProvider>
                <AnimatePresence mode="wait">
                  <Outlet />
                  <div id="footermain" className={`${loading ? 'invisible' : 'visible'} z-30 flex flex-col fixed bottom-0 py-6 left-0 right-0 justify-center items-center px-3`}>
                    <Suspense fallback={<div>Loading Footer...</div>}>
                      <Footer />
                    </Suspense>
                    <div className="bg-[#000] z-20 h-[67px] w-full fixed bottom-0 left-0 right-0"></div>
                  </div>
                </AnimatePresence>
              </UserProvider>
            </TonConnectUIProvider>
            <Analytics />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;