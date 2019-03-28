import React from 'react';
import { Card } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
// import { EditorState, convertToRaw } from 'draft-js';
import PropTypes from 'prop-types';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../editor.less';
class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
      }

    imageUploadCallBack = file => new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
        });
        xhr.addEventListener('error', () => {
            const error = JSON.parse(xhr.responseText);
            reject(error);
        });
    });

    render() {
        const {
            onContentStateChange, onFocus, editorStateChange, editorState,
          } = this.props;
        return (
            <div>
                <Card>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="home-toolbar"
                        wrapperClassName="home-wrapper"
                        editorClassName="demo-editor"
                        toolbar={{
                            options: ['inline', 'fontSize', 'fontFamily', 'list', 'colorPicker', 'remove', 'image', 'history'],
                            inline: {
                                options: ['bold', 'italic', 'underline', 'superscript', 'subscript'],
                                bold: { className: 'bordered-option-classname' },
                                italic: { className: 'bordered-option-classname' },
                                underline: { className: 'bordered-option-classname' },
                                code: { className: 'bordered-option-classname' },
                                superscript: { className: 'bordered-option-classname' },
                                subscript: { className: 'bordered-option-classname' },
                            },
                            image: {
                                className: undefined,
                                component: undefined,
                                popupClassName: undefined,
                                urlEnabled: true,
                                uploadEnabled: true,
                                alignmentEnabled: true,
                                uploadCallback: this.imageUploadCallBack,
                                previewImage: false,
                                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                alt: { present: false, mandatory: false },
                                defaultSize: {
                                    height: 'auto',
                                    width: 'auto',
                                },
                            },       
                            fontSize: {
                                // icon: fontSize,
                                options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                                className: 'bordered-option-classname',
                            },
                        }
                        }
                        onContentStateChange = {onContentStateChange}
                        onEditorStateChange = {editorStateChange}
                        onFocus={onFocus}
                    />
                </Card>
            </div>
        );
    }
}
RichTextEditor.propTypes = {
    onContentStateChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    editorStateChange: PropTypes.func.isRequired,
    editorState: PropTypes.instanceOf(Object).isRequired,
  };

export default RichTextEditor;

                               