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


  const calculateDuration = (startDate, endDate) => {
    const startDateParts = startDate.split('/');
    const endDateParts = endDate.split('/');
    
    const startDateObj = new Date(startDateParts[2], startDateParts[0] - 1, startDateParts[1]);
    const endDateObj = new Date(endDateParts[2], endDateParts[0] - 1, endDateParts[1]);
    
    // Calculate the difference in milliseconds
    const duration = endDateObj - startDateObj;
    
    // Convert milliseconds to days
    const totalDays = Math.floor(duration / (1000 * 60 * 60 * 24));
    
    // Calculate months and weeks
    const months = Math.floor(totalDays / 30);
    const weeks = Math.floor(totalDays / 7);
    
    if (months > 0 && totalDays % 30 === 0) {
        return `${months} months`;
    } else if (weeks > 0 && totalDays % 7 === 0) {
        return `${weeks} weeks`;
    } else {
        return `${totalDays} days`;
    }
  };
  

  const getStatus = (startDate, endDate) => {
    const currentDate = new Date();
  
    const [startMonth, startDay, startYear] = startDate.split('/').map(Number);
    const [endMonth, endDay, endYear] = endDate.split('/').map(Number);
  
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-indexed month
    const currentDay = currentDate.getDate();
  
    if (
      startYear < currentYear ||
      (startYear === currentYear && startMonth < currentMonth) ||
      (startYear === currentYear && startMonth === currentMonth && startDay <= currentDay)
    ) {
      if (endYear > currentYear || (endYear === currentYear && endMonth > currentMonth) || (endYear === currentYear && endMonth === currentMonth && endDay >= currentDay)) {
        return 'ACTIVE';
      }
    } else if (startYear > currentYear || (startYear === currentYear && startMonth > currentMonth) || (startYear === currentYear && startMonth === currentMonth && startDay > currentDay)) {
      return 'SCHEDULED';
    }
  
    return 'UNKNOWN';
  };

const MedicationCard = ({ medication, startDate, endDate, alert, dosage, frequency }) => {

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const duration = calculateDuration(startDate, endDate);

    // const currentDate = new Date();
    // let status = 'ACTIVE';

    // const startDateObj = new Date(startDate);
    // const endDateObj = new Date(endDate);

    // if (startDateObj > currentDate) {
    //     status = 'SCHEDULED';
    // }

    const status = getStatus(startDate, endDate);

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
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{medication}</Text>
        {/* </View> */}
        <Text style={{ fontSize: 14 }}>{formattedStartDate} - {formattedEndDate}</Text>

        <Text style={{ fontSize: 13, fontWeight: 'bold', color: status === 'ACTIVE' ? 'green' : 'grey' }}>{status}</Text>
      </View>

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
      
      {alert && alert.length > 0 && (
        <View>
        {alert.map((message, index) => (
            <View
                key={index}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor: '#fab4b3',
                    backgroundColor: 'white',
                    borderRadius: 5,
                    padding: 5,
                    marginTop: index === 0 ? 35 : 5,
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
        ))}
        </View>
      )}


    </View>
  );
}

export default MedicationCard;