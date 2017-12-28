import React, { Component } from 'react';
import { Table } from 'antd';


class SaleAnalyseTable extends Component {
    render() {
        const { columnsData, saleAnalyse } = this.props;
        return(
            <div>
                <Table
                    rowKey="time"
                    columns={columnsData}
                    dataSource={saleAnalyse}
                    pagination={false}
                />
            </div>
        );
    }
}

export default SaleAnalyseTable;