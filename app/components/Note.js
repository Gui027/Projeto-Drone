import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../misc/colors';

const Note = ({ item, onPress }) => {
  const { produtor, localizacaoPropriedade, dataAplicacao } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.produtorTitle} numberOfLines={2}>PRODUTOR:</Text>
      <Text style={styles.produtor} numberOfLines={2}>{produtor}</Text>
      <Text style={styles.produtorTitle} numberOfLines={2}>LOCALIZAÇÃO:</Text>
      <Text style={styles.produtor} numberOfLines={2}>{localizacaoPropriedade}</Text>
      <Text style={styles.produtorTitle} numberOfLines={2}>DATA:</Text>
      <Text style={styles.produtor} numberOfLines={2}>{dataAplicacao}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: 370,
    padding: 8,
    borderRadius: 20,
  },
  produtor: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#756686",
    marginBottom: 6,
  },
  produtorTitle: {
    fontWeight: 600,
    color: "#998DAF",
    fontWeight: 500,
    fontSize: 12,
  },
  localizacaoPropriedade: {
    fontWeight: 'bold',
    fontSize: 17,
    // color: colors.LIGHT,
  },
});

export default Note;
