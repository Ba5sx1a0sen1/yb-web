import React, { Component } from 'react';
import {
  Card,
  Table,
  Row,
  Col,
  Input,
  Button,
  Upload,
  Icon,
  Divider,
  Popconfirm,
  message,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import EditCourseDetail from './EditCourseDetail';
import styles from './styles.less';
import router from 'umi/router';
import { ChartCard } from "@/components/Charts"
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";


const Search = Input.Search;
export default class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: '2015081004',
          name: '蔡宇森',
          number: '2015081004',
          academy: '医学信息工程学院',
        },
      ],
      visible: false,
      current: {},
      currentPage: 2,
    };
    this.modalForm = React.createRef();
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  openModal = record => {
    const ref = this.modalForm.current;
    ref.setFieldsValue(record);
    this.setState({ current: record, visible: true });
  };

  handleOk = value => {
    console.log(value);
  };

  onClickDelete = id => {
    message.success(`删除学生id：${id}`);
  };

  handleSearch = () => {
    console.log('搜索');
  };

  render() {
    const { data, currentPage } = this.state;
    const { match } = this.props;
    const dataV = [
      {
        year: "2019-4-15",
        value: 85
      },
      {
        year: "2019-4-16",
        value: 90
      },
      {
        year: "2019-4-17",
        value: 95
      },
      {
        year: "2019-4-18",
        value: 90
      },
      {
        year: "2019-4-19",
        value: 90
      },
      {
        year: "2019-4-20",
        value: 85
      },
      {
        year: "2019-4-21",
        value: 80
      },
    ];
    const cols = {
      value: {
        min: 0
      },
      year: {
        range: [0, 1]
      }
    };
    const columns = [
      {
        dataIndex: 'number',
        key: 'number',
        title: '学生学号',
      },
      {
        dataIndex: 'name',
        key: 'name',
        title: '学生姓名',
      },
      {
        dataIndex: 'academy',
        key: 'academy',
        title: '学生所属学院',
      },
      // {
      //   dataIndex: 'subject',
      //   key: 'subject',
      //   title: '学生班级',
      // },
      // {
      //   key: 'operation',
      //   title: '操作',
      //   render: (text, record) => (
      //     <span>
      //       <a onClick={this.openModal.bind(this, record)}>修改</a>
      //       <Divider type="vertical" />
      //       <Popconfirm
      //         title="确认删除此学生？"
      //         onConfirm={this.onClickDelete.bind(this, record.id)}
      //       >
      //         <a href="javascript:;">删除</a>
      //       </Popconfirm>
      //     </span>
      //   ),
      // },
    ];
    const pagination = {
      current: currentPage,
      pageSize: 10,
      total: 100,
      onChange: page => {
        this.setState({ currentPage: page });
      },
    };

    return (
      <PageHeaderWrapper title="课程详情">
        <Card>
          <div className={styles.header}>
            <Row>
              <Col span={6}>课程名称：C语言程序设计</Col>
              <Col span={6}>任课教师：张三</Col>
              <Col span={6}>开课时间：2015上</Col>
              <Col span={6}>课程总学生人数：医学信息工程学院</Col>
            </Row>
          </div>
          <div className={styles.header}>
            <Row>
              <Col span={6}>课程总人数：85人</Col>
              <Col span={6}>上课班级：15医工计算机4</Col>
              <Col span={6}>总考勤次数：10次</Col>
              <Col span={6}>课程平均出勤率：90%</Col>
            </Row>
          </div>
          <div className={styles.header}>
            <Row>
              <Col span={24}>
                <Button
                  style={{width: '100%'}}
                  type="primary"
                  onClick={() => {
                    router.push(`${match.url}/checkIn`);
                  }}
                >
                  前往签到
                </Button>
              </Col>
            </Row>
          </div>
          <div className={styles.header}>
            <Row>
              <Col span={24}>
                <ChartCard
                  title="课程出勤率"
                  total={`平均：${90}%`}
                  action={
                    <div>
                      <a>周</a>/
                      <a>月</a>/
                      <a>半年</a>
                    </div>
                  }
                >
                  <Chart height={400} data={dataV} scale={cols} forceFit>
                      <Axis name="year" />
                      <Axis name="value" />
                      <Tooltip
                        crosshairs={{
                          type: "y"
                        }}
                      />
                      <Geom type="line" position="year*value" size={2} />
                      <Geom
                        type="point"
                        position="year*value"
                        size={4}
                        shape={"circle"}
                        style={{
                          stroke: "#fff",
                          lineWidth: 1
                        }}
                      />
                    </Chart>
                </ChartCard>
              </Col>
            </Row>
          </div>
          <div className={styles.header}>
            <Row gutter={24}>
              {/* <Col span={6}>
                <Button type="primary" onClick={this.openModal.bind(this, {})}>
                  添加学生
                </Button>
              </Col> */}
              {/* <Col span={6}>
                <Upload>
                  <Button>
                    <Icon type="upload" />
                    导入学生Excel
                  </Button>
                </Upload>
              </Col> */}
              <Col span={8}>
                <Input placeholder="输入学号搜索" />
              </Col>
              <Col span={8}>
                <Input placeholder="输入姓名搜索" />
              </Col>
              <Col span={8}>
                <Button type="primary" onClick={this.handleSearch}>
                  查询
                </Button>
              </Col>
            </Row>
          </div>
          <Table
            columns={columns}
            pagination={pagination}
            dataSource={data}
            rowKey={record => record.number}
          />
        </Card>
        <EditCourseDetail
          ref={this.modalForm}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          visible={this.state.visible}
          current={this.state.current}
        />
      </PageHeaderWrapper>
    );
  }
}
