import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const handleCloseChat = () => {
    setSelectedConversation(null);
  };

  return (
    <div
      className="md:min-w-[350px] flex flex-col border border-red-500"
      style={{
        minWidth: "300px",
        height: "80vh", // Fixed height
        maxWidth: "100%",
      }}
    >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2 border border-blue-500 flex items-center justify-between">
            <div className="flex items-center">
              <span className="label-text">To: </span>
              <span className="text-gray-900 font-bold truncate max-w-[80%] ml-2">
                {selectedConversation.fullName}
              </span>
            </div>
            <button
              onClick={handleCloseChat}
              className="text-red-500 font-bold"
            >
              X
            </button>
          </div>

          {/* Messages list with fixed height and scrollbar */}
          <div className="flex-1 overflow-auto">
            <Messages />
          </div>

          {/* MessageInput with fixed height */}
          <div className="h-20">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName}</p>
        <p>Select a doctor's chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
