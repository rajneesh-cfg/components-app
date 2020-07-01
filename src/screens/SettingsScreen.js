import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, Image, FlatList, ActivityIndicator, StyleSheet, View, Platform, Text } from 'react-native';

class ImageComponent extends Component {

  constructor() {
    super();
  }
  render() {
    return (
      <View style={styles.imageHolder}>
        <Image source={{ uri: this.props.imageURI }} style={styles.image} />
        <View style={styles.textViewHolder}>
          <Text numberOfLines={1} style={styles.textOnImage}>
            {this.props.name}
          </Text>
        </View>
      </View>
    );
  }
}

export default class SettingScreen extends Component {

  constructor() {
    super();
    this.state = { 
            imagesData: null,
            loading: true, 
            gridView: true,
            btnText: 'Show List'
         }
  }

  componentDidMount() {
    fetch('https://picsum.photos/v2/list?page=2&limit=30')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ imagesData: responseJson, loading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  changeView = () => {
    this.setState({ gridView: !this.state.gridView }, () => {
      if (this.state.gridView) {
        this.setState({ btnText: 'Show List' });
      }
      else {
        this.setState({ btnText: 'Show Grid' });
      }
    });
  }

  render() {
    return (
      <View style={styles.container} >
        {
          (this.state.loading)
            ?
            (<View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>Please Wait...</Text>
            </View>)
            :
            (<View style={{ flex: 1 }}>

              <TouchableOpacity activeOpacity={0.8} style={styles.buttonDesign} onPress={this.changeView}>
                <Text style={styles.buttonText}>{this.state.btnText}</Text>
              </TouchableOpacity>

              <FlatList keyExtractor={(item) => item.id}
                        key={(this.state.gridView) ? 1 : 0}
                        numColumns={this.state.gridView ? 2 : 1}
                        data={this.state.imagesData}
                        renderItem={({ item }) =>
                          <ImageComponent imageURI={item.download_url} name={item.author.toUpperCase()} />
                        } />

            </View>)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },
    imageHolder: {
      margin: 5,
      height: 160,
      flex: 1,
      position: 'relative'
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover'
    },
    textViewHolder: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.75)',
      paddingHorizontal: 10,
      paddingVertical: 13,
      alignItems: 'center'
    },
    textOnImage: {
      color: 'white'
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    loadingText: {
      paddingTop: 10,
      fontSize: 18,
      color: 'black'
    },
    buttonDesign: {
      padding: 15,
      backgroundColor: '#e91e63'
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      alignSelf: 'stretch'
    }
  });