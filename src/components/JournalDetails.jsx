import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill'; // Import Quill object
// import ImageResize from 'quill-image-resize-module';
import { Button , message} from 'antd';
import 'react-quill/dist/quill.snow.css'; // Import Quill's snow theme CSS

// Quill.register('modules/imageResize', ImageResize);

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
  const { journalId } = useParams();
  const [content, setContent] = useState('');
 

  useEffect(() => {
    const fetchJournalEntry = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/backend/trades/journal_entry/${journalId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch journal entry');
        }
        const data = await response.json();
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching journal entry:', error);
      }
    };

    fetchJournalEntry();
  }, [journalId]);

  // Function to handle saving the journal entry
  const saveJournalEntry = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/backend/trades/journal_entry/${journalId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Your Journal Entry Title', // You can set the title dynamically or prompt the user to enter it
          content:content }),
      });
      if (!response.ok) {
        throw new Error('Failed to save journal entry');
      }
      message.success('Journal entry saved successfully');
    } catch (error) {
      message.error('Error saving journal entry:', error);
    }
  };
  return (
    <div className="journal-details-container">
      <ReactQuill
        theme="snow"
        modules={{ toolbar: customToolbar, 
        //   imageResize: {
        //   displaySize: true, // Display the size of the image when resizing
        // }, 
      }
      }
        value={content}
        onChange={setContent}
      />
      <Button onClick={saveJournalEntry}>Save</Button>
    </div>
  );
};

export default JournalDetails;