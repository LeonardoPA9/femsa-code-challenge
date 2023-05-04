import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Image as ExpoImage } from "expo-image";
import * as ImageManipulator from "expo-image-manipulator";

const OptimizedImage = ({ source, style, ...props }) => {
  const [optimizedSource, setOptimizedSource] = useState(null);
  const [parentSize, setParentSize] = useState(null);

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setParentSize({ width, height });
  };

  useEffect(() => {
    const optimizeImage = async () => {
      if (!parentSize) return;

      const targetWidth = style.width?.toString().endsWith("%")
        ? (parseFloat(style.width) / 100) * parentSize.width
        : parseFloat(style.width);

      const targetHeight = style.height?.toString().endsWith("%")
        ? (parseFloat(style.height) / 100) * parentSize.height
        : parseFloat(style.height);

      try {
        const result = await ImageManipulator.manipulateAsync(
          source.uri,
          [{ resize: { width: targetWidth, height: targetHeight } }],
          { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        );
        setOptimizedSource({ uri: result.uri });
      } catch (error) {
        console.error("Error optimizing image:", error);
      }
    };

    if (source.uri && parentSize) {
      optimizeImage();
    }
  }, [source, parentSize, style.width, style.height]);

  return (
    <View
      testID="optimized-image-container"
      onLayout={onLayout}
      style={[defaultStyle, style]}
    >
      <ExpoImage
        {...props}
        testID="optimized-image"
        source={optimizedSource ?? source}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
};

const defaultStyle = StyleSheet.create({
  overflow: "hidden",
  position: "relative",
});

export default OptimizedImage;
