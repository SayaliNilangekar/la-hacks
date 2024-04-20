import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons'; // Import the Feather icon set
import { ListItem } from '@rneui/themed';

export default function Tab() {

  const [expandedOne, setExpandedOne] = useState(false);
  const [expandedTwo, setExpandedTwo] = useState(false);

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
              onPress={() => {
                // Action to add medication
              }}
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