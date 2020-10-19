import React, {FunctionComponent} from 'react';
import {
  StyleProp,
  View,
  Text,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {theme} from '../../../theme/index';
import {EndPoint} from '../../pages/DrawingZone/useGoogleNearby.hook';
import {LoadingStatusKey, startLoading} from '../../Store/Loader/LoaderActions';
import {isLoadingSelector} from '../../Store/Loader/LoaderSelectors';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (visibility: boolean) => void;
  style?: StyleProp<ViewStyle>;
  nearbyDevices: EndPoint[];
  connectToDevice: (endpoint: EndPoint) => void;
  onClose: () => void;
}
interface Styles {
  modal: ViewStyle;
  header: ViewStyle;
  title: ViewStyle;
  body: ViewStyle;
  deviceItem: ViewStyle;
  separator: ViewStyle;
}

const renderDevices = ({
  item,
  connectToDevice,
  isLoading,
  dispatch,
}: {
  item: EndPoint;
  connectToDevice: (endpoint: EndPoint) => void;
  dispatch: (action) => void;
  isLoading: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        connectToDevice(item);
        dispatch(startLoading(LoadingStatusKey.CONNECT_TO_DEVICE));
      }}
      style={styles.deviceItem}>
      <Text>{item.endpointName}</Text>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.blue} size={20} />
      ) : (
        <Icon name="wifi" color={theme.colors.blue} size={20} />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create<Styles>({
  modal: {
    flex: 1,
    backgroundColor: theme.colors.white,
    marginVertical: 5 * theme.gridUnit,
    borderRadius: 4 * theme.gridUnit,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 3 * theme.gridUnit,
    paddingVertical: 4 * theme.gridUnit,
  },
  title: {fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1},
  body: {
    flex: 1,
    marginHorizontal: 3 * theme.gridUnit,
    paddingVertical: 4 * theme.gridUnit,
    justifyContent: 'center',
  },
  deviceItem: {
    marginVertical: 3 * theme.gridUnit,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    backgroundColor: '#EEEEEE',
    height: 1,
    width: '100%',
  },
});

export const ConnectionModal: FunctionComponent<Props> = ({
  isModalVisible,
  setIsModalVisible,
  nearbyDevices,
  connectToDevice,
  onClose,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    isLoadingSelector(LoadingStatusKey.CONNECT_TO_DEVICE),
  );
  return (
    <Modal
      isVisible={isModalVisible}
      hasBackdrop={true}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}>
      <SafeAreaView style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.title}>Nearby devices</Text>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
              onClose();
            }}>
            <Icon name="close" color={theme.colors.blue} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <FlatList
            data={nearbyDevices}
            renderItem={({item}: {item: EndPoint; index: number}) => {
              return renderDevices({
                item,
                connectToDevice,
                isLoading,
                dispatch,
              });
            }}
            keyExtractor={(device: EndPoint): string => device.endpointId}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => (
              <ActivityIndicator color={theme.colors.blue} size={40} />
            )}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};
