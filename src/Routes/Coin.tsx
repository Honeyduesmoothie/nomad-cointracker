import { useQuery } from "@tanstack/react-query";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { fetchInfo, fetchPrice } from "../api";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";

const Container = styled.div`
    padding: 20px 20px;
    max-width: 480px;
    margin: 0 auto;
    color: ${props => props.theme.textColor};

`
const Header = styled.header`
margin-bottom: 40px;
    
`
const Title = styled.h1`
    text-align: center;
font-size: 40px;
font-weight: bold;
margin-bottom: 20px;
display: flex;
align-items: center;
justify-content: center;
gap: 20px;
`
const Main = styled.main`
`

const Card = styled.div`
    padding: 15px;
border-radius: 10px;
    background-color: ${props => props.theme.cardBg};
    box-shadow: 0px 0px 3px 3px rgba(200,200,200,0.3);
    margin-bottom: 30px;
    width: 100%;
`

const Overview = styled(Card)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 30px;
`

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 15px;
    h5 {
        font-size: 20px;
        font-weight: bold;
    }
    span {
        font-size: 18px;
    }
`

const Description = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        font-size: 25px;
        font-weight: bold;
        color: ${props => props.theme.textColor}
    }
    p {
        line-height: 20px;
        font-size: 18px;
    }
`


const Img = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
`

const Menu = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
`

const Tab = styled(Card)<{isActive: boolean}>`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
        color: ${props => props.isActive? props.theme.accentColor : props.theme.textColor};
        &:hover {
            background-color: ${props => props.theme.cardShadow};
        }
        cursor: pointer;
`

const Loader = styled.div`

font-size: 30px;
text-align: center;
`


interface InfoData {
    id: string
    name: string
    symbol: string
    rank: number
    is_new: boolean
    is_active: boolean
    type: string
    logo: string
    description: string
    message: string
    open_source: boolean
    started_at: string
    development_status: string
    hardware_wallet: boolean
    proof_type: string
    org_structure: string
    hash_algorithm: string
    first_data_at: string
    last_data_at: string
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date
:string;
ath_price
: number;
market_cap
: number;
market_cap_change_24h
: number;
percent_change_1h
: number;
percent_change_1y
: number;
percent_change_6h
: number;
percent_change_7d
: number;
percent_change_12h
: number;
percent_change_15m
: number;
percent_change_24h
: number;
percent_change_30d
: number;
percent_change_30m
: number;
percent_from_price_ath
: number;
price
: number;
volume_24h
: number;
volume_24h_change_24h
: number;
        }
    }
}

interface IState  {
name: string;
}

interface IParams {
    coinId: string;
}

function Coin(){
    const {coinId} = useParams<IParams>();
    const {isLoading : infoLoading, data : infoData} = useQuery<InfoData>({queryKey:["info", coinId] , queryFn:()=> fetchInfo(coinId)})
    const {isLoading : priceLoading, data : priceData} = useQuery<PriceData>({queryKey: ["price", coinId], queryFn: ()=> fetchPrice(coinId)})
    const priceMatch = useRouteMatch(`${process.env.PUBLIC_URL}/:coinId/price`)
    const chartMatch = useRouteMatch(`${process.env.PUBLIC_URL}/:coinId/chart`)

    const {state} = useLocation<IState>();
    const loading = infoLoading || priceLoading;
    return (
        <HelmetProvider>
            <Container>
            <Helmet>
                <title>{coinId}</title>
            </Helmet>
            <Header>
                <Title>
                <Img src={infoData?.logo} />
                    {state?.name ? state?.name : loading? "Loading..." : infoData?.name}</Title>
            </Header>
            {loading? <Loader>Loading...</Loader> : <Main>
                <Overview>
                <OverviewItem>
            <h5>Rank</h5>
            <span>{infoData?.rank}</span>
        </OverviewItem>
        <OverviewItem>
            <h5>symbol</h5>
            <span>{infoData?.symbol}</span>
        </OverviewItem>
        <OverviewItem>
            <h5>Since</h5>
            <span>{infoData?.started_at?.slice(0,4)}</span>
        </OverviewItem>
        <OverviewItem>
            <h5>Structure</h5>
            <span>{infoData?.org_structure}</span>
        </OverviewItem>
        <OverviewItem>
            <h5>Proof type</h5>
            <span>{infoData?.proof_type}</span>
        </OverviewItem>
        <OverviewItem>
            <h5>Hash </h5>
            <span>{infoData?.hash_algorithm}</span>
        </OverviewItem>
                </Overview>
                <Description>
                <p>{infoData?.description}</p>
            </Description>
            <Overview>
                <OverviewItem>
                    <h5>Total supply</h5>
                    <span>{priceData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <h5>Max supply</h5>
                    <span>{priceData?.max_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <h5>Price</h5>
                    <span>${priceData?.quotes.USD.price.toFixed(2)}</span>
                </OverviewItem>
            </Overview>
            <Menu>
            <Link to={`${process.env.PUBLIC_URL}/${coinId}/price`}>
            <Tab isActive={priceMatch !== null}>price</Tab></Link>
                {/* priceMatch는 null 일 수도 있기 때문에 isActive={priceMath}로 할 경우 error 발생 */}
                <Link to={`${process.env.PUBLIC_URL}/${coinId}/chart`}><Tab isActive={chartMatch !== null}>chart</Tab></Link>
            </Menu>
            </Main>}
            <Switch>
                <Route path={`${process.env.PUBLIC_URL}/:coinId/price`}>
                {priceData && <Price coinId={coinId} priceData={priceData} />}
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/:coinId/chart`}>
                <Chart coinId={coinId} />
                </Route>
            </Switch>
            </Container>
        </HelmetProvider>
    )
}

export default Coin;