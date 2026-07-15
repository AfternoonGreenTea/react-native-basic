import { useState } from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

interface Props extends TextInputProps {
  minHeight?: number;
  maxHeight?: number;
}

export function AutoGrowInput({ minHeight = 40, maxHeight = 150, style, ...props }: Props) {
  const [height, setHeight] = useState(minHeight);

  return (
    <TextInput
      {...props}
      multiline
      style={[styles.input, { height: Math.min(Math.max(height, minHeight), maxHeight) }, style]}
      onContentSizeChange={(event) => {
        setHeight(event.nativeEvent.contentSize.height);
      }}
      textAlignVertical="top"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    lineHeight: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});
