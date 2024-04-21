import { Button, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'; // Import the Feather icon set
import { ListItem } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import drugsList from './druglist.json'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {Alert, Modal, StyleSheet, Pressable } from 'react-native';

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

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
    height: 900,
    width: 408
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
    paddingHorizontal: 8,
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
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
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

  const [expandedOne, setExpandedOne] = useState(false);
  const [expandedTwo, setExpandedTwo] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [dropdownValue, setDropdownValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [dosageDropdownValue, setDosageDropdownValue] = useState(null);
  const [isDosageFocus, setIsDosageFocus] = useState(false);
  
  const [dosageInputVisible, setDosageInputVisible] = useState(false); // State to control visibility of dosage TextInput

  const [freqDropdownValue, setFreqDropdownValue] = useState(null);
  const [isFreqFocus, setIsFreqFocus] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setSelectedDate(date);
    hideDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setSelectedEndDate(date);
    hideEndDatePicker();
  };


  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ paddingTop: 80 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          Hello Sayali!
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TextInput
            style={{
              height: 50,
              borderColor: 'gray',
              borderRadius: 8,
              borderWidth: 1,
              paddingHorizontal: 10,
              marginBottom: 20,
              flex: 1, // Allow TextInput to take remaining space
            }}
            placeholder="Search for medication"
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            {/* <KeyboardAvoidingView style={styles.centeredView} behavior="padding" keyboardVerticalOffset={-400}> */}
            <ScrollView >
            <KeyboardAvoidingView >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Add a new prescription medication</Text>
                  <View>
                    {/* <TextInput
                      style={{
                        height: 50,
                        width: 365,
                        borderColor: 'gray',
                        borderRadius: 8,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        marginBottom: 20,
                      }}
                      placeholder="Search for medication"
                    /> */}

          {/* {renderLabel()} */}
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
                    placeholder={!isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={dropdownValue}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setDropdownValue(item.id);
                      setIsFocus(false);
                      // Show additional TextInput when a value is selected
                      setDosageInputVisible(true);
                    }}
                    // renderLeftIcon={() => (
                    //   <AntDesign
                    //     style={styles.icon}
                    //     color={isFocus ? 'blue' : 'black'}
                    //     name="Safety"
                    //     size={20}
                    //   />
                    // )}
                  />


                  {dosageInputVisible && (
                    <View>
                      <View style={{ flexDirection: 'row', paddingTop: 10}}>
                        <TextInput
                          style={{
                            height: 50,
                            borderColor: 'gray',
                            borderRadius: 8,
                            borderWidth: 0.5,
                            paddingHorizontal: 10,
                            marginBottom: 20,
                            width: 210
                          }}
                          placeholder="Dosage amount"
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
                                marginBottom: 20
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
                            // marginLeft: 20,
                            width: 350,
                            marginBottom: 20
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

                      <View>
                        {/* <Button title="Show Date Picker" onPress={showDatePicker} />
                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={handleConfirm}
                          onCancel={hideDatePicker}
                        /> */}
                        <TextInput
                          style={{
                            height: 50,
                            borderColor: 'gray',
                            borderRadius: 8,
                            borderWidth: 1,
                            paddingHorizontal: 10,
                            marginBottom: 20,
                          }}
                          placeholder="Medication start date"
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
                            borderWidth: 1,
                            paddingHorizontal: 10,
                            marginBottom: 20,
                          }}
                          placeholder="Medication end date"
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
                  </View>
                  )}

                  </View>
                  
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable>
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
                backgroundColor: 'blue',
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

        <View style={{ marginBottom: 20 , marginTop: 20}}>
          <View
            style={{
              backgroundColor: '#dbf8a1',
              borderRadius: 10,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              height: 150,
              marginBottom: 20,
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Selegiline</Text>
                <Text style={{ fontSize: 14, paddingTop: 2 }}>01 Apr 2024 - 15 Apr 2024</Text>
              </View>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'green'}}>ACTIVE</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-end'}}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingRight: 20 }}>DURATION</Text>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingLeft: 15, paddingRight: 20 }}>DOSAGE</Text>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingLeft: 15}}>FREQUENCY</Text>
            </View>
          </View>
          
          <View
            style={{
              backgroundColor: '#c0e6f5',
              borderRadius: 10,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              height: 150,
              marginBottom: 20,
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Tetrabenazine</Text>
                <Text style={{ fontSize: 14, paddingTop: 2 }}>05 Apr 2024 - 15 Apr 2024</Text>
              </View>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey'}}>SCHEDULED</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-end'}}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingRight: 20 }}>DURATION</Text>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingLeft: 15, paddingRight: 20 }}>DOSAGE</Text>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingLeft: 15}}>FREQUENCY</Text>
            </View>
          </View>
        </View>

        
      </View>  

    </View>
  );
}