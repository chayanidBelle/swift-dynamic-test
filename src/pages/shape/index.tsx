import { Button, Col, Divider, Row, Select } from 'antd';
import { wrap } from 'module';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './shape.css';

const ShapeComponent = () => {
  const { t, i18n } = useTranslation();
  const [upside, setUpside] = useState(false);
  const [btnShape, setbtnShape] = useState<any>([
    { name: 'square' },
    { name: 'trapezoid' },
    { name: 'oval' },
    { name: 'circle' },
    { name: 'rectangle' },
    { name: 'parallelogram' },
  ]);

  const onChangeLangauge = (value: any) => {
    i18n.changeLanguage(value);
  };

  const onChangePosition = () => {
    setUpside(!upside);
  };

  const onClickLeft = () => {
    let firstEle: any[] = [];
    const temp = btnShape;
    firstEle[0] = temp.shift();
    const newOrder = temp.concat(firstEle);
    setbtnShape([...newOrder]);
  };

  const onClickRight = () => {
    const temp = btnShape;
    const last = temp.pop();
    temp.unshift(last);
    setbtnShape([...temp]);
  };

  const onRandom = () => {
    let temp = btnShape;

    for (let i = temp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }

    setbtnShape([...temp]);
  };

  return (
    <>
      <div className='layout' style={{ padding: 20 }}>
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
          <p style={{ fontSize: '28px', margin: '0px', fontWeight: 500 }}>{t('layout_title')}</p>
          <Link to='/'>
            <Button>{t('home')}</Button>
          </Link>
        </div>

        <div style={{ maxWidth: '1100px', display: 'block', margin: 'auto' }}>
          <Row justify='center' style={{ marginTop: 30 }}>
            <Col span={6} className='col-btn-position'>
              <Button className='btn' onClick={onClickLeft}>
                <div className='triangle-left'></div>
              </Button>
              <div className='move-shape'>{t('leftright')}</div>
            </Col>

            <Col span={12} className='col-btn-position'>
              <Button className='btn-position' onClick={onChangePosition}>
                <div className='triangle-up'></div>
                <div className='triangle-down'></div>
                <div className='move-position'>{t('topdown')}</div>
              </Button>
            </Col>

            <Col span={6} className='col-btn-position'>
              <Button className='btn' onClick={onClickRight}>
                <div className='triangle-right'></div>
              </Button>
              <div className='move-shape'>{t('leftright')}</div>
            </Col>
          </Row>

          <Divider style={{ margin: '30px 0px' }} />

          <Row justify={upside ? 'end' : 'center'}>
            {btnShape.map((item: any, index: number) => {
              return index < 3 ? (
                <Col span={6}>
                  <Button className='btn' onClick={onRandom}>
                    <div className={item.name}></div>
                  </Button>
                </Col>
              ) : null;
            })}
          </Row>

          <Row justify={upside ? 'center' : 'end'}>
            {btnShape.map((item: any, index: number) => {
              return index > 2 ? (
                <Col span={6}>
                  <Button className='btn' onClick={onRandom}>
                    <div className={item.name}></div>
                  </Button>
                </Col>
              ) : null;
            })}
          </Row>
        </div>
      </div>
    </>
  );
};

export default ShapeComponent;
