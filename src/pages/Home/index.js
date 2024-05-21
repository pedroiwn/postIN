import React, { useState, useContext, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';
import { View, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Header from '../../components/Header';
import PostsList from '../../components/PostsList';

const Container = styled.View`
  flex: 1;
  background-color: #26292f;
`;

const ListPosts = styled.FlatList`
  flex: 1;
  background-color: #f1f1f1;
`;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const subscriber = firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .onSnapshot(snapshot => {
        const postList = [];
        snapshot.forEach(doc => {
          postList.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setPosts(postList);
        setLoading(false);
      });

    return () => subscriber();

  }, []);

  return (
    <Container>
      <Header />

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={50} color="#e52246" />
        </View>
      ) : (
        <ListPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({ item }) => <PostsList data={item} userId={user.uid} />}
        />
      )}

    </Container>
  );
}
