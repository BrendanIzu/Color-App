import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import { 
  Dimensions, 
  StyleSheet,
  Text, 
  View, 
  SafeAreaView, 
  Image, 
  TouchableWithoutFeedback, 
  TouchableOpacity, 
  TouchableHighlight,
  Button,
  Alert,
  Pressable } from 'react-native';
  import { useDeviceOrientation, useDimensions } from '@react-native-community/hooks';

const RED = 'rgb(255,0,0)'
const GREEN = 'rgb(0,255,0)'
const BLUE = 'rgb(0,0,255)'


export default function App() {
  const [topColor, setTopColor] = useState(RED);
  const [midColor, setMidColor] = useState(GREEN);
  const [botColor, setBotColor] = useState(BLUE);

  let seq = 0
  let colors = []
  let prev = ''

  function parseColorString(color) {
    const re = new RegExp('([0-9]{1,3},[0-9]{1,3},[0-9]{1,3})');

    if (re.test(color)) {
      //console.log("VALID COLOR STRING")
    } else {
      throw Error("Error: invalid color string")
    }

    color = color.slice(4,color.length - 1);
    return color.split(',');
  }

  function mixColors() {
    let c1 = colors[0];
    let c2 = colors[1];
    let values = [];

    try {
      let c1 = parseColorString(colors[0]);
      let c2 = parseColorString(colors[1]);

      let r1 = parseInt(c1[0]);
      let r2 = parseInt(c2[0]);
      let r3 = Math.round((r1 + r2) / 2);

      let g1 = parseInt(c1[1]);
      let g2 = parseInt(c2[1]);
      let g3 = Math.round((g1 + g2) / 2);

      let b1 = parseInt(c1[2]);
      let b2 = parseInt(c2[2]);
      let b3 = Math.round((b1 + b2) / 2);

      r3 = r3.toString()
      g3 = g3.toString()
      b3 = b3.toString()

      return "rgb("+r3+","+g3+","+b3+")"

    } catch(error) {
      console.log(error);
      return "rgb(1,1,1)"
    }
  }

  function onClick(color, p) {
    console.log(prev);
    if(seq%2==1) {
      seq += 1
      colors.push(color);
      
      if(prev == p) {
        prev = ''
        colors = []
        if(p == 'T') {
          return 'rgb(255,0,0)';
        }
        if(p == 'M') {
          return 'rgb(0,255,0)';
        }
        if(p == 'B') {
          return 'rgb(0,0,255)';
        }
      }

      let newColor = mixColors();
      colors = [];
      prev = '';
      return newColor;
    } else {
      colors.push(color);
      prev = p;
      seq += 1;
      return color
    }
  }

  return (
    <View style={styles.container}>
      <Pressable 
      style={{flex: 1}} 
      onPress={() => setTopColor(onClick(topColor, 'T'))} 
      onLongPress={() => Alert.alert(topColor)}>
        <View style={{backgroundColor: topColor, flex: 1}}>
        </View>
      </Pressable>
      <Pressable 
      style={{flex: 1}} 
      onPress={() => setMidColor(onClick(midColor, 'M'))} 
      onLongPress={() => Alert.alert(midColor)}>
        <View style={{backgroundColor: midColor, flex: 1}}>
        </View>
      </Pressable>
      <Pressable 
      style={{flex: 1}} 
      onPress={() => setBotColor(onClick(botColor, 'B'))} 
      onLongPress={() => Alert.alert(botColor)}>
        <View style={{backgroundColor: botColor, flex: 1}}>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
