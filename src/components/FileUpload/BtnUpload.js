import { TrendingUpOutlined } from '@mui/icons-material';
import AWS from 'aws-sdk';
import { useState } from 'react';
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESSKEYID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRETACCESSKEY,
  region: process.env.REACT_APP_AWS_REGION,
  // signatureVersion: 'v4',
});

export default function BtnUpload({ file, setFile, imageUrl, setImageUrl }) {
  const s3 = new AWS.S3();

  const handleFileSelect = (e) => {
    var f = e.target.value;
    let fileLength = f.length;
    let fileDot = f.lastIndexOf('.');
    let fileType = f.substring(fileDot + 1, fileLength);
    if (fileType == 'jpeg' || fileType == 'jpg' || fileType == 'png') setFile(e.target.files[0]);
    else {
      alert('.jpeg, .jpg, .png 파일만 업로드 가능합니다');
      setFile(null);
    }
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
    console.log("uploading to s3", Location);
  };
  return (
    <div style={{ marginTop: "150px" }}>
      {/* <h1>Test Image Upload</h1> */}
      <input type="file" onChange={handleFileSelect} />

      {file && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={uploadToS3}>Upload</button>
        </div>
      )}
      {imageUrl && (
        <div style={{ marginTop: "10px" }}>
          <img src={imageUrl} alt="uploaded" />
        </div>
      )}
    </div>
  );
}
