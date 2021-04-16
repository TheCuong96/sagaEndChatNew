import React from 'react';
import Chart from 'react-apexcharts';

const ChartColumn = ({ options, data_chart }) => {
    const serries_data = [
        {
            name: 'Tham gia',
            data: data_chart.data_join
        }, {
            name: 'Rời khỏi',
            data: data_chart.data_leave
        }
    ]

    return (
        <div className="w-100">
            <Chart
                series={serries_data}
                options={options}
                type="bar"
            />
        </div>
    )
}
ChartColumn.defaultProps = {

    options: {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false,
            },
            dropShadow: {
                enabled: false,
                enabledOnSeries: undefined,
                top: 0,
                left: 0,
                blur: 3,
                color: '#000',
                opacity: 0.9
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: false,
            // width: 2,
            // colors: ['transparent']
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
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
                    colors: '#666b77',
                    fontSize: '14px',
                    fontFamily: 'Roboto-Regular',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label',
                },
            },
        },
        fill: {
            opacity: 1,
            colors: ['#0080ff', '#d4d8de'],
            gradient: {
                shade: 'dark',
                type: "horizontal",
                shadeIntensity: 0.9,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 100],
                colorStops: []
            },
        },
        // tooltip: {
        //     y: {
        //         formatter: function (val) {
        //             return "$ " + val + " thousands"
        //         }
        //     },
        // },
        legend: {
            show: false
        },
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
            hover: {
                filter: {
                    type: 'darken',//hover colum data
                    value: 0.9,
                }
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'darken',
                    value: 0.35,
                }
            },
        }
    }
}
export default ChartColumn;