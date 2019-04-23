import React from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class EditCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOk = () => {
    const { validateFields, resetFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        const rangeValue = values['time'];
        const value = {
          ...values,
          time: [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
        };
        this.props.handleOk(value);
        this.props.handleCancel();
      }
    });
  };

  render() {
    const {
      visible,
      handleCancel,
      form: { getFieldDecorator, resetFields },
      academyArr,
      classArr,
      teacherArr
    } = this.props;
    const academy = [
      { id: '1', name: '医学信息工程学院', value: '医工' },
      { id: '2', name: '中医药学院', value: '中医药' },
    ];

    return (
      <Modal
        title={`${this.props.current.name ? '修改' : '添加'}课程`}
        visible={visible}
        onCancel={handleCancel}
        onOk={this.handleOk}
        afterClose={() => resetFields()}
      >
        <Form>
          <FormItem label="课程名称">
            {getFieldDecorator('name', { rules: [{ required: true, message: '请输入课程名称' }] })(<Input />)}
          </FormItem>
          <FormItem label="课程所属学院">
            {getFieldDecorator('academyId', { rules: [{ required: true, message: '请选择学院' }] })(
              <Select
                showSearch
                optionFilterProp="children"
              >
                {academyArr.map((item, index) => {
                  return (
                    <Option key={item.academyId} value={item.academyId}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="上课班级">
            {getFieldDecorator('classId', { rules: [{ required: true, message: "请输入上课班级"}] })(
              <Select
                showSearch
                optionFilterProp="children"
              >
                {classArr.map((item, index) => {
                  return (
                    <Option key={item.classId} value={item.classId}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="任教老师">
            {getFieldDecorator('teacherId', { rules: [{ required: true, message: "请输入任教老师工号"}] })(
              <Select
                showSearch
                optionFilterProp="children"
              >
                {teacherArr.map((item, index) => {
                  return (
                    <Option key={item.teacherId} value={item.teacherId}>
                      {item.truename}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="课程时间">
            {getFieldDecorator('giveDate', { rules: [{ required: true, message: '请选择课程时间' }] })(
              <Select>
                <Option key="2019上">2019上</Option>
                <Option key="2019下">2019下</Option>
                <Option key="2020上">2020上</Option>
                <Option key="2020下">2020下</Option>
                <Option key="2021上">2021上</Option>
                <Option key="2021下">2021下</Option>
              </Select>
            )}
          </FormItem>
          {/* <FormItem label="上课人数">
            {getFieldDecorator('totalNum', { rules: [{ required: true, message: "请输入上课人数"}] })(<Input />)}
          </FormItem> */}
          {/* <FormItem label="开课时间">
            {getFieldDecorator('time', { rules: [{ required: true }] })(
              <RangePicker style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem label="任课教师">
            {getFieldDecorator('teacher', { rules: [{ required: true }] })(
              <Select mode="multiple">
                <Option key="001">某教师（医学信息工程学院）</Option>
                <Option key="002">某某教师（某某学院）</Option>
              </Select>
            )}
          </FormItem> */}
        </Form>
      </Modal>
    );
  }
}

export default EditCourse;
