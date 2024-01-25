import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useTheme } from "@shopify/restyle";
import Texts from "../../../components/Texts";
import ApiServices from "../../../services/ApiServices";
import DocumentSvg from "../../../assets/svg/document.svg";
import { formatElapsedTime } from "../../../utils/formatElapsedTime";
import PdfViewer from "../../../components/PdfViewer";

const { height, width } = Dimensions.get("screen");

const Document = ({ data }) => {
  const dataId = data.id;
  const [document, setDocument] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const {
          data: { data },
          status: statusCode,
        } = await ApiServices.getAllFilesOnExpense(dataId);
        if (statusCode === 200) {
          setDocument(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
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
        Documents / Attachments
      </Texts>
      {document.length < 1 ? (
        <View>
          <Texts variant="p">No activites</Texts>
        </View>
      ) : (
        <View style={styles.doc_container}>
          {document?.map((data) => {
            return (
              <View key={data.id}>
                <TouchableOpacity activeOpacity={0.9} style={styles.doc_ech}>
                  {/* {data?.file && <PdfViewer pdfData={data?.file} />} */}

                  <DocumentSvg height={height * 0.035} width={height * 0.035} />
                  <View style={styles.doc_ech_dets}>
                    <Texts variant="p" style={styles.doc_dets_top}>
                      {data.name}
                    </Texts>
                    <Texts variant="p" style={styles.doc_dets_btm}>
                      {`Modified ${formatElapsedTime(data.updatedAt)}`}
                    </Texts>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Document;

const styles = StyleSheet.create({
  container: {
    marginBottom: height * 0.035,
  },
  doc_container: {
    gap: 15,
  },
  doc_ech: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  doc_ech_dets: {
    gap: 3,
  },
  doc_dets_top: {
    fontSize: height * 0.02,
    color: "#333",
  },
  doc_dets_btm: {
    fontSize: height * 0.015,
    color: "#666",
  },
});
