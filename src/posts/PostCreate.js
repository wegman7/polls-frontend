import { createPost } from '../util/ApiCalls';

import { Form, Input, Button, notification } from 'antd';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 12 },
};
  
const PostCreate = (props) => {

    const onFinish = values => {
        console.log('Success:', values);

        const promise = createPost(values.title, values.content);
        promise
            .then(response => {
                notification.success({
                    description: 'Created post.'
                });
                props.history.push('/posts/');
            })
            .catch(error => {
                console.log(error);
            })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input a title!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Content"
                name="content"
                rules={[{ required: true, message: 'Please input content!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Post
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PostCreate;