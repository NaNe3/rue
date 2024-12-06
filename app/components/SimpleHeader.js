import { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { hapticSelect } from '../utils/haptics'
import { gen } from '../utils/styling/colors'

const SimpleHeader = ({
  navigation, 
  functionalNavigation = null,
  title = null,
  middleTitle = null,
  showChapterTitle,
  component = null,
  rightIcon = null,
  verticalPadding = 0
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showChapterTitle ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [showChapterTitle])

  return (
    <View style={[styles.header, { height: 100 + verticalPadding }]}>
      <View style={[styles.headerContent, { paddingVertical: verticalPadding, height: 60 + verticalPadding }]}>
        <TouchableOpacity 
          onPress={() => { 
            hapticSelect()
            if (functionalNavigation !== null) {
              functionalNavigation()
            } else {
              navigation.goBack() 
            }
          }} 
          style={[{ flexDirection: 'row', alignItems: 'center' }, !title && { width: 40, height: 50}]}
          activeOpacity={0.7}
        >
          <Icon 
            name='chevron-left'
            size={20}
            color={gen.primaryText}
          />
          { title && (
            <Text style={styles.headerTitle}>{title}</Text>
          )}
        </TouchableOpacity>
        { component !== null && component }
        { showChapterTitle && middleTitle !== null &&
          <Animated.Text
            style={[styles.middleTitle, { opacity: fadeAnim }]}
            numberOfLines={1}
            ellipsizeMode={'tail'}
          >
            {
              middleTitle.includes("Joseph Smith") || middleTitle.includes("Doctrine And Covenants")
                ? middleTitle.includes("Joseph Smith")
                  ? `JS${middleTitle.replace("Joseph Smith", "")}`
                  : `D&C${middleTitle.replace("Doctrine And Covenants", "")}`
                : middleTitle
            }
          </Animated.Text> 
        }
        { rightIcon !== null && rightIcon }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    backgroundColor: gen.primaryBackground
  },
  headerContent: {
    marginTop: 40,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 23,
    marginLeft: 10,
    color: gen.primaryText
  },
  middleTitle: {
    fontFamily: 'nunito-bold', 
    fontSize: 23, 
    flex: 1, 
    textAlign: 'center',
    color: gen.primaryText,
  }
})

export default SimpleHeader
