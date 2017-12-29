import React, { Component } from 'react';
import { Table } from 'antd';


class SaleAnalyseTable extends Component {
    render() {
        const { columnsData, saleAnalyse, isPagination, salePlan, pagination } = this.props;
        return(
            <div>
                <Table
                    rowKey={isPagination === false　? 'time' : 'id'}
                    columns={columnsData}
                    dataSource={isPagination === false　? saleAnalyse : salePlan}
                    pagination={pagination}
                />
            </div>
        );
    }
}

export default SaleAnalyseTable;