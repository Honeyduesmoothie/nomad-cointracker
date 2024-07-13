import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import styled from "styled-components";
import Coin from "./Routes/Coin";
import Coins from "./Routes/Coins";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const Nav = styled.nav`
padding: 10px;
display: flex;
justify-content: space-between;
gap: 10px;
margin-bottom: 1%;
max-width: 480px;
margin: 0 auto;
`
const NavBtn = styled.div`
    color: ${props => props.theme.textColor};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    background-color: ${props => props.theme.cardBg};
    border-radius: 5rem;
    font-weight: bold;
    cursor: pointer;
        &:hover {
            background-color: ${props => props.theme.cardShadow};
        }
    button {
        border: none;
        font-size: inherit;
        font-family: inherit;
        background-color: transparent;
        color: inherit;
        font-weight:inherit ;
        cursor: pointer;
    }
`
interface IRouter {
    isDark: boolean
}

function Router({isDark}: IRouter){
    const setDarkAtom = useSetRecoilState(isDarkAtom);
   const toggleDarkAtom = () => setDarkAtom((current) => !current);
    return (
        <BrowserRouter>
        <div>
        <Nav>
            <NavBtn>
            <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
            </NavBtn>
            <NavBtn>
                <button onClick={toggleDarkAtom}>Toggle Dark Mode</button>
            </NavBtn>
        </Nav>

        <Switch>
        <Route path={`${process.env.PUBLIC_URL}/:coinId`}>
            <Coin />
        </Route>
        <Route path={`${process.env.PUBLIC_URL}/`} >
            <Coins />
        </Route>
        </Switch>
        </div>
        </BrowserRouter>
    )
}

export default Router;