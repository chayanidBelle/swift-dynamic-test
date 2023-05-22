import React from 'react';
import './App.css';
import { Col, Layout, Row, Select } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';
import FormPage from './pages/form';
import { Link } from 'react-router-dom';
import ShapeComponent from './pages/shape';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeComponent />} />
      <Route path='/layout' element={<ShapeComponent />} />
      <Route path='/form' element={<FormPage />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

const HomeComponent = () => {
  const { t, i18n } = useTranslation();

  const onChangeLangauge = (value: any) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className='layout'>
      <Layout style={{ padding: '0px' }}>
        <Header
          className='header'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            background: 'transparent',
            padding: '0px 20px',
          }}
        >
          <Select
            defaultValue='th'
            style={{ width: 100 }}
            onChange={onChangeLangauge}
            options={[
              { value: 'th', label: 'Thai' },
              { value: 'en', label: 'English' },
            ]}
          />
        </Header>

        <Content className='content'>
          <Row>
            <Col span={24} className='column'>
              <div className='box-title'>
                <Link to='/layout' style={{ fontSize: 18, color: '#000', fontWeight: 500 }}>
                  {t('test')} 1
                </Link>
                <p>{t('layout_title')}</p>
              </div>
              <div className='box-title'>
                <Link to='/form' style={{ fontSize: 18, color: '#000', fontWeight: 500 }}>
                  {t('test')} 2
                </Link>
                <p>{t('form_title')}</p>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default App;
