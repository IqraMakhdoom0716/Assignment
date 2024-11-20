import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import './Form.scss'
const { Option } = Select;

const DynamicForm = ({ type, initialValues, authors, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  // Define form fields based on the type (courses or authors)
  const getFields = () => {
    if (type === 'course') {
      return [
        {
          label: 'Title',
          name: 'title',
          type: 'text',
          rules: [{ required: true, message: 'Please enter the course title' }],
        },
        {
          label: 'Author Name',
          name: 'author',
          type: 'select',
          options: authors.map((author) => ({
            label: author.name,
            value: author.id,
          })),
          rules: [{ required: true, message: 'Please select an author' }],
        },
        {
          label: 'Description',
          name: 'description',
          type: 'textarea',
          rules: [{ required: true, message: 'Please enter a description' }],
        },
      ];
    } else if (type === 'author') {
      return [
        {
          label: 'Author Name',
          name: 'name',
          type: 'text',
          rules: [{ required: true, message: 'Please enter the author name' }],
        },
      ];
    }
    return [];
  };

  const fields = getFields();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      className="dynamic-form"
    >
      {fields.map(({ label, name, type, options, rules }) => (
        <Form.Item key={name} label={label} name={name} rules={rules}>
          {type === 'text' && <Input />}
          {type === 'textarea' && <Input.TextArea />}
          {type === 'select' && (
            <Select>
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      ))}
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default DynamicForm;
