import React from 'react';
import Chart from 'react-apexcharts';

const ChartLine = ({ options, data_c}) => {
    const serries = [
        {
            name: 'series1',
            data: data_c.statistical_conversion
        }
    ]

    return (
        <Chart
            series={serries}
            options={options}
            type="area"
            height={350}
        />
    )
}
ChartLine.defaultProps = {
    series: [
        {
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        }
    ],
    options: {
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            tooltip: {
                enable: false,
            },
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
            labels: {
                style: {
                    colors: '#666b77',
                    fontSize: '14px',
                    fontFamily: 'Roboto-Regular',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#9f9f9f',
                    fontSize: '14px',
                    fontFamily: 'Roboto-Regular',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label',
                },
            },
        },
        tooltip: {
            enable: false,
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
        legend: {
            show: false
        },
        toolbar: {
            show: false,
        },
    }

}
export default ChartLine;