import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown"; 
import { toggleChat, addUserMessage, sendChatMessage } from "../Redux/Slices/ChatbotSlice";
import { BsChatDotsFill, BsX, BsSendFill, BsRobot } from "react-icons/bs";

const ChatBot = () => {
  const dispatch = useDispatch();
  const { messages, isLoading, isOpen } = useSelector((state) => state.chat);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    dispatch(addUserMessage(input));
    dispatch(sendChatMessage(input));
    setInput("");
  };

  return (
    <div className="font-roboto z-[9999]">
      <button
        onClick={() => dispatch(toggleChat())}
        className={`fixed bottom-5 right-5 z-50 h-14 w-14 flex items-center justify-center rounded-full shadow-custom transition-all duration-300 hover:scale-110 
          ${isOpen ? "bg-red-500 rotate-90" : "bg-[#3f355c] hover:bg-[#2d2642]"} text-white`}
      >
        {isOpen ? <BsX size={30} /> : <BsChatDotsFill size={24} />}
      </button>

      {/* --- Chat Window --- */}
      <div
        className={`fixed bottom-[85px] right-5 w-[90%] md:w-[380px] h-[500px] bg-white rounded-2xl shadow-custom overflow-hidden flex flex-col border border-gray-100 transition-all duration-300 origin-bottom-right
          ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-10 pointer-events-none"}`}
      >
        <div className="bg-gray-900 p-4 flex items-center gap-3 shadow-md">
          <div className="bg-gray-800 p-2 rounded-full text-white">
            <BsRobot size={20} />
          </div>
          <div>
            <h3 className="text-white font-medium text-lg tracking-wide">AI Assistant</h3>
            <p className="text-gray-300 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-[#bae716] rounded-full inline-block animate-pulse"></span>
              Online
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
          <div className="text-center text-xs text-gray-400 my-2">Today</div>
          
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 text-sm shadow-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#3f355c] text-white rounded-2xl rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-none"
                }`}
              >
                <ReactMarkdown
                  components={{
                    a: ({ node, ...props }) => {
                      const isInternal = props.href?.startsWith("/");
                      return isInternal ? (
                        <Link
                          to={props.href}
                          className="text-blue-600 font-bold underline hover:text-blue-800"
                        >
                          {props.children}
                        </Link>
                      ) : (
                        <a
                          href={props.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 font-bold underline hover:text-blue-800"
                        >
                          {props.children}
                        </a>
                      );
                    },
                    ul: ({ children }) => <ul className="list-disc ml-4 my-2">{children}</ul>,
                    p: ({ children }) => <p className="mb-1">{children}</p>
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
                {/* ------------------------- */}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center">
                <div className="w-2 h-2 bg-[#3f355c] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#3f355c] rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-[#3f355c] rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-[#3f355c] transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 text-sm focus:outline-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="text-[#3f355c] hover:text-yellow-500 disabled:text-gray-400 transition-colors p-1"
            >
              <BsSendFill size={18} />
            </button>
          </div>
          <div className="text-center mt-1">
             <span className="text-[10px] text-gray-400">Powered by EduNoww</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;