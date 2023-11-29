import {   StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    ScrollView,} from 'react-native'
import React, { useEffect, useState } from "react";
import Texts from "../../components/Texts";
import { useTheme } from '@shopify/restyle'

const { width, height } = Dimensions.get("screen");

const SingleReceiveScreen = ({route}) => {
    const theme = useTheme()
    const [request, setRequest] = useState([])

    const {requestId} = route.params

    useEffect(()=> {
        const res = require("../../utils/request.json");
        const data = res.filter((data)=> data.id === requestId)
        setRequest(data)
    },[])

  return (
    <View  style={{
        ...styles.screen,
        paddingHorizontal: theme.spacing.l,
        gap: theme.spacing.xl,
      }}>
        <View  style={styles.container}>
            {
                request.map((request)=> {
                    const {id,title,staff} = request
                    return (
                        <View style={styles.header} key={id}>
                            <Texts>{title}</Texts>
                            <View style={styles.hed_name}>
                                <Texts>by</Texts>
                                <Texts>{staff}</Texts>
                            </View>
                            <View>

                            </View>
                        </View>
                    )
                })
            }
        </View>
    </View>
  )
}

export default SingleReceiveScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 130,
      },
      container: {
        flex: 1,
        width: "100%",
        paddingTop: 20,
      },
})