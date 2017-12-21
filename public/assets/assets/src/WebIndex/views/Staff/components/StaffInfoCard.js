import React from 'react';
import { Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

const StaffInfoCard = () => (
    <Card
        style={{ width: 300 }}
        actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
    >
        <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="Sytone"
            description="账号:12345"
        />
    </Card>
);

export default StaffInfoCard;