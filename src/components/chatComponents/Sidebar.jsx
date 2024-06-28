import { Container, Col } from 'react-bootstrap';
import NavSidebar from './NavSidebar';
import Contacts from './Contacts';
import SearchBar from './SearchBar';

function Sidebar({ guests, onUserClick, username }) {
    const handleUserSelect = (guest) => {
        onUserClick(guest);  
    };

    return (
        <Container>
            <NavSidebar username={username} />
            <SearchBar guests={guests} onUserSelect={handleUserSelect} />
            <Col xs={12}>
                <Contacts guests={guests} onUserClick={handleUserSelect} />
            </Col>
        </Container>
    );
}

export default Sidebar;
