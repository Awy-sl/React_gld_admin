import React, { useState, useCallback, useEffect } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { removeImage } from "../../config/index";
import { BASE_IMG_URL } from "../../utils/constants";


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// 上传图片组件
export default function PicturesWall(props) {
  const { updateImages, imgs, isUpdate } = props;

  // 标识图片是否大图预览
  const [previewVisible, setPreviewVisible] = useState(false);
  // 大图的 url
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = useCallback(() => {
    setPreviewVisible(false);
  }, []);

  const handleChange = useCallback(async ({ file, fileList }) => {
    //  console.log("fileList():", file.status, fileList.length, file);
    //判断是否上传成功上传成功就修正 fileList 的值
    if (file.status === "done") {
      const result = file.response;
      if (!result.status === 0) return message.error("上传失败！");
      message.success("上传成功！");
      const { name, url } = result.data;
      /*
         因为当前 file 不是 fileList数组里的最后一项所以修改当前 file 
         并不会修改 fileList 中 file
        */
      file = fileList[fileList.length - 1];
      file.name = name;
      file.url = url;
    } else if (file.status === "removed" && isUpdate) {
      const { data: result } = await removeImage(file.name);
      if (!result.status === 0) return message.error("删除失败");
      message.success("删除成功");
    }
    setFileList(fileList);
  }, [isUpdate]);

  useEffect(() => {
    if (imgs) {
      const newFileList = imgs.map((name, i) => ({
        uid: -i,
        name,
        url: BASE_IMG_URL + name,
      }));
      setFileList(newFileList);
      console.log("aa");
    }
  }, [imgs]);

  useEffect(() => {
    updateImages(fileList);
  }, [fileList, updateImages]);

  const handlePreview = useCallback(async (file) => {
    file.preview = await getBase64(file.originFileObj);
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  }, []);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        // 图片上传地址
        action="/manage/img/upload"
        //   指定文件类型
        accept="image/*"
        //   指定请求参数名
        name="image"
        listType="picture-card"
        fileList={fileList} // 已上传图片文件对象数组
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 4 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}
