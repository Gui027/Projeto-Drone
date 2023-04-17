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
  const { produtor, localizacaoPropriedade } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.produtor} numberOfLines={2}>
        {localizacaoPropriedade}
      </Text>
      <Text style={styles.localizacaoPropriedade} numberOfLines={2}>{produtor}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
  },
  produtor: {
    fontWeight: 'bold',
    fontSize: 26,
    color: colors.LIGHT,
  },
  localizacaoPropriedade: {
    fontWeight: 'bold',
    fontSize: 17,
    // color: colors.LIGHT,
  },
});

export default Note;
