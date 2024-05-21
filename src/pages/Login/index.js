import React, { useState, useContext } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native'; // Remove Button da importação
import Styled from 'styled-components/native';
import { AuthContext } from '../../contexts/auth';

const Container = Styled.View`
  flex: 1;
  background-color: #36393F;
  justify-content: center;
  align-items: center;
`;

const Title = Styled.Text`
  color: #FFF;
  font-size: 65px;
  font-weight: bold;
`;

const Input = Styled.TextInput`
  width: 65%;
  background-color: #26292f;
  padding: 10px;
  margin-top: 20px;
  border-radius: 30px;
  font-size: 17px;
`;

const Button = Styled.TouchableOpacity`
  width: 25%;
  background-color: #000000;
  margin-top: 30px;
  padding: 10px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = Styled.Text`
  color: #FFF;
  font-size: 17px;
`;

const SignUpButton = Styled.TouchableOpacity`
  width: 100%;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const SignUpText = Styled.Text`
  color: #FFFFFF;
  font-size: 15px;
`;

const Login = () => {
  const { signIn, signUp, loadingAuth } = useContext(AuthContext);
  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toggleLogin = () => {
    setLogin(!login);
    setName('');
    setEmail('');
    setPassword('');
  };
      
  const handleLogin = () => {
    if (!email || !password) {
      setError('Preencha corretamente todos os campos!');
      setTimeout(() => {
        setError('');
      }, 3000); // Limpa o erro após 3 segundos
      return;
    }
    signIn(email, password);
  };

  const handleSignUp = () => {
    if (!name || !email || !password) {
      setError('Preencha corretamente todos os campos!');
      setTimeout(() => {
        setError('');
      }, 3000); // Limpa o erro após 3 segundos
      return;
    }
    signUp(email, password, name);
  };
  return (
    <Container>
      <Title>
        Post<Text style={{ color: '#B22222' }}>IN</Text>
      </Title>
      <Text style={{ color: 'white', marginTop: 10, marginBottom: 10 }}>{error}</Text>
      {!login && (
        <Input
          placeholder='Nome'
          value={name}
          onChangeText={setName}
        />
      )}
      <Input
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder='Senha'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={login ? handleLogin : handleSignUp}>
        {loadingAuth ? (
          <ActivityIndicator size={20} color="#FFF" />
        ) : (
          <ButtonText>{login ? 'Entrar' : 'Cadastrar'}</ButtonText>
        )}
      </Button>
      <SignUpButton onPress={toggleLogin}>
        <SignUpText>{login ? 'Criar uma conta' : 'Já tenho uma conta'}</SignUpText>
      </SignUpButton>
    </Container>
  );
};

export default Login;
