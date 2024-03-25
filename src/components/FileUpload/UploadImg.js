import AWS from "aws-sdk";
import { useState } from "react";
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESSKEYID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRETACCESSKEY,
  region: process.env.REACT_APP_AWS_REGION,
  signatureVersion: "v4",
});

export default function UploadImg({
  file,
  setFile,
  imageUrl,
  setImageUrl,
  createData,
  setCreateData,
}) {
  const s3 = new AWS.S3();

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };
  const uploadToS3 = async () => {
    if (!file) {
      return;
    }
    const params = {
      Bucket: process.env.REACT_APP_AWS_BUCKET,
      Key: `${Date.now()}.${file.name}`,
      Body: file,
    };
    const { Location } = await s3.upload(params).promise();
    setImageUrl(Location);
    setCreateData((prevState) => {
      return { ...prevState, image: Location };
    });
    console.log("uploading to s3", Location);
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <input type="file" onChange={handleFileSelect} />
      {file && (
        <div style={{ marginTop: "5px" }}>
          <button onClick={uploadToS3}>Upload</button>
        </div>
      )}
      {imageUrl && (
        <div style={{ marginTop: "5px" }}>
          <img src={imageUrl} alt="uploaded" />
        </div>
      )}
    </div>
  );
}
