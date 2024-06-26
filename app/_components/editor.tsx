'use client';

import { Editor, EditorState } from 'draft-js';
import { FC, useState } from 'react';

const myEditor: FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChange = (state: EditorState) => {
    setEditorState(state);
  };

  return <Editor editorState={editorState} onChange={handleChange} />;
};

export default myEditor;
