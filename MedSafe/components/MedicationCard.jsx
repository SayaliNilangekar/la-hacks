import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const formatDate = (dateString) => {
  const parts = dateString.split('/');
  const day = parts[1];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIndex = parseInt(parts[0]) - 1; // Subtract 1 to convert to 0-based index
  const monthAbbreviation = months[monthIndex];
  const year = parts[2];
  return `${day} ${monthAbbreviation} ${year}`;
  };


const MedicationCard = ({ medication, startDate, endDate, status, alert, duration, dosage, frequency }) => {

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

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
        height: 'auto',
        marginBottom: 20,
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{medication}</Text>
          <Text style={{ fontSize: 14, paddingTop: 2 }}>{formattedStartDate} - {formattedEndDate}</Text>
        </View>
        <Text style={{ fontSize: 13, fontWeight: 'bold', color: status === 'ACTIVE' ? 'green' : 'grey' }}>{status}</Text>
      </View>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-end', paddingTop: 30}}>
        <View>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingRight: 20 }}>DURATION</Text>
            <Text style={{ fontSize: 13, paddingRight: 20 }}>{duration}</Text>
        </View>
        
        <View>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingLeft: 15, paddingRight: 20 }}>DOSAGE</Text>
            <Text style={{ fontSize: 13, paddingLeft: 15, paddingRight: 20 }}>{dosage}</Text>
        </View>
        <View>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingLeft: 15}}>FREQUENCY</Text>
            <Text style={{ fontSize: 13, paddingLeft: 15}}>{frequency}</Text>
        </View>
      </View> */}

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-end', paddingTop: 30}}>
        <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingRight: 20 }}>DURATION</Text>
            <Text style={{ fontSize: 13, paddingRight: 20 }}>{duration}</Text>
        </View>
        
        <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingLeft: 15, paddingRight: 20 }}>DOSAGE</Text>
            <Text style={{ fontSize: 13, paddingLeft: 15, paddingRight: 20 }}>{dosage}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey', paddingLeft: 15}}>FREQUENCY</Text>
            <Text style={{ fontSize: 13, paddingLeft: 15}}>{frequency}</Text>
        </View>
      </View>

      {alert && ( // Conditionally render alert if provided
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: '#fab4b3',
            backgroundColor: 'white',
            borderRadius: 5,
            padding: 5,
            marginTop: 25,
            marginBottom: 10,
            borderWidth: 2,
            // borderColor: '#fab4b3',
            borderColor: 'red'
          }}
        >
          <Ionicons name="alert-circle-outline" size={30} color="red" style={{ marginRight: 5 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', padding: 5, color: 'red' }}>{alert}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default MedicationCard;