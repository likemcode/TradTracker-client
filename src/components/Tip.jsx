import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Tip = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    autofocus: true,
  });

  return (
    <div>
      <div>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tip;
