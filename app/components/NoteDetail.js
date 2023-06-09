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
        width: 400px;
        margin-bottom: 20px;
        margin-top: -20px;
      }

      h1 {
        color: blue;
      }

      h2 {
        font-size: 15px;
        color: #998DAF;
        margin-bottom: 0px;
      }

      p {
        color: #554969;
        font-weight: bold;
        margin-top: 0px;
      }

      .pai-card{
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .card {
        border: 1px solid #ccc;
        border-radius: 30px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        width: 450px;
        color: 
      }
      
      .card img {
        display: block;
        width: 100%;
      }
      
      .card-body {
        // display: flex;
        // flex-direction: column;
        padding: 10px;
      }
      
      .card-body h2 {
        font-size: 16px;
        margin-top: 3px;
        margin-bottom: 0px;
      }

      .card-body p {
        font-size: 23px;
        color: #554969;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
  <div class="imagem-container">
    <img src="https://i.postimg.cc/jqvsQ3M9/Captura-de-tela-2023-04-18-212100.png" alt="Logo">
  </div>
  <div class="pai-card">
    <div class="card">
      <div class="card-body">
          <div class="value">
            <h2>Produtor:</h2>
            <p>${note.produtor}</p>
          </div>
          <div class="value">
            <h2>Localização da Propriedade:</h2>
            <p>${note.localizacaoPropriedade}</p>
          </div>
          <div class="value">
            <h2>Data de Aplicação:</h2>
            <p>${note.dataAplicacao}</p>
          </div>
          <div class="value">
            <h2>Tamanho da Área:</h2>
            <p>${note.tamanhoArea}</p>
          </div>
          <div class="value">
            <h2>Cultura:</h2>
            <p>${note.cultura}</p>
          </div>
          <div class="value">
            <h2>Temperatura:</h2>
            <p>${note.temperatura}</p>
          </div>
          <div class="value">
            <h2>Umidade do Ar:</h2>
            <p>${note.umidadeRelativaDoAr}</p>
          </div>
          <div class="value">
            <h2>Velocidade do Vento:</h2>
            <p>${note.velocidadeVento}</p>
          </div>
          <div class="value">
            <h2>Volume de Calda/Há:</h2>
            <p>${note.volumeCalda}</p>
          </div>
          <div class="value">
            <h2>Largura de Faixa:</h2>
            <p>${note.larguraFaixa}</p>
          </div>
          <div class="value">
            <h2>Altura de Voo:</h2>
            <p>${note.alturaVoo}</p>
          </div>
          <div class="value">
            <h2>Produtos Utilizados:</h2>
            <p>${note.produtosUtilizados}</p>
          </div>
      </div>
    </div>
  </div>
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
        <Text style={styles.produtorTitle}>Produtor:</Text>
        <Text style={styles.produtor}>{note.produtor}</Text>
        <Text style={styles.produtorTitle}>Localização da Propriedade:</Text>
        <Text style={styles.produtor}>{note.localizacaoPropriedade}</Text>
        <Text style={styles.produtorTitle}>Data da Aplicação:</Text>
        <Text style={styles.produtor}>{note.dataAplicacao}</Text>
        <Text style={styles.produtorTitle}>Tamanho da Área:</Text>
        <Text style={styles.produtor}>{note.tamanhoArea}</Text>
        <Text style={styles.produtorTitle}>Cultura:</Text>
        <Text style={styles.produtor}>{note.cultura}</Text>
        <Text style={styles.produtorTitle}>Temperatura:</Text>
        <Text style={styles.produtor}>{note.temperatura}</Text>
        <Text style={styles.produtorTitle}>Umidade Relativa do Ar:</Text>
        <Text style={styles.produtor}>{note.umidadeRelativaDoAr}</Text>
        <Text style={styles.produtorTitle}>Velocidade do Vento:</Text>
        <Text style={styles.produtor}>{note.velocidadeVento}</Text>
        <Text style={styles.produtorTitle}>Volume de Calda:</Text>
        <Text style={styles.produtor}>{note.volumeCalda}</Text>
        <Text style={styles.produtorTitle}>Largura de Faixa:</Text>
        <Text style={styles.produtor}>{note.larguraFaixa}</Text>
        <Text style={styles.produtorTitle}>Altura de Voô:</Text>
        <Text style={styles.produtor}>{note.alturaVoo}</Text>
        <Text style={styles.produtorTitle}>Produtos Utilizados:</Text>
        <Text style={styles.produtor}>{note.produtosUtilizados}</Text>
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
    fontWeight: "bold",
    fontSize: 22,
    opacity: 0.6,
    marginBottom: 6,
  },
  produtorTitle: {
    fontWeight: 600,
    color: "#998DAF",
    fontSize: 18,
    opacity: 0.6,
  },
  localizacaoPropriedade: {
    fontSize: 20,
    opacity: 0.6,
  },
  localizacaoPropriedadeTitle: {
    fontSize: 20,
    opacity: 0.6,
  },
  dataAplicacao: {
    fontSize: 20,
    opacity: 0.6,
  },
  dataAplicacaoTitle: {
    fontSize: 20,
    opacity: 0.6,
  },
  tamanhoArea: {
    fontSize: 20,
    opacity: 0.6,
  },
  tamanhoAreaTitle: {
    fontSize: 20,
    opacity: 0.6,
  },
  cultura: {
    fontSize: 20,
    opacity: 0.6,
  },
  culturaTitle: {
    fontSize: 20,
    opacity: 0.6,
  },
  temperatura: {
    fontSize: 20,
    opacity: 0.6,
  },
  temperaturaTitle: {
    fontSize: 20,
    opacity: 0.6,
  },
  umidadeRelativaDoAr: {
    fontSize: 20,
    opacity: 0.6,
  },
  umidadeRelativaDoArTitle: {
    fontSize: 20,
    opacity: 0.6,
  },
  velocidadeVento: {
    fontSize: 20,
    opacity: 0.6,
  },
  velocidadeVentoTitle: {
    fontSize: 20,
    opacity: 0.6,
  },
  volumeCalda: {
    fontSize: 20,
    opacity: 0.6,
  },
  volumeCaldaTitle: {
    fontSize: 20,
    opacity: 0.6,
  },
  larguraFaixa: {
    fontSize: 20,
    opacity: 0.6,
  },
  larguraFaixaTitle: {
    fontSize: 20,
    opacity: 0.6,
  },
  alturaVoo: {
    fontSize: 20,
    opacity: 0.6,
  },
  alturaVooTitle: {
    fontSize: 20,
    opacity: 0.6,
  },
  produtosUtilizados: {
    fontSize: 20,
    opacity: 0.6,
  },
  produtosUtilizadosTitle: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  timeTitle: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
  btnContainerTitle: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  }
});

export default NoteDetail;
