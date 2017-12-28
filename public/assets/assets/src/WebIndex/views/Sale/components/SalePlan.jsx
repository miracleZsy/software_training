import React, { Component } from 'react';
import '../css/index.scss';
import SaleAnalyseTable from '../components/SaleAnalyseTable';

class SalePlan extends Component {

    createAnalyseColumns = () => {
        return  [{
            title: '标题',
            dataIndex: 'name',
        }, {
            title: '创建时间',
            dataIndex: 'created_at',
        }, {
            title: '客户名称',
            dataIndex: 'tel',
        }, {
            title: '执行时间',
            dataIndex: 'oper',
        }];
    };
    render() {
        return(
            <div className="customerAnalyseTable">
                <SaleAnalyseTable columnsData={this.createAnalyseColumns()} />
            </div>
        );
    }
}

export default SalePlan;