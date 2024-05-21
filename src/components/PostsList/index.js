import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, Header, Avatar, Name, ContentView, Content, Actions, LikeButton, Like, TimePost } from './styles';

export default function PostsList({ data }) {
  const { autor, content, likes } = data;

  return (
    <Container>
      <Header>
        <Avatar source={require('../../assets/default-profile-pic.jpg')} />
        <Name>{autor}</Name>
      </Header>
      <ContentView>
        <Content>{content}</Content>
      </ContentView>
      <Actions>
        <LikeButton>
          <Like>{likes}</Like>
          <MaterialCommunityIcons
            name="heart-plus-outline"
            size={20}
            color="#e52246"
          />
        </LikeButton>
        <TimePost>há 10 minutos</TimePost>
      </Actions>
    </Container>
  );
}
