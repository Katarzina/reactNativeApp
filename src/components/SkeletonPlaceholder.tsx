import React from 'react';
import RNSkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors} from '../theme';

export type SkeletonPlaceholderProps = {
  children: JSX.Element | JSX.Element[];
};

const SkeletonPlaceholder = ({children}: SkeletonPlaceholderProps) => (
  <RNSkeletonPlaceholder
    backgroundColor={colors.gray200}
    highlightColor={`${colors.light}bf`}>
    {children}
  </RNSkeletonPlaceholder>
);

export default SkeletonPlaceholder;

SkeletonPlaceholder.Item = RNSkeletonPlaceholder.Item;
