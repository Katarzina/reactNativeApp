import React from 'react';
import {ActivityIndicator} from 'react-native';
import {colors} from '../theme';

type SizeTypes = 'sm' | 'lg';

type SpinnerProps = {
  size?: SizeTypes;
  color?: keyof typeof colors;
};

function Spinner({size = 'sm', color = 'light'}: SpinnerProps) {
  const spinnerSize = {
    sm: 'small',
    lg: 'large',
  }[size];

  return <ActivityIndicator color={colors[color]} size={spinnerSize} />;
}

Spinner.defaultProps = {
  size: 'md',
};

export default Spinner;
