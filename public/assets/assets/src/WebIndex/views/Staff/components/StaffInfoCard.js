import React from 'react';
import { Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

const StaffInfoCard = (props) => (
    <Card
        style={{ width: 250 }}
        actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
    >
        <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={props.name}
            description={`用户名:${props.username}`}
        />
    </Card>
);

export default StaffInfoCard;