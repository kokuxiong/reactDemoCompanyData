import { Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { useTranslation } from 'react-i18next';

export default function NavBar(props){

    const { t, i18n } = useTranslation();

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    return(
        <Navbar color="dark" dark expand="md" style={{height:50}}>
            <NavbarBrand>社員管理システム</NavbarBrand>
            {/* {props.login && */}
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            {props.login &&
                                <NavLink onClick={() => props.doLogin(false)}>ログアウト</NavLink>
                            }
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => changeLanguage('jp')}>日本語</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => changeLanguage('ch')}>中文简体</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            {/* } */}
        </Navbar>
    )

}