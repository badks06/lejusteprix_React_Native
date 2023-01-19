import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Dimensions, TextInput, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback} from 'react-native';
import Colors from '../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import * as gameActions from '../store/actions/game';
import { useForm, Controller } from 'react-hook-form';


function Parameters(props) {
    // Variables
    const minimum = useSelector(state => state.minimum);
    const maximum = useSelector(state => state.maximum);
    const dispatch = useDispatch();

    const {control, handleSubmit, formState: {errors}} = useForm();

    // // States
    // const [minimumInput, setMinimumInput] = useState(minimum);
    // const [maximumInput, setMaximumInput] = useState(maximum);

    // Fonctions
    const onSubmitPressedHandler = data => {
        console.log(data)
        if(Number(data.minimumInput) < Number(data.maximumInput)) {
            dispatch(
                gameActions.updateVariables(
                    Number(data.minimumInput), 
                    Number(data.maximumInput)));
            Alert.alert('Sauvegarde effectuée', 'Vos modifications ont été sauvegardées');
            Keyboard.dismiss();
    } else {
        Alert.alert('Une erreur est survenue', 'Veuillez corriger');
    }
     }
     const onError = data => {
        console.log(data);
        // Alert.alert('Une erreur est survenue', 'Veuillez vérifier');
     }
     let errorStyle;
     if(errors.maximumInput) {
        errorStyle = {
            borderColor: Colors.primary,
            borderWidth: 3,
        }
     }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
            <Text style={styles.title}>Parametres</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Prix minimum</Text>
                {/* <TextInput 
                style={styles.input} 
                placeholder="0" 
                keyboardType='numeric'
                value={minimumInput.toString()}
                onChangeText={setMinimumInput} 
                /> */}
                <Controller control={control} render={({field: {value, onChange}}) => (
                    <TextInput 
                    style={styles.input} 
                    placeholder="0" 
                    keyboardType='numeric'
                    value={value}
                    onChangeText={value => onChange(value)}
                    />
                )} 
                name='minimumInput'
                defaultValue={minimum.toString()}
                rules= {{
                    min: {
                        value: 0,
                        message: 'Vous devez rentrer une valeur supérieure ou égale à 0.'
                    },
                    required: {
                        value: true,
                        message: 'Vous devez rentrer un prix maximum.'
                    },
                }}
                />
                {errors.minimumInput && (
                <Text style={styles.error}>{errors.minimumInput.message}</Text>
            )}
                <Text style={{...styles.label, marginTop: 30}}>Prix maximum</Text>
                {/* <TextInput 
                style={styles.input} 
                placeholder="1000" 
                keyboardType='numeric'
                value={maximum.toString()}
                onChangeText={setMaximumInput}
                /> */}
                <Controller 
                control={control} 
                render={({ field: { value, onChange } }) => (
                    <TextInput 
                    style={{...styles.input, ...errorStyle}} 
                    placeholder="1000" 
                    keyboardType='numeric' 
                    value={value} 
                    onChangeText={value => onChange(value)}
                    />
                )}
                name="maximumInput"
                defaultValue={maximum.toString()}
                rules= {{
                    min: {
                        value: 0,
                        message: 'Vous devez rentrer une valeur supérieure ou égale à 0.'
                    },
                    required: {
                        value: true,
                        message: 'Vous devez rentrer un prix maximum.'
                    },
                }}
                />
                {errors.maximumInput && (
                <Text style={styles.error}>{errors.maximumInput.message}</Text>
            )}
            </View>
            <TouchableOpacity style={styles.submit} activeOpacity={0.8} onPress={handleSubmit(onSubmitPressedHandler, onError)}>
                <Text style={styles.submitText}>Sauvegarder</Text>
            </TouchableOpacity>
            </SafeAreaView>
        </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    form: {
        backgroundColor: Colors.tertiary,
        padding: 30,
        borderRadius: 5,
        marginTop: 30,
        width: Dimensions.get('window').width * 0.8
    },
    label: {
        color: 'white',
    },
    input: {
        backgroundColor: Colors.quaternary,
        borderRadius: 5,
        padding: 5,
        marginTop: 5
    },
    submit: {
        backgroundColor: Colors.primary,
        padding: 15,
        marginTop: 15,
        borderRadius: 5,
    },
    submitText: {
        color: 'white',
    },
    error: {
        color: Colors.primary,
    }
})

export default Parameters;