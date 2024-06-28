import React, { useState } from 'react';
import { MDBRow, MDBCol, MDBCard } from 'mdb-react-ui-kit';

function ChatMessage({ message, onSelect }) {
    const { id, content, sender, timestamp, isImage, isFile, fileName } = message;
    const isCurrentUser = sender === 'current_user';
    const [isSelected, setIsSelected] = useState(false);

    const handleCheckboxChange = () => {
        setIsSelected(!isSelected);
        onSelect(id, !isSelected);
    };

    return (
        <MDBRow className={`mb-3 ${isCurrentUser ? 'justify-content-end' : 'justify-content-start'}`}>
            {!isCurrentUser && (
                <MDBCol size="auto">
                    <img
                        src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp`}
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px' }}
                    />
                </MDBCol>
            )}
            <MDBCol size="auto">
                <MDBCard className={`p-2 ${isCurrentUser ? 'bg-primary text-white' : 'bg-light'}`}>
                    <div className="d-flex align-items-center">
                        <input type="checkbox" onChange={handleCheckboxChange} checked={isSelected} />
                        {isImage ? (
                            <img src={content} alt="file" style={{ maxWidth: '100%', borderRadius: '15px' }} />
                        ) : isFile ? (
                            <a href={content} download={fileName} style={{ color: isCurrentUser ? 'white' : 'black' }}>
                                {fileName}
                            </a>
                        ) : (
                            <p className="mb-0">{content}</p>
                        )}
                    </div>
                    <small>{timestamp}</small>
                </MDBCard>
            </MDBCol>
            {isCurrentUser && (
                <MDBCol size="auto">
                    <img
                        src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp`}
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px' }}
                    />
                </MDBCol>
            )}
        </MDBRow>
    );
}

export default ChatMessage;

