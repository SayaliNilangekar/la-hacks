import { Button, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'; // Import the Feather icon set
import { ListItem } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import drugsList from './druglist.json'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MedicationCard from '../../components/MedicationCard';
import { AntDesign } from '@expo/vector-icons';

import { Alert, Modal, StyleSheet, Pressable, FlatList } from 'react-native';

import drugDict from '../../assets/drugdict.json';

const frequencies = [
    {
        "id": 1,
        "freq": "Once a day"
    },
    {
        "id": 2,
        "freq": "Twice a day"
    },
    {
        "id": 3,
        "freq": "Three times a day"
    },
    {
        "id": 4,
        "freq": "Four times a day"
    },
    {
        "id": 5,
        "freq": "Five times a day"
    },
    {
        "id": 6,
        "freq": "Before bed"
    },
    {
        "id": 7,
        "freq": "Every 4 hours"
    },
    {
        "id": 8,
        "freq": "Every 6 hours"
    },
    {
        "id": 9,
        "freq": "Every 8 hours"
    },
    {
        "id": 10,
        "freq": "Every 12 hours"
    },
    {
        "id": 11,
        "freq": "Every other day"
    },
    {
        "id": 12,
        "freq": "Once a week"
    },
    {
        "id": 13,
        "freq": "As needed"
    }
]

const freq = {
    "1": "Once a day",
    "2": "Twice a day",
    "3": "Three times a day",
    "4": "Four times a day",
    "5": "Five times a day",
    "6": "Before bed",
    "7": "Every 4 hours",
    "8": "Every 6 hours",
    "9": "Every 8 hours",
    "10": "Every 12 hours",
    "11": "Every other day",
    "12": "Once a week",
    "13": "As needed"
}

const dosageUnits = [
    {
        "id": 1,
        "unit": "mg"
    },
    {
        "id": 2,
        "unit": "mcg"
    },
    {
        "id": 3,
        "unit": "g"
    },
    {
        "id": 4,
        "unit": "mL"
    },
    {
        "id": 5,
        "unit": "units"
    },
    {
        "id": 6,
        "unit": "IU"
    },
    {
        "id": 7,
        "unit": "tablet(s)"
    },
    {
        "id": 8,
        "unit": "capsule(s)"
    },
    {
        "id": 9,
        "unit": "drop(s)"
    },
    {
        "id": 10,
        "unit": "spray(s)"
    }
]

const units = {
    "1": "mg",
    "2": "mcg",
    "3": "g",
    "4": "mL",
    "5": "units",
    "6": "IU",
    "7": "tablet(s)",
    "8": "capsule(s)",
    "9": "drop(s)",
    "10": "spray(s)"
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    modalView: {
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingBottom: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 600,
        width: 408
    },
    button: {
        borderRadius: 12,
        marginTop: 12,
        padding: 10,
        elevation: 2,
        backgroundColor: '#3b7be8',
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    },
    modalText: {
        flexDirection: 'row',
        marginBottom: 15,
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold'
    },

    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
        width: 350,
        marginBottom: 20,
        marginTop: 15
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'gray'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});


