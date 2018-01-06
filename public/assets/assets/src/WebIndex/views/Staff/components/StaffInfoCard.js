import React from 'react';
import { Card, Icon, Avatar, Popconfirm, message } from 'antd';

const { Meta } = Card;

const StaffInfoCard = ({ staff, openStaffModal, openModifyModal, deleteStaff }) => {
    const handleOnDetailClick = () => {
        openStaffModal(staff);
    };
    const handleOnModify = () => {
        openModifyModal(staff);
    };
    const onConfirmDelete = () => {
        if (staff.username === "boss") {
            return message.info('老板，您不能删除自己');
        }
        deleteStaff(staff.uuid);
    };
    return (
        <Card
            style={{ width: 250 }}
            actions={[
                <Icon type="edit" onClick={handleOnModify} />,
                <Icon type="ellipsis" onClick={handleOnDetailClick} />,
                <Popconfirm title="你确定要删除此员工吗？" cancelText="取消" okText="确定" onConfirm={onConfirmDelete}>
                    <Icon type="delete" />
                </Popconfirm>
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