import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../constants/Styles';
import Color from '../constants/Color';
import { Feather } from '@expo/vector-icons';

const SelectableLine = ({
  title,
  onSelected,
  type,
  isSelected,
}: {
  title: string;
  onSelected: (_type: number) => void;
  type?: number;
  isSelected?: boolean;
}) => {
  return (
    <TouchableOpacity
      style={styles.selectableContainer}
      onPress={() => onSelected(type ?? 1)}>
      <Text style={globalStyles.selectableText}>{title}</Text>
      {isSelected ? (
        <Feather name={'check'} size={30} color={Color.supportScreen.tint_Color} />
      ) : null}
    </TouchableOpacity>
  );
};

const ReportBox = () => {
  const [selectedItem, setSelectedItem] = useState(1);

  const onItemSelected = (_val: number) => {
    try {
      setSelectedItem(_val);
    } catch (error) {
      console.log('Change select report type error:', error);
    }
  };
  return (
    <View style={styles.container}>
      <SelectableLine
        title="Report Defective Vehicle"
        type={0}
        onSelected={onItemSelected}
        isSelected={selectedItem === 0}
      />
      <SelectableLine
        title="Report Wrong Parking"
        type={1}
        onSelected={onItemSelected}
        isSelected={selectedItem === 1}
      />
      <SelectableLine
        title="Report Other"
        type={2}
        onSelected={onItemSelected}
        isSelected={selectedItem === 2}
      />
    </View>
  );
};

export default ReportBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.supportScreen.box,
    height: 140,
    flex: 1.5,
    marginLeft: 10,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 5,
  },
  selectableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});
