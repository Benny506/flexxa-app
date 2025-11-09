// components/SelectDateTime.js
import { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import colors from '../utils/colors/colors';
import { fontFamilies, textSizes } from './stylesheets/globalStyleSheet';

const { width } = Dimensions.get('window');

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;

const monthsArr = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function getDaysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function buildHours() {
  return Array.from({ length: 24 }, (_, i) => i);
}

function buildMinutes(interval = 1) {
  const arr = [];
  for (let m = 0; m < 60; m += interval) arr.push(m);
  return arr;
}

export default function DatePicker({
  visible,
  initialDate,
  onConfirm,
  onCancel,
  minuteInterval = 1,
}) {
  const now = useRef(new Date()).current;
  const startDate = useRef(initialDate ? new Date(initialDate) : now).current;
  const availableYears = [new Date().getFullYear(), new Date().getFullYear()+1]

  const hoursArr = buildHours();
  const minutesArr = buildMinutes(minuteInterval);

  const [year, setYear] = useState(startDate.getFullYear())
  const [monthIndex, setMonthIndex] = useState(startDate.getMonth());
  const [dayIndex, setDayIndex] = useState(startDate.getDate() - 1);
  const [hourIndex, setHourIndex] = useState(startDate.getHours());
  const [minuteIndex, setMinuteIndex] = useState(
    Math.floor(startDate.getMinutes() / minuteInterval)
  );

  const daysArr = Array.from(
    { length: getDaysInMonth(year, monthIndex) },
    (_, i) => i + 1
  );

  useEffect(() => {
    // Adjust selected day if month changes and index exceeds new days length
    if (dayIndex >= daysArr.length) setDayIndex(daysArr.length - 1);
  }, [monthIndex]);

  function confirmSelection() {
    const day = daysArr[dayIndex];
    const month = monthIndex;
    const hour = hoursArr[hourIndex];
    const minute = minutesArr[minuteIndex % minutesArr.length];

    const result = new Date(year, month, day, hour, minute, 0, 0);
    onConfirm && onConfirm({
      fullDate: result,
      year, month, day, hour, minute
    });
  }

  const styles = StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: colors.FFF,
      paddingTop: 14,
      paddingBottom: 28,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      minHeight: 400,
    },
    header: {
      textAlign: 'center',
      marginBottom: 10,
      fontSize: textSizes.txt16.fontSize,
      fontFamily: fontFamilies.LatoBold.fontFamily,
    },
    wheelsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: ITEM_HEIGHT * VISIBLE_ITEMS + 8,
      marginTop: 8,
      marginBottom: 40,
    },
    wheelColumn: {
      width: Math.floor(width * 0.3),
      minHeight: ITEM_HEIGHT * VISIBLE_ITEMS,
      overflow: 'hidden',
    },
    wheelLabel: {
      textAlign: 'center',
      marginTop: 10,
      color: '#444',
      fontSize: textSizes.txt13.fontSize,
      fontFamily: fontFamilies.LatoBold.fontFamily,
    },
    overlay: {
      position: 'absolute',
      // zIndex: -1,
      top: ITEM_HEIGHT * 2,
      left: 0,
      right: 0,
      height: ITEM_HEIGHT,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
    buttonsRow: {
      marginTop: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 18,
    },
    btn: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      backgroundColor: '#f2f2f2',
      minWidth: 120,
      alignItems: 'center',
    },
    btnPrimary: {
      backgroundColor: colors._484ED4,
    },
    btnText: {
      color: '#222',
      fontWeight: '600',
    },
    btnPrimaryText: {
      color: colors.FFF,
    },
  });

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.header}>Select Date & Time</Text>

          {/* Row 1: Month + Day */}
          <View style={styles.wheelsRow}>
            <View style={styles.wheelColumn}>
              <WheelPickerExpo
                height={ITEM_HEIGHT * VISIBLE_ITEMS}
                width={Math.floor(width * 0.3)}
                initialSelectedIndex={monthIndex}
                items={monthsArr.map(m => ({ label: m, value: m }))}
                onChange={e => setMonthIndex(e.index)}
              />
              <View style={styles.overlay} pointerEvents='none' />
              <Text style={styles.wheelLabel}>Month</Text>
            </View>

            <View style={[styles.wheelColumn, { marginLeft: 12 }]}>
              <WheelPickerExpo
                height={ITEM_HEIGHT * VISIBLE_ITEMS}
                width={Math.floor(width * 0.3)}
                initialSelectedIndex={dayIndex}
                items={daysArr.map(d => ({ label: String(d), value: d }))}
                onChange={e => setDayIndex(e.index)}
              />
              <View style={styles.overlay} pointerEvents='none' />
              <Text style={styles.wheelLabel}>Day</Text>
            </View>

            <View style={[styles.wheelColumn, { marginLeft: 12 }]}>
              <WheelPickerExpo
                height={ITEM_HEIGHT * VISIBLE_ITEMS}
                width={Math.floor(width * 0.3)}
                initialSelectedIndex={0}
                items={availableYears.map(y => ({ label: String(y), value: y }))}
                onChange={e => setYear(e.item.value)}
              />
              <View style={styles.overlay} pointerEvents='none' />
              <Text style={styles.wheelLabel}>Year</Text>
            </View>            
          </View>

          {/* Row 2: Hour + Minute */}
          <View style={styles.wheelsRow}>
            <View style={styles.wheelColumn}>
              <WheelPickerExpo
                height={ITEM_HEIGHT * VISIBLE_ITEMS}
                width={Math.floor(width * 0.3)}
                initialSelectedIndex={hourIndex}
                items={hoursArr.map(h => ({ label: String(h), value: h }))}
                onChange={e => setHourIndex(e.index)}
              />
              <View style={styles.overlay} pointerEvents='none' />
              <Text style={styles.wheelLabel}>Hour</Text>
            </View>

            <View style={[styles.wheelColumn, { marginLeft: 12 }]}>
              <WheelPickerExpo
                height={ITEM_HEIGHT * VISIBLE_ITEMS}
                width={Math.floor(width * 0.3)}
                initialSelectedIndex={(startDate.getMinutes() + 5) < 60 ? (startDate.getMinutes() + 5) : Math.abs(60 - (startDate.getMinutes() + 5))}
                items={minutesArr.map(m => ({ label: String(m), value: m }))}
                onChange={e => setMinuteIndex(e.index)}
              />
              <View style={styles.overlay} pointerEvents='none' />
              <Text style={styles.wheelLabel}>Minute</Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.btn} onPress={onCancel}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnPrimary]}
              onPress={confirmSelection}
            >
              <Text style={[styles.btnText, styles.btnPrimaryText]}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
