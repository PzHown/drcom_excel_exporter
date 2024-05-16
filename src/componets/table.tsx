import React from 'react';
import { PersonInfo } from '../po/person';

interface TableProps {
    data: (PersonInfo)[];
}

const Table: React.FC<TableProps> = ({ data }) => {


    return (
        <div className='overflow-x-auto'>
            <table className='min-w-full table-auto bg-[var(--color-primary)] bg-op-03 rounded-4'>
                <thead>
                    <tr className='[&>th]:(text-center px-4 py-2)'>
                        <th>账号</th>
                        <th>密码</th>
                        <th>绑定套餐组</th>
                        <th>组织结构(OU)</th>
                        <th>用户名称</th>
                        <th>性别</th>
                        <th>证件号码</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className='[&>td]:(text-right px-4 py-2 border-white) odd:(bg-[var(--color-primary)] bg-op-08)'>
                            <td>{item.jobNumber}</td>
                            <td>{item.password}</td>
                            <td>{2}</td>
                            <td>{item.department}</td>
                            <td>{item.name}</td>
                            <td>{item.sex}</td>
                            <td>{item.idCard}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default Table;