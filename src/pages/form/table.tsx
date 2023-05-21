import { Button, Checkbox, Table, Typography } from 'antd';
import React from 'react';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { gender, nationalityList } from '../../data/data-list';
import { useDispatch, useSelector } from 'react-redux';
import { selectRows } from '../../stores/manage-form/manage-form-reducer';

interface DataType {
  key: React.Key;
  name: string;
  gender: string;
  phone_no: string;
  nationality: string;
}

const paginationConfig = {
  pageSize: 4,
  defaultCurrent: 1,
};

const columns: ColumnsType<DataType> = [
  {
    title: 'ขื่อ',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: any, b: any) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'นามสกุล',
    dataIndex: 'last_name',
    key: 'last_name',
    sortDirections: ['descend'],
  },
  {
    title: 'เพศ',
    dataIndex: 'gender',
    key: 'gender',
    defaultSortOrder: 'descend',
    render: (value: any, record: any) => (
      <Typography.Text>{gender.find((item: any) => item.value === value)?.label}</Typography.Text>
    ),
  },
  {
    title: 'หมายเลขโทรศัพท์มือถือ',
    dataIndex: 'phone_no',
    key: 'phone_no',
  },
  {
    title: 'สัญชาติ',
    key: 'nationality',
    dataIndex: 'nationality',
    render: (value: any, record: any) => (
      <Typography.Text>{nationalityList.find((item: any) => item.value === value)?.label}</Typography.Text>
    ),
  },
  {
    title: 'จัดการ',
    dataIndex: 'action',
    key: 'x',
    render: () => <a>Edit</a>,
  },
];

interface ITable {
  dataSource: any[];
}

const TableComponent = (props: ITable) => {
  const dispatch = useDispatch();
  const { selectedRow } = useSelector((state: any) => state.form);
  const getData = localStorage.getItem('dataSource' || 'null');
  const dataSource = getData ? JSON.parse(getData) : [];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    dispatch(selectRows(newSelectedRowKeys));
  };

  const rowSelection = {
    selectedRow,
    onChange: onSelectChange,
    hideSelectAll: true,
  };

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onSelectAll = (e: any) => {
    let getAllRows: any[] = [];
    if (e.target.checked) {
      getAllRows = dataSource?.length > 0 ? dataSource?.map((item: any) => item.key) : [];
    }
    dispatch(selectRows(getAllRows));
  };

  const onDeleteAll = () => {
    let temp = props.dataSource;

    if (selectedRow.length > 0) {
      selectedRow.forEach((item: any) => {
        temp = temp.filter((dataItem: any) => item !== dataItem.key);
      });

      localStorage.setItem('dataSource', JSON.stringify(temp));
      dispatch(selectRows([]));
    }
  };

  return (
    <>
      <div style={{ width: '90%', marginTop: 40 }}>
        <div style={{ marginBottom: 15, marginLeft: 10 }}>
          <Checkbox onChange={onSelectAll}>เลือกทั้งหมด</Checkbox>
          <Button onClick={onDeleteAll}>ลบข้อมูล</Button>
        </div>
        <Table
          rowSelection={rowSelection}
          pagination={paginationConfig}
          columns={columns}
          dataSource={props.dataSource}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default TableComponent;
