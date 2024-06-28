import React, { useState } from 'react';
import ChatPanel from './ChatPanel';
import Sidebar from './Sidebar';

function LiveChat({ guests, username }) {
    const [activeChat, setActiveChat] = useState(null);

    const handleUserClick = (guest) => {
        if (activeChat === guest.username) {
            return;
        }
        setActiveChat(guest.username);
    };

    const handleCloseChat = () => {
        setActiveChat(null);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <Sidebar guests={guests} onUserClick={handleUserClick} username={username} />
                </div>
                <div className="col-md-8">
                    {activeChat && (
                        <ChatPanel
                            key={activeChat}
                            username={activeChat}
                            onClose={handleCloseChat}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default LiveChat;
