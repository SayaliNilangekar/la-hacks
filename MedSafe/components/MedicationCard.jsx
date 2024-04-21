import React from 'react';
import { View, Text } from 'react-native';

const MedicationCard = ({ medication, startDate, endDate, status }) => {
  return (
    <View
      style={{
        backgroundColor: status === 'ACTIVE' ? '#dbf8a1' : '#c0e6f5',
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
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{medication}</Text>
          <Text style={{ fontSize: 14, paddingTop: 2 }}>{startDate} - {endDate}</Text>
        </View>
        <Text style={{ fontSize: 13, fontWeight: 'bold', color: status === 'ACTIVE' ? 'green' : 'grey' }}>{status}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-end'}}>
        <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingRight: 20 }}>DURATION</Text>
        <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingLeft: 15, paddingRight: 20 }}>DOSAGE</Text>
        <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingLeft: 15}}>FREQUENCY</Text>
      </View>
    </View>
  );
}

export default MedicationCard;