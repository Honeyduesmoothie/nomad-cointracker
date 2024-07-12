import styled from "styled-components";
import ApexChart from "react-apexcharts"
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ICoin {
    coinId: string,
    priceData: PriceData
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

const Container = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 20px;
    span {
        &:first-child {
            font-size: 15px;
            text-align: right;
           
            margin-bottom: 10px;
        }
    }
`




function Price({coinId, priceData}: ICoin){
    const isDark = useRecoilValue(isDarkAtom)
    const timePassed = Math.floor((new Date().getTime() - new Date(priceData.last_updated).getTime())/1000/60)
  
    const PRICE = priceData.quotes.USD
   
    return ( 
<>
<Container>
<span>Last updated: {timePassed} min ago</span>

            <span>ATH price: ${PRICE.ath_price.toFixed(2)} ({PRICE.ath_date})</span>
            <span>Percent from ATH: {PRICE.percent_from_price_ath}%</span>
            <span>Market Cap: ${PRICE.market_cap.toLocaleString()}</span>
        </Container>
<ApexChart
        height={400}
        width={'100%'}
        type="bar"
        series={[{
            name: coinId,
            data: [
                Number(PRICE.ath_price),
                PRICE.price,
                Number(PRICE.price/(1+PRICE.percent_change_1y/100)),
                Number(PRICE.price/(1+PRICE.percent_change_30d/100)),
                Number(PRICE.price/(1+PRICE.percent_change_7d/100)),
                Number(PRICE.price/(1+PRICE.percent_change_24h/100)),
                Number(PRICE.price/(1+PRICE.percent_change_12h/100)),
                Number(PRICE.price/(1+PRICE.percent_change_6h/100)),
                Number(PRICE.price/(1+PRICE.percent_change_1h/100)),
                Number(PRICE.price/(1+PRICE.percent_change_30m/100)),
                Number(PRICE.price/(1+PRICE.percent_change_15m/100)),

            ]
        }]}
        options={{
            chart: {
                height: 500,
                width: 100,
                type: "area",
                
                zoom: {
                    enabled: false
                },
                toolbar: {

                }
            },
            plotOptions: {
                bar: {
                  borderRadius: 5,
                  dataLabels: {
                    position: 'top', // top, center, bottom
                  },
                }
              },
            colors: ['coral', 'coral'],
        dataLabels: {
            enabled: false,
            
        },
        tooltip: {
            theme: 'dark',
        },
        title: {
            text: `Price - ${coinId}`,
            align: "left",
            style: {
                color: isDark? '#FFF8F3' : '#405D72',
                fontFamily: 'inherit',
                fontSize: '20'
            }
        },
        
        grid: {
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },  
            row: {
                colors: ['transparent'],
                opacity: 0.3,

            }
        },
        
        states: {
            
            hover: {
                filter: {
                    type: 'lighten',
                    value: 0.15,
                }
            }
        },
        fill: {
            colors: ["aquamarine"]
        },
    
        xaxis: {
            type: "category",
            categories: [
                'ATH',
                'current',
                '1y ago',
                '30d ago',
                '7d ago',
                '24h ago',
                '12h ago',
                '6h ago',
                '1h ago',
                '30m ago',
                '15m ago'],
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                          colorFrom: '#4c1d77',
                          colorTo: '#bee6df',
                          stops: [0, 100],
                          opacityFrom: 0.4,
                          opacityTo: 0.5,
                        }
                }
        },
        tickPlacement: 'on',
        labels: {
            show: true,
            rotate: -45,
            style: {
                colors: isDark? '#FFF8F3' : '#405D72',
            },
            offsetY: 5,

        }
    },
       yaxis: {
        show: true,
        labels: {
            show: true,
            align: 'right',
            style: {
                colors: isDark? '#FFF8F3' : '#405D72',
            },
            formatter: (value) => value>1000? `$${Number(value/1000).toFixed(2)}k` : `$${value}`
        },
        tooltip: {
            enabled: false
        }
       }
        }}
        
        />
       
        </>
    )
}

export default Price;