import React, { useEffect, useState } from "react";
import { View, WebView } from "react-native";
import * as FileSystem from "expo-file-system";

const PdfViewer = ({ pdfUrl }) => {
  const [localUri, setLocalUri] = useState(null);

  useEffect(() => {
    const downloadPdf = async () => {
      try {
        const downloadResult = await FileSystem.downloadAsync(
          pdfUrl,
          FileSystem.cacheDirectory + "downloaded.pdf"
        );

        setLocalUri(downloadResult.uri);
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    };

    downloadPdf();
  }, [pdfUrl]);

  return (
    <View style={{ flex: 1 }}>
      {localUri && <WebView source={{ uri: localUri }} style={{ flex: 1 }} />}
    </View>
  );
};

export default PdfViewer;
