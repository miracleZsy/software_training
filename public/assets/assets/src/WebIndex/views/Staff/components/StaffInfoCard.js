import React from 'react';
import { Card, Icon, Avatar, Popconfirm, message } from 'antd';
import isBoss from '../../../../lib/isBoss';

const { Meta } = Card;

const StaffInfoCard = ({ staff, openStaffModal, openModifyModal, deleteStaff }) => {
    const handleOnDetailClick = () => {
        openStaffModal(staff);
    };
    const handleOnModify = () => {
        openModifyModal(staff);
    };
    const onConfirmDelete = () => {
        if (isBoss) {
            return message.info('老板，您不能删除自己');
        }
        deleteStaff(staff.uuid);
    };
    return (
        <Card
            style={{ width: 250, margin: "10px 20px" }}
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