'use client';

import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { FileUploadResponse } from '@/types/fileUpload';
import * as Styled from './FileUpload.styles';

export const FileUploadExample: React.FC = () => {
  const [uploadResults, setUploadResults] = useState<FileUploadResponse[]>([]);

  const handleUploadSuccess = (response: FileUploadResponse) => {
    setUploadResults(prev => [...prev, response]);
  };

  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
    alert(`Upload failed: ${error}`);
  };

  const clearResults = () => {
    setUploadResults([]);
  };

  return (
    <Styled.Container>
      <h2>File Upload Example</h2>
      
      <FileUpload
        folderName="uploads"
        userId="user123"
        multiple={true}
        maxFiles={7}
        onSuccess={handleUploadSuccess}
        onError={handleUploadError}
      />

      {uploadResults.length > 0 && (
        <Styled.ResultsSection>
          <Styled.ResultsHeader>
            <h3>Upload Results</h3>
            <Styled.ClearButton onClick={clearResults}>
              Clear Results
            </Styled.ClearButton>
          </Styled.ResultsHeader>
          
          {uploadResults.map((result, index) => (
            <Styled.ResultItem key={index}>
              <Styled.ResultHeader>
                <strong>Upload #{index + 1}</strong>
                <span>{result.metadata.totalFiles} file(s) uploaded</span>
              </Styled.ResultHeader>
              
              <Styled.FilesList>
                {result.files.map((file, fileIndex) => (
                  <Styled.FileResult key={fileIndex}>
                    <Styled.FileName>{file.originalName}</Styled.FileName>
                    <Styled.FileUrl href={file.url} target="_blank" rel="noopener noreferrer">
                      View File
                    </Styled.FileUrl>
                  </Styled.FileResult>
                ))}
              </Styled.FilesList>
            </Styled.ResultItem>
          ))}
        </Styled.ResultsSection>
      )}
    </Styled.Container>
  );
};
