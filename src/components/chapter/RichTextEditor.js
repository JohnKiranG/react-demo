import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types';
import './chapter.less';

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onContentStateChange, onEditorStateChange, editorState,
    } = this.props;
    return (
            <div>
                <Editor
                    editorState={editorState}
                    toolbarClassName="home-toolbar"
                    wrapperClassName="home-wrapper"
                    toolbarOnFocus
                    // toolbarHidden
                    editorClassName="demo"
                    editorStyle= {{
                      minHeight: '37px', borderRadius: '4px', overflow: 'auto', margin: '0px',
                      lineHeight: '20px',
                    }}
                    // wrapperStyle = {stle}
                    wrapperStyle = {{ marginTop: '-46px' }}
                    // toolbarStyle = {{  }}
                    toolbar={{
                      options: ['inline', 'fontSize', 'fontFamily'],
                      inline: {
                        options: ['bold', 'italic', 'underline', 'superscript', 'subscript'],
                        bold: { className: 'bordered-option-classname' },
                        italic: { className: 'bordered-option-classname' },
                        underline: { className: 'bordered-option-classname' },
                        code: { className: 'bordered-option-classname' },
                        superscript: { className: 'bordered-option-classname' },
                        subscript: { className: 'bordered-option-classname' },
                      },
                      fontSize: {
                        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                        className: 'bordered-option-classname',
                      },
                    }
                    }
                    onContentStateChange={onContentStateChange}
                    onEditorStateChange={onEditorStateChange}
                />
            </div>
    );
  }
}
RichTextEditor.propTypes = {
  onContentStateChange: PropTypes.func.isRequired,
  onEditorStateChange: PropTypes.func.isRequired,
  editorState: PropTypes.instanceOf(Object).isRequired,
};

export default RichTextEditor;
