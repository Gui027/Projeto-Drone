import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../contexts/NoteProvider';
import NoteInputModal from './NoteInputModal';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

const formatDate = ms => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetail = props => {
  const [note, setNote] = useState(props.route.params.note);
  const headerHeight = useHeaderHeight();
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Tem certeza?',
      'Esta ação excluirá sua nota permanentemente!',
      [
        {
          text: 'Deletar',
          onPress: deleteNote,
        },
        {
          text: 'Cancelar',
          onPress: () => console.log('no thanks'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  // const html = `
  //     <html>
  //       <body>
  //         <h1> Produtor: ${note.produtor} </h1>
  //         <h1> Localização da Propriedade: ${note.localizacaoPropriedade} </h1>
  //         <h1> Data de Aplicação: ${note.dataAplicacao} </h1>
  //         <h1> Tamanho da Área: ${note.tamanhoArea} </h1>
  //         <h1> Cultura: ${note.cultura} </h1>
  //         <h1> Temperatura: ${note.temperatura} </h1>
  //         <h1> Umidade do Ar: ${note.umidadeRelativaDoAr} </h1>
  //         <h1> Velocidade do Vento: ${note.velocidadeVento} </h1>
  //         <h1> Volume de Calda/Há: ${note.volumeCalda} </h1>
  //         <h1> Largura de Faixa: ${note.larguraFaixa} </h1>
  //         <h1> Altura de Voo: ${note.alturaVoo} </h1>
  //         <h1> Produtos Utilizados: ${note.produtosUtilizados} </h1>
  //       </body>
  //     </html>
  //   `;

  const html = `
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Exemplo de HTML com CSS embutido</title>
    <style>
    .imagem-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
      img {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        align-self: center;
      }
      h1 {
        color: blue;
      }

      p {
        font-size: 18px;
        line-height: 1.5;
      }
    </style>
  </head>
  <body>
  <div class="imagem-container">
    <img src="https://t3.ftcdn.net/jpg/03/31/44/70/360_F_331447075_LlfXoJm2qdHCjuhn3igNO8qVSbahgncr.jpg" alt="Logo">
  </div>
    <h1>Olá, mundo!</h1>
    <p>Este é um exemplo básico de um documento HTML com CSS embutido.</p>
  </body>
</html>
  `

  let exportPdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false
    });

    await shareAsync(file.uri);
  }

  const handleUpdate = async (
    produtor,
    localizacaoPropriedade,
    dataAplicacao,
    tamanhoArea,
    cultura,
    temperatura,
    umidadeRelativaDoAr,
    velocidadeVento,
    volumeCalda,
    larguraFaixa,
    alturaVoo,
    produtosUtilizados,
    time
  ) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => {
      if (n.id === note.id) {
        n.produtor = produtor;
        n.localizacaoPropriedade = localizacaoPropriedade;
        n.dataAplicacao = dataAplicacao;
        n.cultura = cultura;
        n.tamanhoArea = tamanhoArea;
        n.temperatura = temperatura;
        n.umidadeRelativaDoAr = umidadeRelativaDoAr;
        n.velocidadeVento = velocidadeVento;
        n.volumeCalda = volumeCalda;
        n.larguraFaixa = larguraFaixa;
        n.alturaVoo = alturaVoo;
        n.produtosUtilizados = produtosUtilizados;
        n.isUpdated = true;
        n.time = time;

        setNote(n);
      }
      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
      >
        <Text style={styles.time}>
          {note.isUpdated
            ? `Atualizado em ${formatDate(note.time)}`
            : `Criado em ${formatDate(note.time)}`}
        </Text>
        <Text style={styles.produtor}>{note.produtor}</Text>
        <Text style={styles.localizacaoPropriedade}>{note.localizacaoPropriedade}</Text>
        <Text style={styles.dataAplicacao}>{note.dataAplicacao}</Text>
        <Text style={styles.tamanhoArea}>{note.tamanhoArea}</Text>
        <Text style={styles.cultura}>{note.cultura}</Text>
        <Text style={styles.temperatura}>{note.temperatura}</Text>
        <Text style={styles.umidadeRelativaDoAr}>{note.umidadeRelativaDoAr}</Text>
        <Text style={styles.velocidadeVento}>{note.velocidadeVento}</Text>
        <Text style={styles.volumeCalda}>{note.volumeCalda}</Text>
        <Text style={styles.larguraFaixa}>{note.larguraFaixa}</Text>
        <Text style={styles.alturaVoo}>{note.alturaVoo}</Text>
        <Text style={styles.produtosUtilizados}>{note.produtosUtilizados}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName='pdffile1'
          onPress={exportPdf}
          style={{ backgroundColor: colors.PDFBUTTON, marginBottom: 15 }} />
        <RoundIconBtn
          antIconName='delete'
          style={{ backgroundColor: colors.DELETEBUTTON, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn
          antIconName='edit'
          style={{ backgroundColor: colors.EDITBUTTON }}
          onPress={openEditModal} />
      </View>
      <NoteInputModal
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 15,
  },
  produtor: {
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  localizacaoPropriedade: {
    fontSize: 20,
    opacity: 0.6,
  },
  dataAplicacao: {
    fontSize: 20,
    opacity: 0.6,
  },
  tamanhoArea: {
    fontSize: 20,
    opacity: 0.6,
  },
  cultura: {
    fontSize: 20,
    opacity: 0.6,
  },
  temperatura: {
    fontSize: 20,
    opacity: 0.6,
  },
  umidadeRelativaDoAr: {
    fontSize: 20,
    opacity: 0.6,
  },
  velocidadeVento: {
    fontSize: 20,
    opacity: 0.6,
  },
  volumeCalda: {
    fontSize: 20,
    opacity: 0.6,
  },
  larguraFaixa: {
    fontSize: 20,
    opacity: 0.6,
  },
  alturaVoo: {
    fontSize: 20,
    opacity: 0.6,
  },
  produtosUtilizados: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

export default NoteDetail;
