import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    let menuItems;
    if (props.isAuthenticated) {
        menuItems = [
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>,
            <Menu.Item key="2" onClick={props.handleLogout}>Logout</Menu.Item>,
            <Menu.Item key="3"><Link to="/posts/">Posts</Link></Menu.Item>
        ]
    } else {
        menuItems = [
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>,
            <Menu.Item key="2"><Link to="/signup/">Signup</Link></Menu.Item>,
            <Menu.Item key="3"><Link to="/login/">Login</Link></Menu.Item>
        ]
    }
    return (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {menuItems}
        </Menu>
    )
}

export default Navbar;