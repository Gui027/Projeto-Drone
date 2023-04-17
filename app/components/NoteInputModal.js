import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  // Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [produtor, setProdutor] = useState('');
  const [localizacaoPropriedade, setLocalizacaoPropriedade] = useState('');
  const [dataAplicacao, setDataAplicacao] = useState('');
  const [tamanhoArea, setTamanhoArea] = useState('');
  const [cultura, setCultura] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [umidadeRelativaDoAr, setUmidadeRelativaDoAr] = useState('');
  const [velocidadeVento, setVelocidadeVento] = useState('');
  const [volumeCalda, setVolumeCalda] = useState('');
  const [larguraFaixa, setLarguraFaixa] = useState('');
  const [alturaVoo, setAlturaVoo] = useState('');
  const [produtosUtilizados, setProdutosUtilizados] = useState('');

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setProdutor(note.produtor);
      setLocalizacaoPropriedade(note.localizacaoPropriedade);
      setDataAplicacao(note.dataAplicacao);
      setTamanhoArea(note.tamanhoArea);
      setCultura(note.cultura);
      setTemperatura(note.temperatura);
      setUmidadeRelativaDoAr(note.umidadeRelativaDoAr);
      setVelocidadeVento(note.velocidadeVento);
      setVolumeCalda(note.volumeCalda);
      setLarguraFaixa(note.larguraFaixa);
      setAlturaVoo(note.alturaVoo);
      setProdutosUtilizados(note.produtosUtilizados);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'produtor') setProdutor(text);
    if (valueFor === 'localizacaoPropriedade') setLocalizacaoPropriedade(text);
    if (valueFor === 'dataAplicacao') setDataAplicacao(text);
    if (valueFor === 'tamanhoArea') setTamanhoArea(text);
    if (valueFor === 'cultura') setCultura(text);
    if (valueFor === 'temperatura') setTemperatura(text);
    if (valueFor === 'umidadeRelativaDoAr') setUmidadeRelativaDoAr(text);
    if (valueFor === 'velocidadeVento') setVelocidadeVento(text);
    if (valueFor === 'volumeCalda') setVolumeCalda(text);
    if (valueFor === 'larguraFaixa') setLarguraFaixa(text);
    if (valueFor === 'alturaVoo') setAlturaVoo(text);
    if (valueFor === 'produtosUtilizados') setProdutosUtilizados(text);
  };

  const handleSubmit = () => {
    if (
      !produtor.trim() &&
      !localizacaoPropriedade.trim() &&
      !dataAplicacao.trim() &&
      !tamanhoArea.trim() &&
      !cultura.trim() &&
      !temperatura.trim() &&
      !umidadeRelativaDoAr.trim() &&
      !velocidadeVento.trim() &&
      !volumeCalda.trim() &&
      !larguraFaixa.trim() &&
      !alturaVoo.trim() &&
      !produtosUtilizados.trim()
    ) return onClose();

    if (isEdit) {
      onSubmit(
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
        Date.now()
      );
    } else {
      onSubmit(
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
        produtosUtilizados
      );
      setProdutor('');
      setLocalizacaoPropriedade('');
      setDataAplicacao('');
      setTamanhoArea();
      setCultura();
      setTemperatura();
      setUmidadeRelativaDoAr();
      setVelocidadeVento();
      setVolumeCalda();
      setLarguraFaixa();
      setAlturaVoo();
      setProdutosUtilizados();
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setProdutor('');
      setLocalizacaoPropriedade('');
      setDataAplicacao('');
      setTamanhoArea();
      setCultura();
      setTemperatura();
      setUmidadeRelativaDoAr();
      setVelocidadeVento();
      setVolumeCalda();
      setLarguraFaixa();
      setAlturaVoo();
      setProdutosUtilizados();
    }
    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
          <TextInput
            value={produtor}
            onChangeText={text => handleOnChangeText(text, 'produtor')}
            placeholder='Produtor'
            style={[styles.input, styles.produtor]}
          />
          <TextInput
            value={localizacaoPropriedade}
            multiline
            placeholder='Localização da Propriedade'
            style={[styles.input, styles.localizacaoPropriedade]}
            onChangeText={text => handleOnChangeText(text, 'localizacaoPropriedade')}
          />
          <TextInput
            value={dataAplicacao}
            multiline
            placeholder='Data de Aplicação'
            style={[styles.input, styles.dataAplicacao]}
            onChangeText={text => handleOnChangeText(text, 'dataAplicacao')}
          />
          <TextInput
            value={tamanhoArea}
            multiline
            placeholder='Tamanho da Área'
            style={[styles.input, styles.tamanhoArea]}
            onChangeText={text => handleOnChangeText(text, 'tamanhoArea')}
          />
          <TextInput
            value={cultura}
            multiline
            placeholder='Cultura'
            style={[styles.input, styles.cultura]}
            onChangeText={text => handleOnChangeText(text, 'cultura')}
          />
          <TextInput
            value={temperatura}
            multiline
            placeholder='Temperatura'
            style={[styles.input, styles.temperatura]}
            onChangeText={text => handleOnChangeText(text, 'temperatura')}
          />
          <TextInput
            value={umidadeRelativaDoAr}
            multiline
            placeholder='Umidade Relativa do Ar'
            style={[styles.input, styles.umidadeRelativaDoAr]}
            onChangeText={text => handleOnChangeText(text, 'umidadeRelativaDoAr')}
          />
          <TextInput
            value={velocidadeVento}
            multiline
            placeholder='Velocidade do Vento'
            style={[styles.input, styles.velocidadeVento]}
            onChangeText={text => handleOnChangeText(text, 'velocidadeVento')}
          />
          <TextInput
            value={volumeCalda}
            multiline
            placeholder='Volume de Calda'
            style={[styles.input, styles.volumeCalda]}
            onChangeText={text => handleOnChangeText(text, 'volumeCalda')}
          />
          <TextInput
            value={larguraFaixa}
            multiline
            placeholder='Largura de Faixa'
            style={[styles.input, styles.larguraFaixa]}
            onChangeText={text => handleOnChangeText(text, 'larguraFaixa')}
          />
          <TextInput
            value={alturaVoo}
            multiline
            placeholder='Altura de Voo'
            style={[styles.input, styles.alturaVoo]}
            onChangeText={text => handleOnChangeText(text, 'alturaVoo')}
          />
          <TextInput
            value={produtosUtilizados}
            multiline
            placeholder='Produtos Utilizados'
            style={[styles.input, styles.produtosUtilizados]}
            onChangeText={text => handleOnChangeText(text, 'produtosUtilizados')}
          />
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={15}
              antIconName='check'
              onPress={handleSubmit}
            />
            {/* {
              produtor.trim() ||
                localizacaoPropriedade.trim() ||
                dataAplicacao.trim() ||
                tamanhoArea.trim() ||
                cultura.trim() ||
                temperatura.trim() ||
                umidadeRelativaDoAr.trim() ||
                velocidadeVento.trim() ||
                volumeCalda.trim() ||
                larguraFaixa.trim() ||
                alturaVoo.trim() ||
                produtosUtilizados.trim()
                ? (
                  <RoundIconBtn
                    size={15}
                    style={{ marginLeft: 15 }}
                    antIconName='close'
                    onPress={closeModal}
                  />
                ) : null} */}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  produtor: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  localizacaoPropriedade: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  dataAplicacao: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  tamanhoArea: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  cultura: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  temperatura: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  umidadeRelativaDoAr: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  velocidadeVento: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  volumeCalda: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  larguraFaixa: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  alturaVoo: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  produtosUtilizados: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

export default NoteInputModal;
