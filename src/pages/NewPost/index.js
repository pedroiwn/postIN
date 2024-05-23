import React, { useState, useLayoutEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';

import { Container, Input, Button, ButtonText } from './styles';

export default function NewPost() {
  const navigation = useNavigation();
  const [post, setPost] = useState('');
  const { user } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => handlePost()}>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      ),
    });
  }, [navigation, post]);

  async function handlePost() {
    if (post === '') {
      console.log('Seu post contém conteúdo inválido.');
      return;
    }

    let avatarUrl = null;
    try {
      // Recupera a URL da imagem de perfil do Firebase Storage
      const response = await storage().ref(`profileImages/${user?.uid}`).getDownloadURL();
      avatarUrl = response;
    } catch (err) {
      avatarUrl = null;
    }

    // Adiciona o novo post no Firestore
    await firestore().collection('posts')
      .add({
        created: new Date(),
        content: post,
        autor: user.nome,
        likes: 0,
        avatarUrl,
        userId: user.uid,
      })
      .then(() => {
        setPost('');
        console.log('POST CRIADO COM SUCESSO');
      })
      .catch((error) => {
        console.log(error);
      });

    navigation.goBack();
  }

  return (
    <Container>
      <Input
        placeholder="O que você está pensando"
        placeholderTextColor="#DDD"
        multiline={true}
        maxLength={300}
        value={post}
        onChangeText={(text) => setPost(text)}
        autoCorrect={false}
      />
    </Container>
  );
}
