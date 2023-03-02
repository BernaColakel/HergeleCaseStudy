import React, { ReactNode } from 'react';
import { createContext } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { DataState } from '../redux/dataSlice';
import { uploadFileToS3 } from '../utils/s3ImageUploader';

export const RequestContext = createContext({
  sendRequest: async (): Promise<any> => {},
});

export const RequestProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { location, comment, imageUri, QrCode, report, locationParams } = useSelector((state: any) => state as DataState);

  const uploadImage = async () => {
    try {
      const result = await uploadFileToS3(imageUri);
      return result;
    } catch (error) {
      Alert.alert('Upload error! Please try again');
      return { error };
    }
  };

  const requestToAPI = async (image: string) => {
    try {
      const url = 'http://api.hergele.co/testreport';
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authCode: 'testCode',
        phoneNumber: '5555555555'
      };
      const body = {
        phone: '5555555555',
        qrCode: QrCode,
        userLocation: {
          lat: locationParams.latitude,
          lon: locationParams.longitude,
          detail: location,
        },
        photo: image,
        type: {
          broken: report.defectiveVehicle,
          parking: report.wrongParking,
          other: report.other,
        },
        message: comment,
      }
      const params = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      }
      const result = await fetch(url, params);
      if (result.status !== 400) {
        return {error: 'Server error'};
      }
      return result;
    } catch (error) {
      Alert.alert('Server error!');
      return { error };
    }
  };

  const sendRequest = async () => {
    try {
      const uploadProcess = await uploadImage();
      if (uploadProcess?.error) {
        console.warn(uploadProcess?.error);
        return uploadProcess;
      }
      const result = await requestToAPI(uploadProcess.Key);
      console.log(result);
      return result;
    } catch (error) {
      Alert.alert('Failed! Could not send support message, please try later on.');
      return {error};
    }
  }

  return (
    <RequestContext.Provider
      value={{
        sendRequest
      }}>
      {children}
    </RequestContext.Provider>
  );
};
