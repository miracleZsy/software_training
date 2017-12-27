import React, { Component } from 'react';
import '../css/index.scss';
import SaleAnalyseTable from '../components/SaleAnalyseTable';

class SalePlan extends Component {

    componentWillMount() {
        const { fetchSalePlan, setSaleTimeType } = this.props;
        fetchSalePlan(0);
        setSaleTimeType(0);
    }


    createAnalyseColumns = () => {
        return  [{
            title: '标题',
            dataIndex: 'title',
        }, {
            title: '创建时间',
            dataIndex: 'created_at',
        }, {
            title: '客户名称',
            dataIndex: 'customers',
            render:(text, record) => this.getCustomerShow(record.customers)
        }, {
            title: '执行时间',
            dataIndex: 'act_time',
        }];
    };

    getCustomerShow = (customers) => {
        let res = '';
        customers.forEach((item) => {
            res += item + ' ';
        });
        return(
            <span>{res}</span>
        );
    };
    render() {
        const { salePlan } = this.props;
        return(
            <div className="customerAnalyseTable">
                <SaleAnalyseTable
                    columnsData={this.createAnalyseColumns()}
                    salePlan={salePlan}
                    isPagination={true}
                />
            </div>
        );
    }
}

export default SalePlan;