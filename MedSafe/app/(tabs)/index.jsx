import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons'; // Import the Feather icon set

export default function Tab() {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ paddingTop: 80 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          Hello Sayali!
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        Active Prescriptions
      </Text>
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            backgroundColor: 'white',
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
          }}
        >
        </View>
        <View
          style={{
            backgroundColor: 'white',
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
          }}
        >
          {/* Card Content */}
        </View>
      </View>
    </View>
  );
}