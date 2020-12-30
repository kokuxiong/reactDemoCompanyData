import { Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { useTranslation } from 'react-i18next';

export default function NavBar(props){

    //--------------------i18n処理----------------
    const { t, i18n } = useTranslation();
    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };
    //--------------------i18n処理----------------

    return(
        <Navbar color="dark" dark expand="md" style={{height:50}}>
            <NavbarBrand>{t('title')}</NavbarBrand>
            {/* {props.login && */}
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        {/* ログイン済の場合　ログアウトを表示する */}
                        <NavItem>
                            {props.login &&
                                <NavLink onClick={() => props.doLogin(false)}>{t('logout')}</NavLink>
                            }
                        </NavItem>
                        {/* i18n 切り替え　暫定は中国語と日本語のみ */}
                        <NavItem>
                            <NavLink onClick={() => changeLanguage('jp')}>{t('lang-jp')}</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => changeLanguage('ch')}>{t('lang-ch')}</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            {/* } */}
        </Navbar>
    )

}