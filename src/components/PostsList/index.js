import React from 'react';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Container, Header, Avatar, Name, ContentView, Content, Actions, LikeButton, Like, TimePost } from './styles';

export default function PostsList({ data, userId }) {
  const { autor, content, likes, created } = data;

  function formatTimePost() {
    if (created && created.seconds) {
      const datePost = new Date(created.seconds * 1000);
      return formatDistanceToNow(datePost, { locale: ptBR }) + ' atrás';
    }
    return '';
  }

  async function likePost(id, likes) {
    const docId = `${userId}_${id}`;

    const doc = await firestore().collection('likes').doc(docId).get();

    if (doc.exists) {
      await firestore().collection('posts').doc(id).update({
        likes: likes - 1
      });

      await firestore().collection('likes').doc(docId).delete();

      return;
    }

    await firestore().collection('likes').doc(docId).set({
      postId: id,
      userId: userId,
    });

    await firestore().collection('posts').doc(id).update({
      likes: likes + 1
    });
  }

  return (
    <Container>
      <Header>
        {data.avatarUrl ? (
          <Avatar source={{ uri: data.avatarUrl }} />
        ) : (
          <Avatar source={require('../../assets/default-profile-pic.jpg')} />
        )}
        <Name>{autor}</Name>
      </Header>

      <ContentView>
        <Content>{content}</Content>
      </ContentView>

      <Actions>
        <LikeButton onPress={() => likePost(data.id, likes)}>
          <Like>{likes === 0 ? '' : likes}</Like>
          <MaterialCommunityIcons
            name={likes === 0 ? 'heart-plus-outline' : 'cards-heart'}
            size={20}
            color="#e52246"
          />
        </LikeButton>

        <TimePost>{formatTimePost()}</TimePost>
      </Actions>
    </Container>
  );
}
