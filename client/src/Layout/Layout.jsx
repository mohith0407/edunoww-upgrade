import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import ChatBot from "../Components/Chatbot";
export default function Layout({ children, hideBar, hideNav, hideFooter }) {
  return (
    <>
      <main className="min-h-[100vh] bg-white dark:bg-base-200">
        {/* navbar */}
        {!hideNav && <Navbar />}

        {/* sidebar */}
        <Sidebar hideBar={hideBar} />

        {/* main content */}
        {children}

        {/* footer */}
        {!hideFooter && <Footer />}
        
        {/* chatbot */}
        {!hideNav && !hideBar && <ChatBot />}
      </main>
    </>
  );
}
