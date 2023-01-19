import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions, Alert} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { useSelector, useDispatch} from 'react-redux';
import * as gameActions from '../store/actions/game';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useForm, Controller} from 'react-hook-form';

function Home(props) {
    // Variables
    const minimum = useSelector(state => state.minimum);
    const maximum = useSelector(state => state.maximum);
    const gameStarted = useSelector(state => state.gameStarted);
    const dispatch = useDispatch();
    const solution = useSelector(state => state.solution);
    const { control, handleSubmit, formState: {errors}, reset} = useForm();

    // Fonction
    const onStartPressedHandler = () => {
        dispatch(gameActions.startGame());
    };
    const onPropositionPressedHandler = data => {
        if(isNaN(data.proposition)) {
            Alert.alert('Attention', "La triche n'est pas autorisée.");
        } else {
            if(data.proposition == solution) {
                // Partie gagnée
                Alert.alert('Juste Prix trouvé', `Vous avez réussi en ${steps} essais.`)
                // Arreter la partie
                dispatch(gameActions.endGame(steps));
                // Visder l'input
                setProposition();
                // Vider les instructions
                setInstruction();
                // Initialiser les étapes à 1
                setSteps(1);

            } else if(data.proposition < solution) {
                // C'est plus
                setInstruction("C'est plus ! ");
                setSteps(prevSteps => prevSteps + 1);
            } else {
                // C'est moins
                setInstruction("C'est moins !");
                setSteps(prevSteps => prevSteps + 1);
            }
        }
    }

    // States
    const [steps, setSteps] = useState(1);
    const [proposition, setProposition] = useState();
    const [instruction, setInstruction] = useState();

    if(!gameStarted && steps != 1) {
        setInstruction();
        setSteps(1);
        setProposition();
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={{flex: 1}}>
                    <View style={styles.littleContainer}>
           <Image source={require('../assets/logo.png')} style={styles.logo}/>
           <Text style={styles.slogan}>Retrouver le juste prix entre <Text style={styles.highlight}>{minimum}</Text> et <Text style={styles.highlight}>{maximum}</Text>.</Text>
            {gameStarted ? (
                <>
            <View style={styles.instruction}>
                <Text style={styles.instructionSteps}>#{steps}</Text>
                <Text style={styles.instructionText}>
                    {instruction ? instruction : " Quel est le juste prix"}
                    </Text>
            </View>
            <View style={styles.proposition}>
                {/* <TextInput 
                style={styles.input} 
                keyboardType='numeric' 
                value={proposition} 
                onChangeText={setProposition} 
                onFocus={() => setProposition()} 
                onSubmitEditing={onPropositionPressedHandler}/> */}
                <Controller control={control} render={({field: {value, onChange}}) => (
                     <TextInput 
                     style={styles.input} 
                     keyboardType="numeric" 
                     value={value} 
                     onChangeText={value => onChange(value)}
                     onSubmitEditing={handleSubmit(onPropositionPressedHandler)}
                     onFocus={() => reset()}
                     />
            )}
            name='proposition'
            rules={{
                min: 0,
                required: true,
            }}
                    />
                <TouchableOpacity style={styles.send} activeOpacity={0.8} onPress={handleSubmit(onPropositionPressedHandler)}>
                    <Ionicons name='arrow-forward' color={Colors.secondary} size={30}/>
                </TouchableOpacity>

                
            </View>
            </>
           ) : (
            <TouchableOpacity activeOpacity={0.8} style={styles.start} onPress={onStartPressedHandler}>
                <Text style={styles.startText}>Commencer</Text>
            </TouchableOpacity>
            )}</View>
            </ScrollView>
            </SafeAreaView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    littleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 100
    },
    slogan: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 15
    },
    highlight: {
        color: Colors.secondary,
        fontWeight: 'bold',
    },
    start: {
        backgroundColor: Colors.primary,
        padding: 15,
        marginTop: 50,
        borderRadius: 5,
    },
    startText: {
        color: 'white',
        fontSize: 17
    },
    instruction: {
        backgroundColor: Colors.tertiary,
        padding: 15,
        minWidth: Dimensions.get('window').width * 0.5,
        borderRadius: 5,
        marginTop: 30,
        alignItems: 'center',
        flexDirection: 'row',
    },
    instructionText: {
        color: 'white',
    },
    instructionSteps: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 15,
    },
    proposition: {
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 30,
        backgroundColor: Colors.quaternary,
        borderRadius: 5,
        borderColor: Colors.primary,
        borderBottomWidth: 3,
        width: 150,
    },
    input: {
        padding: 10,
        width: 105,
    }
})

export default Home;