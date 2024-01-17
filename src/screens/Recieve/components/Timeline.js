import { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "@shopify/restyle";
import Texts from "../../../components/Texts";
import ApiServices from "../../../services/ApiServices";
import { formatElapsedTime } from "../../../utils/formatElapsedTime";

const { width, height } = Dimensions.get("screen");

const TimelineItem = ({ item, isLast }) => {
  const theme = useTheme();

  const trimmedName = item.title.trim();
  const nameWords = trimmedName.split(" ");
  const firstLetter = nameWords[0] ? nameWords[0][0] : "";
  const lastLetter =
    nameWords.length > 1 ? nameWords[nameWords.length - 1][0] : "";

  const combinedString = `${firstLetter}${lastLetter}`;

  return (
    <View style={styles.timelineItem}>
      <View style={styles.diagram}>
        <View
          style={{
            ...styles.circle,
            backgroundColor: theme.colors.lighterGreen,
          }}
        >
          <Texts
            variant="h2"
            style={{ ...styles.cirleText, fontSize: theme.spacing.m }}
          >
            {combinedString.toUpperCase()}
          </Texts>
        </View>
        {!isLast && (
          <View
            style={{
              ...styles.line,
              backgroundColor: theme.colors.lighterGreen,
            }}
          />
        )}
      </View>
      <View style={styles.content}>
        <Texts
          variant="h2"
          style={{ ...styles.title, fontSize: theme.spacing.m }}
        >
          {item.title}
        </Texts>
        <Texts variant="p" style={{ ...styles.timestamp }}>
          {item.timestamp}
        </Texts>
        <Texts variant="p" style={{ ...styles.description }}>
          {item.description}
        </Texts>
      </View>
    </View>
  );
};

const Timeline = ({ dataId, update }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const {
          data: { data },
          status: statusCode,
        } = await ApiServices.veiwComments(dataId);
        if (statusCode === 200) {
          let newData = data.map((item) => {
            return {
              id: item.id,
              title: `${item.commenter.firstName} ${item.commenter.lastName}`,
              description: item.comment,
              timestamp: `Made this comment ${formatElapsedTime(
                item.createdAt
              )}`,
            };
          });
          setData(newData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [update]);

  const renderItem = ({ item, index }) => (
    <TimelineItem item={item} isLast={index === data.length - 1} />
  );

  return (
    <View style={styles.container}>
      <Texts
        variant="p"
        style={{
          fontWeight: 700,
          fontSize: height * 0.023,
          marginVertical: 15,
          color: "#49945A",
        }}
      >
        Activity Feed
      </Texts>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Timeline;

const styles = StyleSheet.create({
  timelineItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  diagram: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 50,
    backgroundColor: "#3498db",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    flex: 1,
    height: height * 0.1,
    width: 3,
    backgroundColor: "#3498db",
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#49945A",
  },
  description: {
    color: "#555",
    marginTop: 12,
    fontSize: width * 0.035,
    paddingBottom: height * 0.03,
  },
  timestamp: {
    color: "#555",
    fontSize: width * 0.035,
  },
});
