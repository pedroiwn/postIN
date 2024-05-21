import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { AuthContext } from '../../contexts/auth';
import Feather from 'react-native-vector-icons/Feather';



export default function Profile() {
  const { signOut, user } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(null); // Armazena a foto de perfil

  const handleChooseImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      // Atualiza o estado com a imagem selecionada
      setProfilePic(image.path);
      // Faz upload da imagem para o Firebase aqui
    }).catch(error => {
      console.log('Ocorreu um erro ao selecionar a imagem:', error);
    });
  };

 return (
   <View style={styles.container}>
    <View style={styles.profileContainer}>
      <TouchableOpacity onPress={handleChooseImage}>
        <Image 
          source={profilePic ? { uri: profilePic } : require('../../assets/default-profile-pic.jpg')}
          style={styles.profilePic} 
        />
        <View style={styles.editIconContainer}>
          <Feather name="edit-3" size={24} color="#FFF" />
        </View>
      </TouchableOpacity>
      <Text style={styles.username}>{user ? user.nome : 'Nome do Usuário'}</Text>
    </View>
    <View style={styles.stats}>
      {/* Adicione as estatísticas do perfil, como número de posts, seguidores, seguindo, etc. */}
    </View>
    <TouchableOpacity style={styles.logoutButton} onPress={() => signOut()}>
      <Text style={styles.logoutText}>Sair</Text>
    </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  menuOptionText: {
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#B22222',
    borderRadius: 20,
    padding: 8,
  },
  username: {
    color:'#26292f',
    fontSize: 24,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#B22222',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
  },
});
