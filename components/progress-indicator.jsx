import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProgressIndicator({ currentStep, totalSteps = 5 }) {
    return (
        <View style={styles.container}>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.segment,
                        index < currentStep && styles.segmentActive,
                    ]}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 20,
    },
    segment: {
        flex: 1,
        height: 4,
        backgroundColor: '#E5E5E5',
        borderRadius: 2,
    },
    segmentActive: {
        backgroundColor: '#484ED4',
    },
});