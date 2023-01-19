import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Dimensions, Platform} from 'react-native';
import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

function Scores(props) {
    // Variables
    const scores = useSelector(state => state.scores);
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
            <Text style={styles.title}>Historique</Text>

            {!scores[0] ? (
            <Text style={styles.empty}>
                Commencer par jouer votre première partie.
                </Text>
                ) : (<FlatList 
                data={scores} 
                keyExtractor={item => Math.random().toString()} 
                renderItem={item => (
                <View style={styles.score}>
                    <Text style={styles.steps}>
                        Etapes :{''} 
                        <Text style={styles.inlineSteps}>
                            {item.item.steps}
                            </Text>
                            </Text>
                            <Text style={styles.player}>{item.item.player}</Text>
                </View>
                )}
                />
    )}
            </SafeAreaView> 
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    safeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        color: Colors.primary,
        fontWeight: 'bold',
        marginTop: Platform.OS === 'android' ? 50 : 0,
    },
    empty: {
        marginTop: 30,
        fontSize: 18,
        paddingHorizontal: 15,
        textAlign: 'center',
    },
    score: {
        width: Dimensions.get('window').width * 0.85,
        backgroundColor: Colors.quaternary,
        padding: 15,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    steps: {
        fontWeight: 'bold',
    },
    inlineSteps: {
        fontWeight: 'normal',
        color: Colors.primary,
    },
    player: {
        color: Colors.secondary,
    }
})

export default Scores;