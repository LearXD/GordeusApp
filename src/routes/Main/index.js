import React from 'react';

import { Component } from "react";
import { View, Text, Image, TextInput, StyleSheet, StatusBar, SafeAreaView, ScrollView, FlatList, TouchableOpacity, ToastAndroid } from "react-native";

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 64;

import Comment from '../../components/Comment'

export default class Main extends Component {

    state = {
        comments: [
            {
                _id: 0,
                author: 'LearXD',
                comment: 'Opa, seja bem-vindo ao meu app da URSS, fique a vontade pra falar o que quiser! (SIM EU SOU PREGUIÇOSO PRA KRL E NAO FIZ O SISTEMA DE POR NOME!)'
            }
        ],
        commentText: ''
    }

    constructor() {
        super();

        (async () => {
            try {
                const request = await fetch('http://34.168.12.109/comments/comments/')
                const response = await request.json()

                if (response.comments && response.comments.length > 0) {
                    response.comments.forEach(({ author, comment }) => {
                        this.addComment(author, comment)
                    })
                }
            } catch (error) {
                ToastAndroid.show("NÃO FOI POSSÍVEL SE COMUNICAR COM O SERVIDOR\nErro: " + error, ToastAndroid.SHORT);
            }

        })()

    }

    postComment(author, comment) {
        fetch('http://34.168.12.109/comments/comments/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    author: author,
                    comment: comment
                })
            }).then((response) => {
                return this.addComment(author, comment);
            }).catch(error => {
                ToastAndroid.show("NÃO FOI POSSÍVEL SE COMUNICAR COM O SERVIDOR\nErro: " + error, ToastAndroid.SHORT);
            })
    }

    addComment(author, comment) {
        const state = this.state;
        const comments = state.comments;

        comments.push({
            _id: comments.length + 1,
            author: author,
            comment: comment
        })

        state.comments = comments;

        this.setState(state);
    }

    getComments = () => {
        return this.state.comments;
    }

    getCommentLine = () => {
        return this.state.commentText;
    }

    setCommandLine = (text) => {
        const state = this.state;
        state.commentText = text
        this.setState(state);
    }


    render = () => {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ff060d' />

                <View style={styles.imageContainer}>
                    <Text style={styles.imageTitle}>Gordeus, o Omi do Anabolis</Text>
                    <Image style={styles.gordeusImage} source={require('../../../assets/gordeus.jpg')} />
                </View>
                <View style={styles.flatListContainer}>
                    <Text style={{ fontSize: 24 }}> Comentarios: </Text>

                    <FlatList
                        data={this.getComments()}
                        renderItem={(data) => <Comment data={data.item} />}
                    />

                    <View style={styles.commentContainer}>
                        <TextInput
                            placeholder='Digite um comentário!'
                            placeholderTextColor='#817881'
                            style={styles.inputComment}
                            onChangeText={(text) => this.setCommandLine(text)}>{this.getCommentLine()}
                        </TextInput>
                        <TouchableOpacity
                            style={styles.sendCommentButton}
                            onPress={() => {
                                if (this.getCommentLine().length > 255) {
                                    return ToastAndroid.show("O LIMITE DE CARACTERES DO COMENTÁRIO É DE 255 CARACTERES!", ToastAndroid.SHORT);
                                }
                                this.postComment("Anônimo", this.getCommentLine())
                                this.setCommandLine('');
                            }}>
                            <Text>COMENTAR</Text>
                        </TouchableOpacity>
                    </View>

                </View>


            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: statusBarHeight,
        backgroundColor: '#ff3c3c',
        justifyContent: 'center',
        padding: 20,
    },
    imageTitle: {
        fontSize: 25,
        fontFamily: 'arial',
        fontWeight: 'bold',
        tintColor: '#000',
        marginBottom: 10
    },
    imageContainer: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        borderColor: '#000',
        backgroundColor: '#930000',
        borderWidth: 2,
        alignItems: 'center',
    },
    gordeusImage: {
        flex: 1,
        width: 300,
        height: 300,
    },
    flatListContainer: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#930000',
        padding: 5
    },
    commentContainer: {
        flexDirection: 'row'
    },
    inputComment: {
        flex: 2.5,
        marginRight: 10,
        backgroundColor: '#ce2d31',
        borderRadius: 10,
    },
    sendCommentButton: {
        flex: 1,
        backgroundColor: '#ce2d31',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});