import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { AuthContext } from '../../contexts/auth';
import Feather from 'react-native-vector-icons/Feather';
import { firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default function Profile() {
  const { signOut, user } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    // Busca a imagem de perfil do Firestore ao carregar o componente
    const userRef = firestore().collection('users').doc(user.uid);
    userRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        if (data.profileImageUrl) {
          setProfilePic(data.profileImageUrl);
        }
      }
    }).catch((error) => {
      console.error('Erro ao buscar a imagem de perfil:', error);
    });
  }, [user]);

  const handleChooseImage = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });

      const uploadTask = firebase.storage().ref(`profileImages/${user.uid}`).putFile(image.path);
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Acompanhar o progresso do upload
        },
        (error) => {
          console.error('Erro ao fazer upload da imagem:', error);
        },
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          const userRef = firestore().collection('profileImages').doc(user.uid);

          userRef.get().then((docSnapshot) => {
            if (docSnapshot.exists) {
              userRef.update({
                profileImageUrl: downloadURL
              }).then(() => {
                setProfilePic(downloadURL);
              }).catch((error) => {
                console.error('Erro ao atualizar o documento do usuário:', error);
              });
            } else {
              console.log('O documento do usuário não existe.');
              userRef.set({
                profileImageUrl: downloadURL
              }).then(() => {
                setProfilePic(downloadURL);
              }).catch((error) => {
                console.error('Erro ao criar o documento do usuário:', error);
              });
            }
          }).catch((error) => {
            console.error('Erro ao verificar a existência do documento do usuário:', error);
          });
        }
      );
    } catch (error) {
      console.error('Ocorreu um erro ao selecionar a imagem:', error);
    }
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
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => signOut()}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  logoutContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoutButton: {
    width: '35%',
    backgroundColor: '#B22222',
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 18,
  },
});
