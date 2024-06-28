import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import emojiList from './emojiList.json';

function ChatPanel({ username, onClose }) {
    const initializeMessages = () => {
        const savedMessages = JSON.parse(localStorage.getItem(`messages_${username}`)) || [];
        return savedMessages;
    };

    const [messages, setMessages] = useState(initializeMessages());
    const [messageContent, setMessageContent] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [file, setFile] = useState(null);
    const [selectedMessages, setSelectedMessages] = useState([]);

    useEffect(() => {
        localStorage.setItem(`messages_${username}`, JSON.stringify(messages));
    }, [messages, username]);

    const handleSendMessage = () => {
        if (messageContent.trim() === '' && !file) {
            return;
        }

        const newMessage = {
            id: messages.length + 1,
            content: file ? URL.createObjectURL(file) : messageContent,
            fileName: file ? file.name : null,
            sender: 'current_user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isImage: file ? file.type.startsWith('image/') : false,
            isFile: !!file,
        };

        setMessages([...messages, newMessage]);
        setMessageContent('');
        setFile(null);
        setShowEmojiPicker(false);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const addEmoji = (emoji) => {
        setMessageContent(messageContent + emoji);
        setShowEmojiPicker(false);
    };

    const toggleSelectMessage = (id) => {
        if (selectedMessages.includes(id)) {
            setSelectedMessages(selectedMessages.filter(msgId => msgId !== id));
        } else {
            setSelectedMessages([...selectedMessages, id]);
        }
    };

    const handleDeleteSelectedMessages = () => {
        const updatedMessages = messages.filter(message => !selectedMessages.includes(message.id));
        setMessages(updatedMessages);
        setSelectedMessages([]);
    };

    return (
        <div className="container-fluid py-4">
            <div className="row justify-content-center">
                <div className="col-md-12 col-lg-12">
                    <div className="card" style={{ borderRadius: '15px' }}>
                        <div className="card-header d-flex justify-content-between align-items-center p-3 bg-primary text-white border-bottom-0"
                            style={{
                                borderTopLeftRadius: '15px',
                                borderTopRightRadius: '15px',
                                backgroundColor: '#6EC1E4',
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <i className="fas fa-angle-left"></i>
                                <p className="mb- fw-bold mx-2">Live chat - {username}</p>
                            </div>
                            <button className="btn-close" onClick={onClose}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="card-body" style={{ overflowY: 'scroll', height: '600px' }}>
                            {messages.map((message) => (
                                <ChatMessage
                                    key={message.id}
                                    message={message}
                                    onSelect={() => toggleSelectMessage(message.id)}
                                    isSelected={selectedMessages.includes(message.id)}
                                />
                            ))}
                        </div>

                        <div className="card-body d-flex align-items-center" style={{ backgroundColor: '#FFFFFF' }}>
                            <button className="btn btn-secondary me-2" onClick={() => document.getElementById('fileInput').click()}>
                                +
                            </button>
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <input
                                type="text"
                                id="messageInput"
                                className="form-control flex-grow-1 me-2"
                                placeholder="Type your message"
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                😊
                            </button>
                            <button className="btn btn-primary" onClick={handleSendMessage} style={{ marginLeft: '10px' }}>
                                Send
                            </button>
                            <button className="btn btn-danger ms-2" onClick={handleDeleteSelectedMessages} disabled={selectedMessages.length === 0}>
                                Delete Selected
                            </button>
                        </div>

                        {showEmojiPicker && (
                            <div style={{ position: 'absolute', bottom: '60px', right: '20px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', zIndex: 1000 }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', maxHeight: '200px', overflowY: 'auto' }}>
                                    {emojiList.map((emoji, index) => (
                                        <button
                                            key={index}
                                            onClick={() => addEmoji(emoji)}
                                            style={{ background: 'none', border: 'none', fontSize: '24px', margin: '5px', cursor: 'pointer' }}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPanel;
