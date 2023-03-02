import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../constants/Styles';
import Color from '../constants/Color';
import { Feather } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { setReport, DataState } from '../redux/dataSlice';

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
      <Text style={[globalStyles.text, styles.text]}>{title}</Text>
      {isSelected ? (
        <Feather name={'check'} size={30} color={Color.supportScreen.tint_Color} />
      ) : null}
    </TouchableOpacity>
  );
};

const ReportBox = () => {
  const dispatch = useDispatch();
  const { report } = useSelector((state: any) => state as DataState);

  const onItemSelected = (_val: number) => {
    if (_val === 0) {
      dispatch(setReport({ defectiveVehicle: !report.defectiveVehicle }));
    } else if (_val === 1) {
      dispatch(setReport({ wrongParking: !report.wrongParking }));
    } else if (_val === 2) {
      dispatch(setReport({ other: !report.other }));
    }
  };
  return (
    <View style={styles.container}>
      <SelectableLine
        title="Report Defective Vehicle"
        type={0}
        onSelected={onItemSelected}
        isSelected={report.defectiveVehicle}
      />
      <SelectableLine
        title="Report Wrong Parking"
        type={1}
        onSelected={onItemSelected}
        isSelected={report.wrongParking}
      />
      <SelectableLine
        title="Report Other"
        type={2}
        onSelected={onItemSelected}
        isSelected={report.other}
      />
    </View>
  );
};

export default ReportBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.supportScreen.box,
    height: Layout.window.height * 0.16,
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
  text: {
    fontSize: 11,
  },
});
