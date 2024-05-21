import React from 'react';
import { Text } from 'react-native';
import { Container } from './styles';
import { Title } from './TitleStyles';
export default function Header() {
  return (
    <Container>
      <Title>
        Post
        <Text style={{ color: '#B22222' }}>IN</Text>
      </Title>
    </Container>
  );
}
