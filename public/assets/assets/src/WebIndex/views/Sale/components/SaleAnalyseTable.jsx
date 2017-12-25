import React, { Component } from 'react';
import { Table } from 'antd';


class SaleAnalyseTable extends Component {
    render() {
        const { columnsData, saleAnalyse } = this.props;
        return(
            <div>
                <Table
                    rowKey="id"
                    columns={columnsData}
                    dataSource={saleAnalyse}
                />
            </div>
        );
    }
}

export default SaleAnalyseTable;