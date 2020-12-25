import { Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

export default function NavBar(props){

    //navvarで「登録」「ログインへ」を表示する制御
    let navbarpath = props.navbarpath

    //ログインユーザ新規登録画面へ遷移
    function gotoRegister() {
        window.location.href='/loginuserRegister'
    }

    //ログイン画面へ遷移
    function gotoLogin() {
        window.location.href='/'
    }

    return(
        <Navbar color="dark" dark expand="md">
            <NavbarBrand>社員管理システム</NavbarBrand>
            {!props.login && navbarpath == 'login' &&
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink onClick={gotoRegister}>登録</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            }
            {!props.login && navbarpath == 'register' &&
                <Collapse navbar> 
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink onClick={gotoLogin}>ログインへ</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            }
            {props.login &&
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink onClick={() => props.doLogin(false)}>ログアウト</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            }
        </Navbar>
    )

}