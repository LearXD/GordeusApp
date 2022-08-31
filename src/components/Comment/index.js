import React from 'react';

import { View, Text, StyleSheet } from "react-native"

export default function Comment ({ data }) {
    return (
        <View style={styles.container}>
            <Text style={ styles.authorText }>- {data.author}: </Text>
            <Text style={ styles.messageText }>{data.comment}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 3,
        flexDirection: 'row',
    },
    authorText: {
        fontWeight: 'bold'
    },
    messageText: {
        paddingRight: 100
    }
})