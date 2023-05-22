import { Button, Col, DatePicker, Form, Input, Radio, Row, Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { countryCodeList, nameTitleList, nationalityList } from '../../data/data-list';
import { updateForm } from '../../stores/manage-form/manage-form-reducer';
import TableComponent from './table';
import { Link } from 'react-router-dom';
import moment from 'moment';

const FormPage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const initialData = JSON.parse(localStorage.getItem('dataSource') || 'null');

  const onFinish = (values: any) => {
    let id_card_list: any[] = [];
    let id_card = '';
    for (const key in values) {
      if (
        (key === 'id_card1' || key === 'id_card2' || key === 'id_card3' || key === 'id_card4' || key === 'id_card5') &&
        values[key] !== ''
      ) {
        id_card_list.push(values[key]);
        id_card = id_card_list.join('');
      }
    }

    const birth_date = form.getFieldValue('birth_date').toDate();
    const utc = moment.utc(birth_date).format();
    const new_form = {
      id_card,
      birth_date: utc,
      expected_salary: values.expected_salary,
      gender: values.gender,
      last_name: values.last_name,
      name: values.name,
      name_title: values.name_title,
      nationality: values.nationality,
      passport: values.passport ? values.passport : '',
      phone_no: values.phone_no ? values.phone_no : '',
    };
    dispatch(updateForm(new_form));
    onSetLocalStorage({ ...new_form, id_card, key: Math.random().toString() });
  };

  const onSetLocalStorage = (form: any) => {
    if (!initialData) {
      let default_value: any[] = [];
      let new_values = { ...form };
      default_value.push(new_values);
      localStorage.setItem('dataSource', JSON.stringify(default_value));
    } else {
      let initial = [...initialData, form];
      localStorage.setItem('dataSource', JSON.stringify(initial));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onClearForm = () => {
    form.resetFields();
  };

  const onChangeLangauge = (value: any) => {
    i18n.changeLanguage(value);
  };

  return (
    <>
      <div className='formLayout'>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Select
            defaultValue='th'
            style={{ width: 100 }}
            onChange={onChangeLangauge}
            options={[
              { value: 'th', label: 'Thai' },
              { value: 'en', label: 'English' },
            ]}
          />
        </div>
        <div className='formHeader'>
          <p style={{ fontSize: '28px', margin: '0px', fontWeight: 500 }}>{t('form_title')}</p>
          <Link to='/'>
            <Button>{t('home')}</Button>
          </Link>
        </div>

        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div className='divForm'>
            <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Row>
                <Col span={5}>
                  <Form.Item
                    required
                    label='คำนำหน้า'
                    name='name_title'
                    rules={[{ required: true, message: 'กรุณาระบุคำนำหน้า' }]}
                  >
                    <Select placeholder='คำนำหน้า' style={{ width: 80 }} options={nameTitleList} />
                  </Form.Item>
                </Col>

                <Col span={9}>
                  <Form.Item
                    required
                    label='ชื่อจริง'
                    name='name'
                    rules={[{ required: true, message: 'กรุณาระบุชื่อจริง' }]}
                  >
                    <Input style={{ width: 250 }} />
                  </Form.Item>
                </Col>

                <Col span={9}>
                  <Form.Item
                    required
                    label='นามสกุล'
                    name='last_name'
                    rules={[{ required: true, message: 'กรุณาระบุนามสกุล' }]}
                  >
                    <Input style={{ width: 250 }} />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    required
                    label='วันเกิด'
                    name='birth_date'
                    rules={[{ required: true, message: 'กรุณาระบุวันเกิด' }]}
                  >
                    <DatePicker placeholder='เดือน/วัน/ปี' format='MM/DD/YYYY' />
                  </Form.Item>
                </Col>

                <Col span={18}>
                  <Form.Item
                    required
                    label='สัญชาติ'
                    name='nationality'
                    rules={[{ required: true, message: 'กรุณาเลือกสัญชาติ' }]}
                  >
                    <Select placeholder='- - กรุณาเลือก - -' style={{ width: 300 }} options={nationalityList} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label='เลขบัตรประชาชน'>
                    <Row>
                      <Col span={2}>
                        <Form.Item name='id_card1'>
                          <Input maxLength={1} />
                        </Form.Item>
                      </Col>
                      <Col span={1} style={{ display: 'flex', justifyContent: 'center' }}>
                        -
                      </Col>
                      <Col span={5}>
                        <Form.Item name='id_card2'>
                          <Input maxLength={4} />
                        </Form.Item>
                      </Col>
                      <Col span={1} style={{ display: 'flex', justifyContent: 'center' }}>
                        -
                      </Col>
                      <Col span={5}>
                        <Form.Item name='id_card3'>
                          <Input maxLength={5} />
                        </Form.Item>
                      </Col>
                      <Col span={1} style={{ display: 'flex', justifyContent: 'center' }}>
                        -
                      </Col>
                      <Col span={3}>
                        <Form.Item name='id_card4'>
                          <Input maxLength={2} />
                        </Form.Item>
                      </Col>
                      <Col span={1} style={{ display: 'flex', justifyContent: 'center' }}>
                        -
                      </Col>
                      <Col span={2}>
                        <Form.Item name='id_card5'>
                          <Input maxLength={1} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label='เพศ' name='gender' required rules={[{ required: true, message: 'กรุณาระบุเพศ' }]}>
                    <Radio.Group>
                      <Radio value='Male'> ชาย </Radio>
                      <Radio value='Female'> หญิง </Radio>
                      <Radio value='Non-define'> ไม่ระบุ </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label='หมายเลขโทรศัพท์มือถือ' name='phone_no'>
                    <Row>
                      <Col span={4}>
                        <Select options={countryCodeList} />
                      </Col>
                      <Col span={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        -
                      </Col>
                      <Col span={8}>
                        <Input maxLength={10} />
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={24}></Col>

                <Col span={24}>
                  <Form.Item label='หนังสือเดินทาง' name='passport'>
                    <Input style={{ width: 280 }} />
                  </Form.Item>
                </Col>

                <Col span={14}>
                  <Form.Item
                    label='เงินเดือนที่คาดหวัง'
                    name='expected_salary'
                    required
                    rules={[{ required: true, message: 'กรุณาระบุเงินเดือนที่คาดหวัง' }]}
                  >
                    <Input style={{ width: 250 }} />
                  </Form.Item>
                </Col>

                <Col span={5}>
                  <Form.Item>
                    <Button onClick={onClearForm}>ล้างข้อมูล</Button>
                  </Form.Item>
                </Col>

                <Col span={5}>
                  <Form.Item>
                    <Button htmlType='submit'>ส่งข้อมูล</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>

          <TableComponent />
        </div>
      </div>
    </>
  );
};

export default FormPage;
