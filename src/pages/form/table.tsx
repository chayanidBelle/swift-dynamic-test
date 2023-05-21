import { Button, Checkbox, Form, Input, Table, Typography } from 'antd';
import React, { useState } from 'react';
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

interface ITable {
  dataSource: any[];
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: any;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TableComponent = () => {
  const dispatch = useDispatch();
  const { selectedRow } = useSelector((state: any) => state.manageForm);
  const [editRow, setEditRow] = useState<any>({});
  const [form] = Form.useForm();
  const getData = localStorage.getItem('dataSource' || 'null');
  const dataSource = getData ? JSON.parse(getData) : [];
  const isEditing = (record: any) => record.key === editRow?.key;

  const sortAlphabet = (a: any, b: any) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };

  const columns: any = [
    {
      title: 'ขื่อ',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => sortAlphabet(a, b),
      editable: true,
    },
    {
      title: 'นามสกุล',
      dataIndex: 'last_name',
      key: 'last_name',
      sorter: (a: any, b: any) => sortAlphabet(a, b),
      editable: true,
    },
    {
      title: 'เพศ',
      dataIndex: 'gender',
      key: 'gender',
      defaultSortOrder: 'descend',
      editable: false,
      render: (value: any, record: any) => (
        <Typography.Text>{gender.find((item: any) => item.value === value)?.label}</Typography.Text>
      ),
    },
    {
      title: 'หมายเลขโทรศัพท์มือถือ',
      dataIndex: 'phone_no',
      key: 'phone_no',
      editable: true,
    },
    {
      title: 'สัญชาติ',
      key: 'nationality',
      dataIndex: 'nationality',
      editable: false,
      render: (value: any, record: any) => (
        <Typography.Text>{nationalityList.find((item: any) => item.value === value)?.label}</Typography.Text>
      ),
    },
    {
      title: 'จัดการ',
      dataIndex: 'action',
      key: 'x',
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => onSave(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Typography.Link onClick={() => setEditRow({})} style={{ marginRight: 8 }}>
              Cancel
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link onClick={() => setEditRow(record)}>Edit</Typography.Link>
        );
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    dispatch(selectRows(newSelectedRowKeys));
  };

  const rowSelection = {
    selectedRowKeys: selectedRow,
    onChange: onSelectChange,
    hideSelectAll: true,
  };

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
  };

  const onSave = (key: any) => {
    console.log('key :>> ', key);
  };

  const onSelectAll = (e: any) => {
    let getAllRows: any[] = [];
    if (e.target.checked) {
      getAllRows = dataSource?.length > 0 ? dataSource?.map((item: any) => item.key) : [];
    }
    dispatch(selectRows(getAllRows));
  };

  const onDeleteAll = () => {
    let temp = dataSource;

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
        <Form form={form} component={false}>
          <Table
            rowSelection={rowSelection}
            pagination={paginationConfig}
            columns={columns}
            dataSource={dataSource}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
          />
        </Form>
      </div>
    </>
  );
};

export default TableComponent;
