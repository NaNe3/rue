import { Text, View, StyleSheet, Image } from 'react-native';
import BasicButton from '../components/BasicButton';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.rue}>RUE</Text>
      <Image source={require('../../assets/duo.png')} style={{ width: 300, height: 300 }} />
      <BasicButton
        title="NEXT"
        onPress={() => navigation.navigate('Screen2')}
        style={{ position: 'absolute', bottom: 60 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  rue: {
    fontSize: 80,
    fontFamily: 'nunito-bold',
    marginTop: 80,
  }
})