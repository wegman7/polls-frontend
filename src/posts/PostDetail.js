import React, { useState, useEffect } from 'react';
import { getPostById, deletePostById } from '../util/ApiCalls';
import './posts.css';

import { List, Avatar, Button, notification } from 'antd';
import { Link } from 'react-router-dom';

const PostDetail = (props) => {

    const [post, setPost] = useState('');

    useEffect(() => {
        if (post === '') {
            fetchPost();
        }
    })

    const fetchPost = () => {
        const promise = getPostById(props.match.params.postId);
        promise
            .then(response => {
                let data = [{
                    id: response.data.postId,
                    href: null,
                    title: response.data.title,
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: response.data.content,
                    user: response.data.user
                }];
                setPost(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const onDelete = () => {
        const promise = deletePostById(props.match.params.postId);
        promise
            .then(response => {
                notification.success({
                    description: 'Delete post.'
                });
                props.history.push('/posts/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    const editAndUpdateButtons = () => {
        if (post[0] && post[0].user.id === props.user.id) {
            return (
                <div>
                    <Button type="primary">
                        <Link 
                            to={{
                                pathname:"/posts/edit/" + post[0].id + "/",
                                state: { post: post[0] }
                            }}>
                            Edit
                        </Link>
                    </Button>
                    <Button id="delete" type="primary" onClick={onDelete}>Delete</Button>
                </div>
            );
        } else {
            return null;
        }
    }

    return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={post}
                footer={
                <div>
                    {null}
                </div>
                }
                renderItem={item => (
                <List.Item
                    key={item.id}
                >
                    <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.title}
                    // description={item.description}
                    />
                    {item.content}
                </List.Item>
                )}
            />
            {editAndUpdateButtons()}
        </div>
    )
}

export default PostDetail;