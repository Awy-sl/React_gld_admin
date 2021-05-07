// * 富文本编辑器

//* 下载依赖 react-draft-wysiwyg draftjs-to-html
import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class RichTexEditor extends Component {
  state = {
    //  创建一个没有内容的编辑对象
    editorState: EditorState.createEmpty(),
    value: "",
  };
  constructor(props) {
    super(props);
    //  * 将详情 参数转换成 editor nei'内容
    const { detail } = this.props;
    if (detail) {
      const contentBlock = htmlToDraft(detail);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
          editorState,
        };
      }
    }
  }
  //   富文本的输入回调
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  getEditorValue = () => {
    const value = draftToHtml(
      //  获取 editor 内容
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    return value;
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        border
        editorStyle={{
          border: "1px solid #000",
          minHeight: 180,
          padding: 10,
        }}
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
      />
    );
  }
}
