import { updatePostById } from '../util/ApiCalls';

import { Form, Input, Button, notification } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
  
const PostEdit = (props) => {

    const onFinish = values => {
        console.log('Success:', values);

        const promise = updatePostById(values.title, values.content, props.match.params.postId);
        promise
            .then(response => {
                notification.success({
                    description: 'Updated post.'
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
            initialValue={props.history.location.state.post.title}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'Please input content' }]}
            initialValue={props.history.location.state.post.content}
        >
            <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>
    );
};

export default PostEdit;