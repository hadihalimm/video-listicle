import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Textarea } from './ui/textarea';

export interface VideoData {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}
interface JsonInputProps {
  onJsonParsed: (data: VideoData[] | null) => void;
}

const JsonInput = ({ onJsonParsed }: JsonInputProps) => {
  const [jsonText, setJsonText] = useState<string>('');
  const [error, setError] = useState<string | null>('');

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: { 'application/json': ['.json'] },
      maxFiles: 1,
    });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          setJsonText(text);
          onJsonParsed(JSON.parse(text));
          setError(null);
        } catch (error) {
          onJsonParsed(null);
          console.error('Invalid JSON: ', error);
          setError(`Invalid JSON: ${error}`);
        }
      };
      reader.readAsText(file);
    }
  }, [acceptedFiles, onJsonParsed]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setJsonText(text);
    try {
      onJsonParsed(JSON.parse(text));
      console.log(JSON.parse(text));
      setError(null);
    } catch (error) {
      onJsonParsed(null);
      console.error('Invalid JSON: ', error);
      setError(`Invalid JSON: ${error}`);
    }
  };

  return (
    <section className="flex flex-col lg:flex-row w-full lg:w-2xl items-center lg:items-start space-y-4 lg:space-x-4">
      <div
        {...getRootProps({ className: 'dropzone' })}
        className="w-[60%] lg:w-2/5 lg:h-32 border-2 border-dashed border-zinc-400 text-center px-3 py-3 lg:px-6 lg:py-9 cursor-pointer rounded-md">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p> Drop the JSON file here...</p>
        ) : (
          <p>Drag 'n' drop your JSON file or click here to select file</p>
        )}
      </div>
      <div className="w-[60%] lg:w-3/5">
        <Textarea
          className="h-[15vh] lg:h-32"
          placeholder="Or paste your JSON here..."
          value={jsonText}
          onChange={handleTextChange}
        />
        {error && jsonText !== '' && (
          <p className="text-red-400 text-[12px] pl-2">{error}</p>
        )}
      </div>
    </section>
  );
};

export default JsonInput;
