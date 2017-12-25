import React, { Component } from 'react';
import { Table } from 'antd';


class SaleAnalyseTable extends Component {
    render() {
        const { columnsData } = this.props;
        return(
            <div>
                <Table
                    rowKey="id"
                    columns={columnsData}
                    // dataSource={customerData}
                />
            </div>
        );
    }
}

export default SaleAnalyseTable;