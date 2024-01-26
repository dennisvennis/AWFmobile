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
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import PDFView from "react-native-view-pdf";

const { height, width } = Dimensions.get("screen");

const Document = ({ data }) => {
  const dataId = data.id;
  const [document, setDocument] = useState([]);
  const [pdfFile, setPdfFile] = useState("");
  //   const [fileInfo, setFileInfo] = useState({});

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

  const handlePdfViewer = async (fileId) => {
    try {
      const {
        data: { data: response },
        status: statusCode,
      } = await ApiServices.getFileInfoWithId(fileId);
      if (statusCode === 200) {
        let pdfFile = response.file;
        const buff = Buffer.from(pdfFile, "base64");
        const base64 = buff.toString("base64");

        const fileUri =
          FileSystem.documentDirectory + `${encodeURI(response.name)}`;

        await FileSystem.writeAsStringAsync(fileUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Sharing.shareAsync(fileUri);
        setPdfFile(fileUri);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
                {/* {data?.file && <PdfViewer pdfData={pdfFile} />} */}
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.doc_ech}
                  onPress={() => handlePdfViewer(data.id)}
                >
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
          {pdfFile && (
            <View style={{ flex: 1 }}>
              <PDFView
                fadeInDuration={250.0}
                style={{ flex: 1 }}
                resource={pdfFile}
                resourceType="file"
                onLoad={() => console.log(`PDF rendered from ${pdfFile}`)}
                onError={(error) => console.log("Cannot render PDF", error)}
              />
            </View>
          )}
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
