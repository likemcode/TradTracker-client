import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill'; 
import { Button } from 'antd';
import 'react-quill/dist/quill.snow.css'; // Import Quill's snow theme CSS

const customToolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['blockquote', 'code-block'],
  [{ script: 'sub' }, { script: 'super' }],
  [{ direction: 'rtl' }, { align: [] }],
  ['link', 'image', 'video'],
  ['clean'], // Add the 'clean' button
];

const JournalDetails = () => {
  const contentRef = useRef(null);
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  const modules = {
    toolbar: customToolbar,
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'list', 'indent', 'link', 'image', 'formula',
  ];

  // Function to handle saving the journal entry
  const saveJournalEntry = () => {
    // Make an API call to save the journal entry using contentRef.current.editor.getText() to get the text content
    const journalContent = contentRef.current.editor.root.innerHTML;
    fetch('http://127.0.0.1:8000/backend/trades/save_journal_entry/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Your Journal Entry Title', // You can set the title dynamically or prompt the user to enter it
        content: journalContent,
      }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Journal entry saved successfully');
        // Optionally, you can clear the content after saving
        setContent('');
      } else {
        console.error('Failed to save journal entry');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="journal-details-container">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={content}
        onChange={handleChange}
        ref={contentRef}
      />
      <Button onClick={saveJournalEntry}>Save</Button>
    </div>
  );
};

export default JournalDetails;
