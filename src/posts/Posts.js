import React, { useState, useEffect } from 'react';
import { getPosts } from '../util/ApiCalls';

import { List, Avatar, Button } from 'antd';

const Posts = (props) => {

    if (!props.isAuthenticated) {
        props.history.push('/');
    }

    const [posts, setPosts] = useState('');

    useEffect(() => {
        if (posts === '') {
            fetchPosts();
        }
    })

    const fetchPosts = () => {
        const promise = getPosts();
        promise
            .then(response => {
                let data = response.data.map(post => ({
                    id: post.postId,
                    href: post.postId,
                    title: post.title,
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: post.content
                }));
                setPosts(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const onPost = () => {
        // props.history.push('/test/');
        props.history.push('/posts/create/');
    }

    return (
        <div>
            <Button type="primary" onClick={onPost}>Create post</Button>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
                }}
                dataSource={posts}
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
                    // title={<a href={item.href}>{'detail/' + item.title}</a>}
                    title={<a href={'detail/' + item.href}>{item.title}</a>}
                    description={item.description}
                    />
                    {item.content}
                </List.Item>
                )}
            />
        </div>
    )
}

export default Posts;