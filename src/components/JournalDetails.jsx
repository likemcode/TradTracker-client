import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill'; // Import Quill object
import { Button , message} from 'antd';
import 'react-quill/dist/quill.snow.css'; // Import Quill's snow theme CSS


const customToolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
 [{ font: [] }],
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
  const location = useLocation();
  const { title, symbol, buySell, experience, date } = location.state || {};
  
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
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          title:title,
          content: content,
          symbol:symbol,
          buy_or_sell:buySell,
          experience:experience,
          
          }),
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
        modules={{ toolbar: customToolbar }
      }
        value={content}
        onChange={setContent}
      />
      <Button onClick={saveJournalEntry}>Save</Button>
    </div>
  );
};

export default JournalDetails;