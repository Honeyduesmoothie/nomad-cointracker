import { useQuery } from "@tanstack/react-query";
import { fetchChart } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IChart {
    coinId: string;
}

interface IData {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}


function Chart({coinId}: IChart){
    const isDark = useRecoilValue(isDarkAtom)
    const {isLoading, data} = useQuery<IData[]>({queryKey: ["chart", coinId], queryFn:()=> fetchChart(coinId), refetchInterval: 5000})
    console.log(data)
    return (
        <>
{isLoading? "Loading..." :  <ApexChart
       type="candlestick"
        height={400}
        width={'100%'}
        series={[{
            data: data?.map((price) => [
                price.time_close*1000, 
                parseFloat(price.open),
                parseFloat(price.high),
                parseFloat(price.low),
                parseFloat(price.close)
            ])??[]
        }]}
        options={{
            chart: {
                height: 500,
                width: 100,
                type: "candlestick",
                
                zoom: {
                    enabled: false
                },
                toolbar: {

                }
            },
            
            
            colors: ['coral', 'coral'],
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            theme: 'dark',
        },
        stroke: {
           colors: ['aquamarine'],
            curve: "smooth",
        },
        title: {
            text: `Chart - ${coinId}`,
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
    
        xaxis: {
            type: "datetime",
            labels: {
                style: {
                    colors: isDark? '#FFF8F3' : '#405D72'
                }
            }
           
        },
       yaxis: {
        show: true,
        labels: {
            show: true,
            align: 'right',
            style: {
                colors: isDark? '#FFF8F3' : '#405D72'
            },
            formatter: (value) => value>1000? `$${Number(value/1000).toFixed(2)}k` : `$${value}`
        },
        tooltip: {
            enabled: true
        }
       }
        }}
        
        />}        </>
    )
}

export default Chart;