import React from 'react';
import { Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

const StaffInfoCard = ({ staff, openStaffModal, openModifyModal }) => {
    const handleOnDetailClick = () => {
        openStaffModal(staff);
    };
    const handleOnModify = () => {
        openModifyModal(staff);
    };
    return (
        <Card
            style={{ width: 250 }}
            actions={[
                <Icon type="edit" onClick={handleOnModify} />,
                <Icon type="ellipsis" onClick={handleOnDetailClick} />
            ]}
        >
            <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={staff.name}
                description={`用户名:${staff.username}`}
            />
        </Card>
    );
};

export default StaffInfoCard;