import React, {　Component } from 'react';
import SaleAnalyseTable from "./SaleAnalyseTable";
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
import '../css/index.scss';

class SaleCustomerAnalyse extends Component {

    componentWillMount() {
        const { fetchSaleAnalyse, setSaleTimeType } = this.props;
        fetchSaleAnalyse(1);
        setSaleTimeType(0);
    }

    componentDidUpdate() {
        const { saleAnalyse } = this.props;
        let myChart = echarts.init(document.getElementById('customerAnalyseEchart'));
        // 绘制图表
        const option = {
            backgroundColor: '#f4f4f4',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                data: this.createAxisTimeArr(saleAnalyse)
            }, {
                axisPointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisTick: {
                    show: false
                },

                position: 'bottom',
                offset: 20
            }],
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'gray'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#D4DFF5'
                    }
                }
            }],
            series: [ {
                name: '客户总数',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 136, 212, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 136, 212, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(0,136,212)',
                        borderColor: 'rgba(0,136,212,0.2)',
                        borderWidth: 12

                    }
                },
                data: this.createAmountArr(saleAnalyse)
            }]
        };
        myChart.setOption(option);
    }
    createAnalyseColumns = () => {
        return  [{
            title: '日期',
            dataIndex: 'time',
        }, {
            title: '新增客户数',
            dataIndex: 'increase',
        }, {
            title: '流失客户数',
            dataIndex: 'decrease',
        }, {
            title: '净增客户数',
            dataIndex: 'netIncrease',
        }, {
            title: '客户总数',
            dataIndex: 'amount',
        }];
    };
    createAxisTimeArr = (saleAnalyse) => {
        let data = [];
        saleAnalyse.forEach(item => {
            data.push(item.time);
        });
        return data;
    };

    createAmountArr = (saleAnalyse) => {
        let data = [];
        saleAnalyse.forEach(item => {
            data.push(item.amount);
        });
        return data;
    };

    render() {
        const { saleAnalyse } = this.props;
        return(
            <div>
                <div id="customerAnalyseEchart" style={{ width: '100%', height: 430 }}></div>
                <div className="customerAnalyseTable">
                    <SaleAnalyseTable
                        columnsData={this.createAnalyseColumns()}
                        saleAnalyse={saleAnalyse}
                        isPagination={false}
                        pagination={false}
                    />
                </div>
            </div>
        );
    }
}

export default SaleCustomerAnalyse;