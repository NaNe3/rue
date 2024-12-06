import { useCallback, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'

import SimpleHeader from '../../components/SimpleHeader'
import BasicButton from '../../components/BasicButton'
import Avatar from '../../components/Avatar'

import { getLocalUriForFile } from '../../utils/db-download'
import { hapticSelect } from '../../utils/haptics'
import { gen } from '../../utils/styling/colors'
import { getLocallyStoredVariable } from '../../utils/localStorage'

export default function Group({ navigation, route }) {
  const { group_id, group_name, group_image, group_plan, members } = route.params
  const group_avatar = getLocalUriForFile(group_image)

  const [groupName, setGroupName] = useState(group_name)
  const [groupAvatar, setGroupAvatar] = useState(group_avatar)
  const [groupPlan, setGroupPlan] = useState(group_plan)
  const [groupMembers, setGroupMembers] = useState(members)

  useFocusEffect(
    useCallback(() => {
      const getUserGroupsFromLocalStorage = async () => {
        const result = JSON.parse(await getLocallyStoredVariable('user_groups')).find(group => group.group_id === group_id)

        setGroupName(result.group_name)
        setGroupAvatar(result.group_image)
        setGroupPlan(result.group_plan)
        setGroupMembers(result.members)
      }

      getUserGroupsFromLocalStorage()
    }, [])
  )

  return (
    <View style={styles.container}>
      <SimpleHeader 
        navigation={navigation}
        rightIcon={
          <TouchableOpacity activeOpacity={0.7} >
            <Icon name="ellipsis-h" size={20} color={gen.primaryText} />
          </TouchableOpacity>
        }
        component={
          <TouchableOpacity 
            style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
            activeOpacity={0.7}
            onPress={() => {
              hapticSelect()
              navigation.navigate('GroupDetailsRouter', {
                  group_name: groupName,
                  group_avatar: groupAvatar,
                  group_plan: groupPlan,
                  members: groupMembers,
                  ...route.params,
                }
              )
            }}
          >
            {/* <Image source={{ uri: group_avatar }} style={styles.groupPhoto} /> */}
            <Avatar 
              imagePath={groupAvatar}
              type="group"
              style={styles.groupPhoto}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.groupName} numberOfLines={1} ellipsizeMode='tail' >{groupName}</Text>
              <Text style={{ color: gen.gray, fontFamily: 'nunito-bold' }}>
                <Icon name="users" color={gen.gray }/> {groupMembers.length} MEMBERS
              </Text>
            </View>
          </TouchableOpacity>
        }
        verticalPadding={20}
      />
      <View style={styles.landingContainer}>


        <View style={styles.planLayoutContainer}>
          <Text></Text>
        </View>
      </View>

      {/* ACTIVITY BARRRRRRR */}
      {/* <ScrollView 
        style={styles.activityBar}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {
          members.map((member, index) => {
            const member_avatar = getLocalUriForFile(member.avatar_path)
            return (
              <TouchableOpacity
                style={styles.memberPhoto}
                activeOpacity={0.7}
                key={index}
              >
                <Image key={index} source={{ uri: member_avatar }} style={{ width: '100%', height: '100%', borderRadius: 100 }} />   
              </TouchableOpacity>
            )
          })
        }
      </ScrollView> */}

      <ScrollView style={styles.contentContainer}>
        <View style={styles.announcementContainer}>
          
        </View>
        <Text style={{ fontFamily: 'nunito-bold', fontSize: 24, color: gen.heckaGray2, textAlign: 'center', marginTop: 100, alignItems: 'center' }}>no activity</Text>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: gen.secondaryBackground,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: gen.secondaryBackground,
  },
  landingContainer: {
    width: '100%',
    backgroundColor: gen.primaryBackground,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    // paddingTop: 600,
    // marginTop: -600,
    display: 'none'
  },
  groupPhoto: {
    width: 35,
    height: 42,
    backgroundColor: gen.lightestGray,
    borderRadius: 5,
    marginRight: 10
  },
  groupName: {
    fontSize: 18,
    fontFamily: 'nunito-bold',
    color: gen.primaryText,
  },
  activityBar: {
    width: '100%',
    maxHeight: 100,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  memberPhoto: {
    width: 70,
    height: 70,
    padding: 3,
    borderWidth: 4,
    borderColor: gen.primaryBorder,
    borderRadius: 35,
    marginRight: 5
  },
  planLabel: {
    backgroundColor: gen.lightestGray,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  planLayoutContainer: {
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  announcementContainer: {

  }
})