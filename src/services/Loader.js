import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { COLORS } from '../Constant/Colors';

const Loader = props =>
  props.status && (
    <View style={styles.container} {...props}>
      <ActivityIndicator size="large" color={COLORS.orange} />
    </View>
  );

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex:1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    zIndex: 10,
    elevation: 10,
  },
});