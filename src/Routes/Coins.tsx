import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api"
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Container = styled.div`
    padding: 20px 20px;
    max-width: 480px;
    margin: 0 auto;
    color: ${props => props.theme.textColor};
`

const Header = styled.h1`

margin-bottom: 20px;
`

const Title = styled.h1`
    text-align: center;
    font-size: 40px;
`

const CoinList = styled.ul`
display: flex;
flex-direction: column;
gap: 15px;
`


const Coin = styled.li`
    font-size: 20px;
    background-color: ${props => props.theme.cardBg};
    padding: 10px;
    border-radius: 10px;
    &:hover {
        background-color: ${props => props.theme.cardShadow};
    }
    a {
        
        display: flex;
        align-items: center;
        gap: 15px;

    }
`
const Loader = styled.div`

font-size: 30px;
text-align: center;
`

const Img = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
interface ICoin {
    id: string,
        name: string,
        symbol: string,
        rank: number,
        is_new: boolean,
        is_active: boolean,
        type: string,
}

function Coins(){
    const {isLoading, data} = useQuery<ICoin[]>({queryKey: ['coins'], queryFn: fetchCoins})
    
    return (
        <HelmetProvider>
        <Container>
            <Helmet>
                <title>Coins</title>
            </Helmet>
            <Header>
                <Title>Coins</Title>
            </Header>
           {isLoading? <Loader>Loading...</Loader> :  <CoinList>
                {data?.slice(0,100).map(coin => <Coin>
                    <Link to={{
                        pathname:`${coin.id}`,
                        state: {name: coin.name}}} ><Img src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`} />{coin.name}&rarr;</Link>
                </Coin>)}
            </CoinList>}
        </Container>
        </HelmetProvider>
    )
}

export default Coins;