export default function Tab() {

    const [modalVisible, setModalVisible] = useState(false);

    const [dropdownValue, setDropdownValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [dosageDropdownValue, setDosageDropdownValue] = useState(null);
    const [isDosageFocus, setIsDosageFocus] = useState(false);

    const [dosageAmount, setDosageAmount] = useState(null);
    const [dosageInputVisible, setDosageInputVisible] = useState(false); // State to control visibility of dosage TextInput

    const [freqDropdownValue, setFreqDropdownValue] = useState(null);
    const [isFreqFocus, setIsFreqFocus] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const [prescriptionList, setPrescriptionList] = useState([
        {
            id: 900,
            medication: "Ibuprofen",
            startDate: new Date(2024, 2, 1),
            endDate: new Date(2024, 4, 25),
            dosageAmount: "3 mg",
            frequency: 'Once a day'
        },
        {
            id: 1,
            medication: "Abacavir",
            startDate: new Date(2024, 2, 22),
            endDate: new Date(2024, 4, 25),
            dosageAmount: "4 ml",
            frequency: 'Once a week',
        }
    ]);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const handleAdd = async() => {
        let errors = []
        for (const item of prescriptionList) {
            console.log(item)
            try {
                resp = await fetch('http://192.168.215.97:5003/drugint/'+ item.id + '/' + dropdownValue)
                respJ = await resp.json();
                // console.log(respJ)
                errors.push(respJ)
            } catch {
                //
            }
        }
        try {
            resp = await fetch('http://192.168.215.97:5003/gemai/' + dropdownValue + '/' + dosageAmount + ' ' + units[dosageDropdownValue] + '/' + freq[freqDropdownValue])
            respJ = await resp.json();
            // console.log(respJ)
            errors.push(respJ)
        } catch {
            //
        }
        // console.log(errors);
        setPrescriptionList([
            ...prescriptionList,
            {
                id: dropdownValue,
                medication: drugDict[dropdownValue],
                startDate: selectedDate,
                endDate: selectedEndDate,
                dosageAmount: dosageAmount + ' ' + units[dosageDropdownValue],
                frequency: freq[freqDropdownValue],
                alerts: errors
            }
        ])
        setModalVisible(false);
        setDropdownValue(null);
        setIsFocus(false);
        setDosageDropdownValue(null);
        setIsDosageFocus(false);
        setDosageInputVisible(false);
        setFreqDropdownValue(null);
        setIsFreqFocus(false);
        setSelectedDate(null);
        setSelectedEndDate(null);
        setDatePickerVisibility(false);
        setEndDatePickerVisibility(false);
        setDosageAmount(null);
    };

    const handleEndConfirm = (date) => {
        // console.warn("A date has been picked: ", date);
        setSelectedEndDate(date);
        hideEndDatePicker();
    };


    return (
        <View style={{ flex: 1 }}>

          <View style={{ backgroundColor: '#a6c7ff', height: 150, width: '100%',justifyContent: 'center', alignItems: 'center',  shadowColor: '#000',
              shadowColor: '#000',
              shadowOffset: {
                  width: 0,
                  height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,}}>
                  <Image source={require('../../assets/logo_horiz-transformed.png')} style={{ width: 300, marginTop: 35, resizeMode: 'contain' }} />
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ paddingTop: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                    Hello Viral!
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <ScrollView >
                            <KeyboardAvoidingView >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                    <TouchableOpacity
                                      style={{
                                          position: 'absolute',
                                          top: 10,
                                          right: 10,
                                          padding: 10
                                      }}
                                      onPress={() => setModalVisible(!modalVisible)}
                                    >
                                      <AntDesign name="closecircleo" size={24} color="black" style={{position: 'fixed'}} />
                                    </TouchableOpacity>
                                    <Text style={styles.modalText}>Add Prescription</Text>
                                    <View>
                                            <Dropdown
                                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                                placeholderStyle={styles.placeholderStyle}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                iconStyle={styles.iconStyle}
                                                data={drugsList}
                                                search
                                                maxHeight={300}
                                                labelField="name"
                                                valueField="id"
                                                placeholder={!isFocus ? 'Medication name' : 'Select or search below'}
                                                medicationmedication
                                                searchPlaceholder="Start typing..."
                                                value={dropdownValue}
                                                onFocus={() => setIsFocus(true)}
                                                onBlur={() => setIsFocus(false)}
                                                onChange={item => {
                                                    setDropdownValue(item.id);
                                                    setIsFocus(false);
                                                    // Show additional TextInput when a value is selected
                                                    setDosageInputVisible(true);
                                                }}

                                            />


                                            {dosageInputVisible && (
                                                <View style={{ paddingTop: 10 }}>
                                                    <View>
                                                        <TextInput
                                                            style={{
                                                                height: 50,
                                                                borderColor: 'gray',
                                                                borderRadius: 8,
                                                                borderWidth: 0.5,
                                                                paddingHorizontal: 10,
                                                                marginBottom: 20,
                                                                fontSize: 16,
                                                            }}
                                                            placeholder="Medication start date"
                                                            placeholderTextColor="gray"
                                                            onFocus={showDatePicker}
                                                            value={selectedDate ? selectedDate.toDateString() : ''}
                                                        />

                                                        <DateTimePickerModal
                                                            isVisible={isDatePickerVisible}
                                                            mode="date"
                                                            onConfirm={handleConfirm}
                                                            onCancel={hideDatePicker}
                                                        />

                                                        <TextInput
                                                            style={{
                                                                height: 50,
                                                                borderColor: 'gray',
                                                                borderRadius: 8,
                                                                borderWidth: 0.5,
                                                                paddingHorizontal: 10,
                                                                marginBottom: 20,
                                                                marginTop: 10,
                                                                fontSize: 16,
                                                            }}
                                                            placeholder="Medication end date"
                                                            placeholderTextColor="gray"
                                                            onFocus={showEndDatePicker}
                                                            value={selectedEndDate ? selectedEndDate.toDateString() : ''}
                                                        />

                                                        <DateTimePickerModal
                                                            isVisible={isEndDatePickerVisible}
                                                            mode="date"
                                                            onConfirm={handleEndConfirm}
                                                            onCancel={hideEndDatePicker}
                                                        />
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <TextInput
                                                            style={{
                                                                height: 50,
                                                                borderColor: 'gray',
                                                                borderRadius: 8,
                                                                borderWidth: 0.5,
                                                                paddingHorizontal: 10,
                                                                marginBottom: 20,
                                                                marginTop: 10,
                                                                width: 210,
                                                                fontSize: 16,
                                                            }}
                                                            placeholder="Dosage amount"
                                                            placeholderTextColor="gray"
                                                            value={dosageAmount}
                                                            onChangeText={setDosageAmount}
                                                        />
                                                        <Dropdown
                                                            style={[
                                                                { borderColor: isDosageFocus ? 'blue' : 'gray' },
                                                                {
                                                                    height: 50,
                                                                    borderColor: 'gray',
                                                                    borderWidth: 0.5,
                                                                    borderRadius: 8,
                                                                    paddingHorizontal: 8,
                                                                    marginLeft: 20,
                                                                    width: 120,
                                                                    marginBottom: 20,
                                                                    marginTop: 10
                                                                }
                                                            ]}
                                                            placeholderStyle={styles.placeholderStyle}
                                                            selectedTextStyle={styles.selectedTextStyle}
                                                            inputSearchStyle={styles.inputSearchStyle}
                                                            iconStyle={styles.iconStyle}
                                                            data={dosageUnits}
                                                            // search
                                                            maxHeight={300}
                                                            labelField="unit"
                                                            valueField="id"
                                                            placeholder={!isDosageFocus ? 'Units' : '...'}
                                                            // searchPlaceholder="Search..."
                                                            value={dosageDropdownValue}
                                                            onFocus={() => setIsDosageFocus(true)}
                                                            onBlur={() => setIsDosageFocus(false)}
                                                            onChange={item => {
                                                                setDosageDropdownValue(item.id);
                                                                setIsDosageFocus(false);
                                                            }}
                                                        />
                                                    </View>
                                                    <Dropdown
                                                        style={[
                                                            { borderColor: isFreqFocus ? 'blue' : 'gray' },
                                                            {
                                                                height: 50,
                                                                borderColor: 'gray',
                                                                borderWidth: 0.5,
                                                                borderRadius: 8,
                                                                paddingHorizontal: 8,
                                                                width: 350,
                                                                marginBottom: 30,
                                                                marginTop: 10,
                                                            }
                                                        ]}
                                                        placeholderStyle={styles.placeholderStyle}
                                                        selectedTextStyle={styles.selectedTextStyle}
                                                        inputSearchStyle={styles.inputSearchStyle}
                                                        iconStyle={styles.iconStyle}
                                                        data={frequencies}
                                                        // search
                                                        maxHeight={300}
                                                        labelField="freq"
                                                        valueField="id"
                                                        placeholder={!isDosageFocus ? 'Frequency' : '...'}
                                                        // searchPlaceholder="Search..."
                                                        value={freqDropdownValue}
                                                        onFocus={() => setIsFreqFocus(true)}
                                                        onBlur={() => setIsFreqFocus(false)}
                                                        onChange={item => {
                                                            setFreqDropdownValue(item.id);
                                                            setIsFreqFocus(false);
                                                        }}
                                                    />

                                                    <Pressable
                                                        style={[styles.button, styles.buttonClose]}
                                                        onPress={handleAdd}>
                                                        <Text style={styles.textStyle}>Save</Text>
                                                    </Pressable>
                                                </View>
                                            )}

                                        </View>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </ScrollView>
                    </Modal>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
                        Prescriptions
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#3b7be8',
                            // paddingVertical: 12,
                            borderRadius: 8,
                            alignItems: 'center',
                            fontSize: 12,
                            padding: 5,
                            marginBottom: 10,
                            height: 35,
                            width: 60
                        }}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={{ color: 'white', fontSize: 16 }}>+ Add</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 20, marginTop: 20 }}>
                    {
                        prescriptionList && (
                            <FlatList
                                data={prescriptionList}
                                contentContainerStyle={{
                                  paddingBottom: 200
                                }}
                                renderItem={({ item, index }) => (
                                    <MedicationCard
                                        medication={item.medication}
                                        startDate={item.startDate.toLocaleDateString()}
                                        endDate={item.endDate.toLocaleDateString()}
                                        dosage={item.dosageAmount}
                                        frequency={item.frequency}
                                        alerts={item?.alerts ?? []}
                                        index={index}
                                    />
                                )} />
                        )
                    }
                </View>


            </View>
            </View>
        </View>
    );
}