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
import { log } from 'util';
import qs from 'qs'
import request from "@/utils/request"
import url from "@/utils/url"

const Search = Input.Search;
export default class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          studentId: '2015081004',
          studentTruename: '蔡宇森',
          studentNum: '2015081004',
          attendanceRateOfStudent: '99%'
        },
      ],
      visible: false,
      current: {},
      currentPage: 1,
      total: 0,
      studentNum: '',
      truename: '',
      loading: true,
      courseDetailData: {
        name: 'C语言程序设计',
        teacherTruename: '张三',
        giveDate: '2015上',
        academyName: '医学信息工程学院',
        studentCount: 85,
        className: '15医工计算机4'
      },
      courseAttendanceData: {
        totalAttendanceNum: 10,
        totalAttendanceRate: 98.75,
      }
    };
    this.modalForm = React.createRef();
  }

  async componentDidMount() {
    const { courseId } = this.props.match.params // 获取到courseId
    console.log(courseId)
    // await this.getCourseDetailData()
    // await this.getCourseAttendanceData()
    // await this.getCourseStudent()
  }

  getCourseDetailData = () => {
    const { courseId } = this.props.match.params
    return request(`${url}/course/${courseId}`, { method: 'GET' })
    .then((response) => {
      const { data: { content } } = response
      this.setState({
        courseDetailData: content
      })
    })
    .catch((err) => {
      message.error('获取课程详情数据失败')
      console.log('err', err)
    })
  }

  getCourseAttendanceData = () => {
    const { courseId } = this.props.match.params
    return request(`${url}/attendance/queryAttendanceCountAndRateOfCourse/${courseId}`, { method: 'GET' })
    .then((response) => {
      const { data: { content } } = response
      this.setState({
        courseAttendanceData: content
      })
    })
    .catch((err) => {
      message.error('获取考勤数据失败')
      console.log('err', err)
    })
  }

  getCourseStudent = () => {
    this.setState({
      loading: true,
    })
    const { courseId } = this.props.match.params
    const { studentNum, currentPage, truename, sortField, direction } = this.state
    return request(`${url}/attendance/queryAttendanceRateOfStudents/${currentPage}/10`,
    {
      method: 'POST',
      body: {
        studentNum, truename, sortField, direction,
        courseId
      }
    })
    .then((response) => {
      const { data: { content } } = response
      this.setState({
        data: content,
        loading: false,
      })
    })
    .catch((err) => {
      message.error('获取学生数据失败')
      console.log('err', err)
    })
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

  handleChangeSearch = (key, event) => {
    if (key === 'academyId') {
      this.setState({
        [key]: event
      })
    } else {
      this.setState({
        [key]: event.target.value
      })
    }
  }

  handleSearch = () => {
    this.getCourseStudent()
  };

  render() {
    const {
      data,
      currentPage,
      total,
      loading,
      courseDetailData: {
        name, teacherTruename, className,  giveDate, studentCount, academyName
      },
      courseAttendanceData: {
        totalAttendanceNum, totalAttendanceRate
      }
    } = this.state;
    const { match } = this.props;
    const dataV = [
      {
        date: "2019-4-15",
        value: 85
      },
      {
        date: "2019-4-16",
        value: 90
      },
      {
        date: "2019-4-17",
        value: 95
      },
      {
        date: "2019-4-18",
        value: 90
      },
      {
        date: "2019-4-19",
        value: 90
      },
      {
        date: "2019-4-20",
        value: 85
      },
      {
        date: "2019-4-21",
        value: 80
      },
      {
        date: "2019-4-22",
        value: 85
      },
      {
        date: "2019-4-24",
        value: 85
      },
      {
        date: "2019-4-25",
        value: 85
      },
      {
        date: "2019-4-26",
        value: 85
      },
      {
        date: "2019-4-27",
        value: 85
      },
      {
        date: "2019-4-28",
        value: 85
      },
      {
        date: "2019-4-29",
        value: 85
      },
      {
        date: "2019-4-30",
        value: 85
      },
    ];
    const cols = {
      value: {
        alias: '出勤率'
      },
      date: {
        alias: '日期时间'
      }
    };
    const columns = [
      {
        dataIndex: 'studentNum',
        key: 'studentNum',
        title: '学生学号',
      },
      {
        dataIndex: 'studentTruename',
        key: 'studentTruename',
        title: '学生姓名',
      },
      {
        dataIndex: 'attendanceRateOfStudent',
        key: 'attendanceRateOfStudent',
        title: '出勤率',
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
      total,
      onChange: page => {
        this.setState({ currentPage: page }, () => {
          this.getCourseStudent()
        });
      },
    };

    return (
      <PageHeaderWrapper title="课程详情">
        <Card>
          <div className={styles.header}>
            <Row>
              <Col span={6}>课程名称：{name}</Col>
              <Col span={6}>任课教师：{teacherTruename}</Col>
              <Col span={6}>开课时间：{giveDate}</Col>
              <Col span={6}>课程所属学院：{academyName}</Col>
            </Row>
          </div>
          <div className={styles.header}>
            <Row>
              <Col span={6}>课程总人数：{studentCount}人</Col>
              <Col span={6}>上课班级：{className}</Col>
              <Col span={6}>总考勤次数：{totalAttendanceNum}次</Col>
              <Col span={6}>课程平均出勤率：{totalAttendanceRate}%</Col>
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
                      <Axis name="date" />
                      <Axis name="value" />
                      <Tooltip
                        crosshairs={{
                          type: "y"
                        }}
                      />
                      <Geom type="line" position="date*value" size={1} />
                      <Geom
                        type="point"
                        position="date*value"
                        size={2}
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
                <Input disabled={loading} allowClear onChange={this.handleChangeSearch.bind(this, 'studentNum')} placeholder="输入学号搜索" />
              </Col>
              <Col span={8}>
                <Input disabled={loading} allowClear onChange={this.handleChangeSearch.bind(this, 'truename')} placeholder="输入姓名搜索" />
              </Col>
              <Col span={8}>
                <Button disabled={loading} type="primary" onClick={this.handleSearch}>
                  查询
                </Button>
              </Col>
            </Row>
          </div>
          <Table
            columns={columns}
            pagination={pagination}
            dataSource={data}
            loading={loading}
            rowKey={record => record.studentId}
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
